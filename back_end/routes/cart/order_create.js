var express = require('express');
var url_lib = require('url');
var router = express.Router();
var knexQuery = require('../../db_connect');
var {momoCall}  = require('./momo');
var {paypalCall}  = require('./paypal');
const paypal = require('paypal-rest-sdk');

async function checkClient(props){
    const rawSQL = ` 
                    select *
                    from khach_hang kh 
                    where kh_token = '${props.token}' 
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

async function updateOrderStatus(Client, status, token=false){
    if (token == false){
        console.log("testtt",token)
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
        "exitcode": 1,
        "message": "Tạo đơn hàng THẤT BẠI",
        "paymentURL":"",
    }

    const Client = await checkClient(req.headers);
    if (typeof(Client) == "undefined"){
        response.exitcode = 106
        response.message = "Token không tồn tại"
        res.send(response)
        return
    }
    const waitOrder = await checkOrder(Client); 
    if (typeof(waitOrder) != "undefined"){
        response.exitcode = 107
        response.message = "Tồn tại đơn hàng đang chờ thanh toán"
        res.send(response)
        return
    }
    // console.log(req.body)
    addOrder(req.body, Client)

    if (req.body.hinh_thuc_thanh_toan == 'COD'){
        updateOrderStatus(Client,'CHỜ XÁC NHẬN')
        res.send(response)
        return
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
        res.send(response)
        return
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
        res.send(response)
        return
    }
    

    updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
    res.send(response)
});

router.get('/momo_camon', async function(req, res, next) {
    const resultCode = req.query.resultCode
    var Client = {
        'makh': req.query.orderId.split('_')[0]
    }
    
    console.log(Client)
    if (resultCode == 0){
        updateOrderStatus(Client,'CHỜ XÁC NHẬN')
        // res.redirect(process.env.SUCCESS)
        res.send('thanh cong')
        return
    }
    else
        updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
        res.send('that bai')
        // res.redirect(process.env.FAIL)
        return
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
            res.send("that bai")
        } else {
            console.log(JSON.stringify(payment));
            updateOrderStatus('','CHỜ XÁC NHẬN',req.query.token)
            // res.redirect(process.env.SUCCESS)
            res.send("thanh cong")
        }
    });
});

router.get('/paypal_camon_fail', async function(req, res, next) {
    // console.log(req)
    updateOrderStatus('','THANH TOÁN THẤT BẠI',req.query.token)
    res.send('that bai')
    // res.redirect(process.env.FAIL)
});

module.exports = router;
