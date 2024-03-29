const paypal = require('paypal-rest-sdk');
var url_lib = require('url');
var querystring = require("querystring");
require("dotenv").config();
const config = require('../../config')
if (config.DEV) var HOST_LINK = process.env.DEV_HOST
    else var HOST_LINK = process.env.HOST

async function paypalCall(props, Client){
    return new Promise( resolve =>{
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': process.env.PAYPAL_CLIENT_ID,
            'client_secret': process.env.PAYPAL_CLIENT_SECRET,
        });
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": HOST_LINK + "/cart/order_create/paypal_camon_success",
                "cancel_url": HOST_LINK + "/cart/order_create/paypal_camon_fail"
            },
            "transactions": [{
                // "item_list": {
                //     "items": [{
                //         "name": "item",
                //         "sku": "item",
                //         "price": props.value,
                //         "currency": "USD",
                //         "quantity": 1
                //     }]
                // },
                "amount": {
                    "currency": "USD",
                    "total": Math.max(0.1, (props.phi_san_pham + props.phi_van_chuyen - props.phi_giam)/23000).toFixed(1).toString()
                },
                "description": "Thành viên " + Client.tenkh + " thực hiện thanh toán",
            }]
        };
        
        
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log(error);
                var text = {
                    'resultCode':400,
                    'message' : error.message
                }
                resolve(text)
            } else {
                console.log("Paypal Create Payment Response");
                // console.log(payment);
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        var query = url_lib.parse(payment.links[i].href);
                        var token = querystring.parse(query.query);
                        var text  = {
                            'resultCode' : 0,
                            'message'    : 'Lấy url payment thành công',
                            'payUrl'     : payment.links[i].href,
                            'token'      : token
                        }
                        resolve(text);
                    }
                  }

            }
        });
    });
}

module.exports = {paypalCall};