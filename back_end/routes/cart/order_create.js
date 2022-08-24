var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
var {momoCall}  = require('./momo');
var {paypalCall}  = require('./paypal');
var {vnpayCall,vnpay_sortObject}  = require('./vnpay');
var {isArray} = require('../../utils/tools');
const paypal = require('paypal-rest-sdk');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;
const config = require('../../config')

if (config.DEV){
    var SUCCESS_LINK = process.env.DEV_REACT_APP_PAYMENT_SUCCESS
    var FAIL_LINK = process.env.DEV_REACT_APP_PAYMENT_FAIL
}
else {
    var SUCCESS_LINK = process.env.REACT_APP_PAYMENT_SUCCESS
    var FAIL_LINK = process.env.REACT_APP_PAYMENT_FAIL
}

async function checkClient(props){
    const rawSQL = ` 
                    select *
                    from khach_hang kh 
                    where kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows[0]
}

async function checkOrder(Client){
    const rawSQL = ` 
                    select *
                    from don_hang dh 
                    where makh = '${Client.makh}' 
                    and dh.TRANG_THAI = 'WAIT FOR PAYMENT'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows[0]
}

async function addOrder(props, Client){
    var res = null;
    await knexQuery('don_hang')
    .insert({
        makh: Client.makh,
        macn: props.macn,
        ma_voucher: props.ma_voucher,
        phi_san_pham:props.phi_san_pham,
        phi_van_chuyen: props.phi_van_chuyen,
        phi_giam: props.phi_giam,
        hinh_thuc_thanh_toan: props.hinh_thuc_thanh_toan.toUpperCase().normalize(),
        hinh_thuc_giao_hang: props.hinh_thuc_giao_hang.toUpperCase().normalize(),
        id_dia_chi_giao: props.id_dia_chi_giao
    }).returning("madh").then(function (madh){
        // console.log(madh)
        res = madh
        console.log(madh)
    }).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // const res = await knexQuery.select('madh').from('don_hang')
    // .where('makh','=',Client.makh)
    // .andWhere('trang_thai','=','WAIT FOR PAYMENT').catch(error => {
    //     console.log(error)
    // });
    // console.log(res)
    return res[0]

}

async function addItems(items, order){

    const data = items.map(x => {
        return {
            madh: order.madh,
            masp: x.masp,
            ma_voucher: x.ma_voucher,
            so_luong_mua: x.so_luong_mua,
            gia_phai_tra: x.gia_phai_tra
        };
    });
    
    await knexQuery('chi_tiet_don_hang')
    .insert(data).catch(error => {
        console.log(error)
        throw new Error(error);
    });
}

async function updateOrderStatus(Client, status, token=false){
    if (token == false){
        // console.log("testtt",token)
        await knexQuery('don_hang')
        .where('makh','=',Client.makh)
        .andWhere('trang_thai','=','WAIT FOR PAYMENT')
        .update({
            trang_thai: status
        }).catch(error => {
            console.log(error)
            throw new Error(error);
        });
    }
    else {
        await knexQuery('don_hang')
        .where('payment_token','=',token)
        .update({
            trang_thai: status
        }).catch(error => {
            console.log(error)
            throw new Error(error);
        });
    }
}

async function updatePaymentToken(Client, token){
    await knexQuery('don_hang')
    .where('makh','=',Client.makh)
    .andWhere('trang_thai','=','WAIT FOR PAYMENT')
    .update({
        payment_token: token
    }).catch(error => {
        console.log(error)
        throw new Error(error);
    });
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 101,
        "message": "Tạo đơn hàng THẤT BẠI",
        "paymentURL":"",
    }

    const Client = await checkClient(req.headers);
    try {
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại"
            return res.send(response)
        }
        console.log("create_order === user:",Client.makh)
        const waitOrder = await checkOrder(Client); 
        if (typeof(waitOrder) != "undefined"){
            response.exitcode = 107
            response.message = "Tồn tại đơn hàng đang chờ thanh toán"
            return res.send(response)
        }

        if (isArray(req.body.items) != true){
            response.exitcode = 101
            response.message = "Thiếu/sai trường dữ liệu items"
            return res.send(response)
        }
        var sum_qty = 0
        for(var i = 0; i < req.body.items.length;i++)
            sum_qty += req.body.items[i].so_luong_mua

        if (req.body.items.length > 10 && sum_qty > 20){
            response.exitcode = 108
            response.message = "Số lượng items quá nhiều!!"
            return res.send(response)
        }

        // console.log(req.body)
        var order = await addOrder(req.body, Client);
        var items_add = await addItems(req.body.items, order);

        if (req.body.hinh_thuc_thanh_toan.toUpperCase().normalize() == 'COD'){
            updateOrderStatus(Client,'CHỜ XÁC NHẬN')
            response.exitcode = 0
            response.message = "TẠO ĐƠN HÀNG THÀNH CÔNG"
            return res.send(response)
        }
        else if (req.body.hinh_thuc_thanh_toan.toUpperCase().normalize() == 'MOMO'){
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
        else if (req.body.hinh_thuc_thanh_toan.toUpperCase().normalize() == 'PAYPAL'){
            const result = await paypalCall(req.body, Client);
            if (result.resultCode != 0){
                updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            }
            else updatePaymentToken(Client,result.token.token)
            response.exitcode   = result.resultCode;
            response.message    = result.message;
            response.paymentURL = result.payUrl;
            return res.send(response)
        }
        else if (req.body.hinh_thuc_thanh_toan.toUpperCase().normalize() == 'VNPAY'){
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
    catch (e) {
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
        updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
    }
        
    
    return res.send(response)
});

router.get('/momo_camon', async function(req, res, next) {
    const resultCode = req.query.resultCode
    var Client = {
        'makh': req.query.orderId.split('_')[0]
    }
    
    if (resultCode == 0){
        updateOrderStatus(Client,'CHỜ XÁC NHẬN')
        return res.redirect(SUCCESS_LINK)
        // return res.send('thanh cong')
    }
    else
        updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
        // return res.send('that bai')
        return res.redirect(FAIL_LINK)
        
});

router.get('/paypal_camon_success', async function(req, res, next) {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            updateOrderStatus('','THANH TOÁN THẤT BẠI',req.query.token)
            res.redirect(FAIL_LINK)
            // return res.send("that bai")
        } else {
            // console.log(JSON.stringify(payment));
            updateOrderStatus('','CHỜ XÁC NHẬN',req.query.token)
            res.redirect(SUCCESS_LINK)
            // return res.send("thanh cong")
        }
    });
});

router.get('/paypal_camon_fail', async function(req, res, next) {
    // console.log(req)
    updateOrderStatus('','THANH TOÁN THẤT BẠI',req.query.token)
    // return res.send('that bai')
    res.redirect(FAIL_LINK)
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
    var secretKey =  process.env.VNPAY_SECRETKEY;
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
            return res.redirect(SUCCESS_LINK)
            // return res.send('sucess')
        }
        else {
            updateOrderStatus(Client,'THANH TOÁN THẤT BẠI')
            return res.redirect(FAIL_LINK)
            // return res.send('fail')
        }
    }
    else {
        return res.redirect(FAIL_LINK)
        // return res.send("1231245")
    }
});

module.exports = router;
