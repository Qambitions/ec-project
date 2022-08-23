var dateFrt = require('date-and-time');
var crypto = require('crypto');
var https = require('https');
var path = require('path');
var resolve = path.resolve();
var querystring = require('qs');
require("dotenv").config();
const config = require('../../config')
if (config.DEV) var HOST_LINK = process.env.DEV_HOST
    else var HOST_LINK = process.env.HOST

function pad2(n) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
}

function getDateFormat(date) {
    return pad2(date.getFullYear()) +
        pad2(date.getMonth() + 1) +
        pad2(date.getDate()) +
        pad2(date.getHours()) +
        pad2(date.getMinutes()) +
        pad2(date.getSeconds())
}


function vnpayCall(props, Client) {
    // var ipAddr = req.headers['x-forwarded-for'] ||
    // req.connection.remoteAddress ||
    // req.socket.remoteAddress ||
    // req.connection.socket.remoteAddress;

    var ipAddr = HOST_LINK;
    // var ipAddr = '127.0.0.1';

    var tmnCode = process.env.VNPAY_TMN_KEY;
    var secretKey = process.env.VNPAY_SECRETKEY;;
    var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    var returnUrl = HOST_LINK + "/cart/order_create/vnpay_camon";

    var date = new Date();

    var createDate = getDateFormat(date);
    var orderId = Client.makh + '_' + new Date().getTime();
    var amount = props.phi_san_pham + props.phi_van_chuyen - props.phi_giam;
    var bankCode = '';

    var orderInfo = "Thành viên " + Client.tenkh + " thực hiện thanh toán";
    var orderType = "other";
    var locale = '';
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = orderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = vnpay_sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return {
        "resultCode": 0,
        "payUrl": vnpUrl,
    }

};

function vnpay_sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = { vnpayCall,vnpay_sortObject };
