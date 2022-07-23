var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
var {momoCall}  = require('./momo');
var {paypalCall}  = require('./paypal');
var {vnpayCall,vnpay_sortObject}  = require('./vnpay');
const paypal = require('paypal-rest-sdk');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function checkClient(props){
    const rawSQL = ` 
                    select *
                    from khach_hang kh 
                    where kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0]
}

async function checkOrder(Client){
    const rawSQL = ` 
                    select *
                    from don_hang dh 
                    where makh = '${Client.makh}' 
                    and dh.TRANG_THAI = 'WAIT FOR PAYMENT'
                    `
    const result = await knexQuery.raw(rawSQL)
    return result.rows[0]
}

async function addOrder(props, Client){
    await knexQuery('don_hang')
    .insert({
        makh: Client.makh,
        macn: props.macn,
        ma_voucher: props.ma_voucher,
        phi_san_pham:props.tong_phi,
        phi_van_chuyen: props.phi_van_chuyen,
        phi_giam: props.phi_giam,
        hinh_thuc_thanh_toan: props.hinh_thuc_thanh_toan,
        hinh_thuc_giao_hang: props.hinh_thuc_giao_hang,
        so_nha_duong: props.dia_chi.so_nha_duong,
        phuong_xa: props.dia_chi.phuong_xa,
        quan_tp: props.dia_chi.quan_tp,
        tp_tinh: props.dia_chi.tp_tinh
    })
    const makh = await knexQuery.select('makh').from('don_hang')
    .where('makh','=',Client.makh)
    .andWhere('trang_thai','=','WAIT FOR PAYMENT')
    console.log(makh)
}

async function addItems(props, Client){
    await knexQuery('don_hang')
    .insert({
        makh: Client.makh,
        macn: props.macn,
        ma_voucher: props.ma_voucher,
        phi_san_pham:props.tong_phi,
        phi_van_chuyen: props.phi_van_chuyen,
        phi_giam: props.phi_giam,
        hinh_thuc_thanh_toan: props.hinh_thuc_thanh_toan,
        hinh_thuc_giao_hang: props.hinh_thuc_giao_hang,
        so_nha_duong: props.dia_chi.so_nha_duong,
        phuong_xa: props.dia_chi.phuong_xa,
        quan_tp: props.dia_chi.quan_tp,
        tp_tinh: props.dia_chi.tp_tinh
    })
    const makh = await knexQuery.select('makh').from('don_hang')
    .where('makh','=',Client.makh)
    .andWhere('trang_thai','=','WAIT FOR PAYMENT')
    console.log(makh)
}

async function updateOrderStatus(Client, status, token=false){
    if (token == false){
        // console.log("testtt",token)
        await knexQuery('don_hang')
        .where('makh','=',Client.makh)
        .andWhere('trang_thai','=','WAIT FOR PAYMENT')
        .update({
            trang_thai: status
        })
    }
    else {
        await knexQuery('don_hang')
        .where('payment_token','=',token)
        .update({
            trang_thai: status
        })
    }
}

async function updatePaymentToken(Client, token){
    console.log(token)
    await knexQuery('don_hang')
    .where('makh','=',Client.makh)
    .andWhere('trang_thai','=','WAIT FOR PAYMENT')
    .update({
        payment_token: token
    })
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 101,
        "message": "Tạo đơn hàng THẤT BẠI",
        "paymentURL":"",
    }
    try{
        const Client = await checkClient(req.headers);
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại"
            return res.send(response)
        }
        const waitOrder = await checkOrder(Client); 
        if (typeof(waitOrder) != "undefined"){
            response.exitcode = 107
            response.message = "Tồn tại đơn hàng đang chờ thanh toán"
            return res.send(response)
        }
        // console.log(req.body)
        addOrder(req.body, Client);
        // addItems(req.body, Client);

        if (req.body.hinh_thuc_thanh_toan == 'COD'){
            updateOrderStatus(Client,'CHỜ XÁC NHẬN')
            return res.send(response)
        }
        else if (req.body.hinh_thuc_thanh_toan == 'MOMO'){
            const result = JSON.parse(await momoCall(req.body, Client));
            // console.log(result)
            if (result.resultCode != 0){
                updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            }
            response.exitcode = result.resultCode;
            response.message  = result.message;
            response.paymentURL = result.payUrl;
            return res.send(response)
        }
        else if (req.body.hinh_thuc_thanh_toan == 'PAYPAL'){
            const result = await paypalCall(req.body, Client);
            console.log(result)
            if (result.resultCode != 0){
                updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            }
            else updatePaymentToken(Client,result.token.token)
            response.exitcode   = result.resultCode;
            response.message    = result.message;
            response.paymentURL = result.payUrl;
            return res.send(response)
        }
        else if (req.body.hinh_thuc_thanh_toan == 'VNPAY'){
            const result = await vnpayCall(req.body, Client);
            // console.log(result)
            if (result.resultCode != 0){
                updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            }
            response.exitcode = result.resultCode;
            response.message  = result.message;
            response.paymentURL = result.payUrl;
            return res.send(response)
        }
    }
    catch (e){
        response.exitcode=1
        response.message = e
    }
        
    updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
    return res.send(response)
});

router.get('/momo_camon', async function(req, res, next) {
    const resultCode = req.query.resultCode
    var Client = {
        'makh': req.query.orderId.split('_')[0]
    }
    
    console.log(Client)
    if (resultCode == 0){
        updateOrderStatus(Client,'CHỜ XÁC NHẬN')
        //return res.redirect(process.env.SUCCESS)
        return res.send('thanh cong')
    }
    else
        updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
        return res.send('that bai')
        //return res.redirect(process.env.FAIL)
        
});

router.get('/paypal_camon_success', async function(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };
    console.log(req)
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            updateOrderStatus('','THANH TOÁN THẤT BẠI',req.query.token)
            // res.redirect(process.env.FAIL)
            return res.send("that bai")
        } else {
            console.log(JSON.stringify(payment));
            updateOrderStatus('','CHỜ XÁC NHẬN',req.query.token)
            // res.redirect(process.env.SUCCESS)
            return res.send("thanh cong")
        }
    });
});

router.get('/paypal_camon_fail', async function(req, res, next) {
    // console.log(req)
    updateOrderStatus('','THANH TOÁN THẤT BẠI',req.query.token)
    return res.send('that bai')
    // res.redirect(process.env.FAIL)
});

router.get('/vnpay_camon', function (req, res, next) {
    // console.log(req.query)
    var Client = {
        'makh': req.query.vnp_TxnRef.split('_')[0]
    }
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = vnpay_sortObject(vnp_Params);
    var secretKey = 'DNBEDJWRYVOKGGLLWKDLQUBFSYDVDGPH';
    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     
    console.log("passs2")
    if(secureHash === signed){
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        
        if (rspCode=='00'){
            updateOrderStatus(Client,'CHỜ XÁC NHẬN')
            //return res.redirect(process.env.SUCCESS)
            return res.send('sucess')
        }
        else {
            updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            //return res.redirect(process.env.FAIL)
            return res.send('fail')
        }
    }
    else {
        //return res.redirect(process.env.FAIL)
        return res.send("1231245")
    }
});

module.exports = router;
