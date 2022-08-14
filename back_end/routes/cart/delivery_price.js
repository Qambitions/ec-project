var express = require('express');
var axios = require('axios');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;
require("dotenv").config();

async function checkClient(props){
    const rawSQL = ` 
                    select *
                    from khach_hang kh 
                    where kh.kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows[0]
}

async function queryBranch(){
    const rawSQL = ` 
                    select *
                    from CHI_NHANH

                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows
}

async function getMinPriceGHN(listBranch, dia_chi, sum_weight){
    var axios_connect = await axios.create({
        baseURL:'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?shop_id=3094149'
    });
    var minPrice = {'total_price':1000000,
                    'macn'       :0}
    for(var method=53320; method<=53321;method++){
        for(var i = 0; i < listBranch.length;i++){
            var price = await axios_connect('/',{
                method: 'POST',
                headers: {
                    token: process.env.GHN_TOKEN
                },
                data:{
                    "service_id":method,
                    "insurance_value":500000,
                    "coupon": null,
                    "from_district_id":parseInt(listBranch[i].districtid),
                    "to_district_id":parseInt(dia_chi.districtid),
                    "weight":sum_weight,
                }
            }) 
            .then (function (response) {
                return response.data.data.total
            })
            .catch(function (error) {
                // console.log(error)
                return 1000000
            });
            // console.log(price)
            if (minPrice.total_price >  price){
                minPrice.total_price = price
                minPrice.macn        = listBranch[i].macn
            }
        }
    }
    return minPrice
}

async function getMinPriceGHTK(listBranch, dia_chi, sum_weight, mode){
    var axios_connect = await axios.create({
        baseURL:'https://services.giaohangtietkiem.vn/services/shipment/fee'
    });
    var minPrice = {'total_price':1000000,
                    'macn'       :0}
    
    for(var i = 0; i < listBranch.length;i++){
        var price = await axios_connect('/',{
            method: 'POST',
            headers: {
                token: process.env.GHTK_TOKEN
            },
            data:{
                "pick_province": listBranch[i].tp_tinh,
                "pick_district": listBranch[i].quan_tp,
                "province": dia_chi.tp_tinh,
                "district": dia_chi.quan_tp,
                "weight": sum_weight,
                "transport": "road",
                "deliver_option": mode,
                "tags": [1,7]
            }
        }) 
        .then (function (response) {
            return response.data.fee.ship_fee_only
        })
        .catch(function (error) {
            // console.log(error)
            return 1000000
        });
        // console.log(price)
        if (minPrice.total_price >  price){
            minPrice.total_price = price
            minPrice.macn        = listBranch[i].macn
        }
    }
    
    return minPrice
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 101,
        "message": "thất bại",
        "price":"1000000",
        "macn":""
    }

    const Client = await checkClient(req.headers);
    if (typeof(Client) == "undefined" || 
        typeof(req.body.dia_chi) == "undefined" || 
        typeof(req.body.sum_weight) == "undefined" || 
        typeof(req.headers) == "undefined"){

        response.exitcode = 106
        response.message = "Token không tồn tại / thiếu trường dữ liệu"
        res.send(response)
        return
    }
    try {
        const listBranch = await queryBranch();
        var minPrice = 1000000
        if (req.body.method == 'GHN')
            minPrice = await getMinPriceGHN(listBranch, req.body.dia_chi, req.body.sum_weight);    
        else if (req.body.method == 'GHTK_norm')
            minPrice = await getMinPriceGHTK(listBranch, req.body.dia_chi, req.body.sum_weight,'none');   
        else if (req.body.method == 'GHTK_fast')
            minPrice = await getMinPriceGHTK(listBranch, req.body.dia_chi, req.body.sum_weight,'xteam');


        // console.log(minPrice);
        if (minPrice != 1000000){
            response.exitcode = 0
            response.message = "Lấy thông tin thành công"
            response.price = minPrice.total_price
            response.macn  = minPrice.macn
        }
    }
    catch (e){
        response.exitcode= 1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

module.exports = router;
