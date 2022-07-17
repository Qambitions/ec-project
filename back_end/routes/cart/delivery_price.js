var express = require('express');
var axios = require('axios');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function checkClient(props){
    const rawSQL = ` 
                    select *
                    from khach_hang kh 
                    where kh.kh_token = '${props.token}' 
                    and kh.kh_token is not null
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0]
}

async function queryBranch(){
    const rawSQL = ` 
                    select *
                    from CHI_NHANH

                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
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
                    token: '3f4f34d9-0136-11ed-b824-262f869eb1a7'
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

router.post('/GHN/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Tạo đơn hàng thất bại",
        "price":"1000000",
        "macn":""
    }

    const Client = await checkClient(req.headers);
    if (typeof(Client) == "undefined"){
        response.exitcode = 106
        response.message = "Token không tồn tại"
        res.send(response)
        return
    }
    const listBranch = await queryBranch();
    const minPrice = await getMinPriceGHN(listBranch, req.body.dia_chi, req.body.sum_weight);    
    console.log(minPrice);
    response.price = minPrice.total_price
    response.macn  = minPrice.macn
    res.send(response)
});

module.exports = router;
