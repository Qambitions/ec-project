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

router.get('/GHN/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Tạo đơn hàng thất bại",
        "paymentURL":"",
    }

    const Client = await checkClient(req.headers);
    if (typeof(Client) == "undefined"){
        response.exitcode = 106
        response.message = "Token không tồn tại"
        res.send(response)
        return
    }

    var axios_connect = await axios.create({
        baseURL:'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?shop_id=3094149'
    });
    var price = await axios_connect('/',{
        method: 'POST',
        headers: {
            token: '3f4f34d9-0136-11ed-b824-262f869eb1a7'
        },
        data:{
            "service_id":53320,
            "insurance_value":500000,
            "coupon": null,
            "from_district_id":1542,
            "to_district_id":3440,
            "weight":1000
        }
    });
    console.log(price.data)


    
    res.send(response)
});

module.exports = router;
