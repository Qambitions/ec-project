var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const { order } = require('paypal-rest-sdk');
const secret = process.env.SECRET_KEY;

async function checkClient(props){
    if (typeof(props.token) == "undefined") props.token = '' 
    
    const rawSQL = ` 
                    select tenkh, email_kh, sdt_kh, ngsinh_kh, makh
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

async function clientAddress(props){
    const rawSQL = ` 
                    select dc.stt, dc.so_nha_duong, dc.phuong_xa, dc.quan_tp, dc.tp_tinh, dc.mac_dinh
                    from khach_hang kh
                    left join  dia_chi_kh dc on kh.makh = dc.makh
                    where kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows[0]
}

async function clientOrder(props,page){
    const rawSQL = ` 
                    SELECT dh.trang_thai, dh.tong_phi, dh.madh
                    FROM khach_hang kh
                    left join don_hang dh on kh.makh = dh.makh 
                    WHERE kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}'
                    order by dh.thoi_gian desc
                    limit '${page.limit}' offset '${page.offset}'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // console.log(result)
    return result.rows
}

async function queryOrderInfo(props){
    const rawSQL = ` 
                    SELECT dh.madh, dh.thoi_gian, dh.trang_thai, 
                    dc.so_nha_duong, dc.phuong_xa, dc.quan_tp, dc.tp_tinh,
                    kh.tenkh, kh.sdt_kh,
                    dh.hinh_thuc_thanh_toan, dh.hinh_thuc_giao_hang
                    FROM don_hang dh
                    left join dia_chi_kh dc on  dh.makh = dc.makh and dh.id_dia_chi_giao = dc.stt
                    left join khach_hang kh on kh.makh = dh.makh
                    where dh.madh = '${props.madh}'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // console.log(result)
    return result.rows[0]
}

async function queryOrderState(props){
    const rawSQL = ` 
                    SELECT trang_thai, thoi_gian
                    FROM trang_thai_dh
                    WHERE madh = '${props.madh}'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // console.log(result)
    return result.rows
}

async function queryOrderItems(props){
    const rawSQL = ` 
                    SELECT ctdh.so_luong_mua, ctdh.gia_phai_tra, ctdh.thanh_tien_mua, sp.ten_sp, sp.hinh_anh, npp.ten_npp
                    FROM chi_tiet_don_hang ctdh
                    left join san_pham sp on sp.masp = ctdh.masp 
                    left join nha_phan_phoi npp on npp.manpp = sp.manpp
                    WHERE madh = '${props.madh}'
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    // console.log(result)
    return result.rows
}

router.get('/basic_info', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "lấy thông tin thất bại",
        "user":"",
    }

    const Client = await checkClient(req.headers);
    try {
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại/user không tồn tại"
            return res.send(response)
        }
        response.exitcode = 0
        response.message = 'Lấy thông tin thành công'
        response.user = Client
        return res.send(response)
    }
    catch (e) {
        console.log(e)
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

router.get('/address', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "lấy thông tin thất bại",
        "address":"",
    }

    const Address = await clientAddress(req.headers);
    try {
        if (typeof(Address) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại/user không tồn tại"
            return res.send(response)
        }
        response.exitcode = 0
        response.message = 'Lấy thông tin thành công'
        response.address = Address
        return res.send(response)
    }
    catch (e) {
        console.log(e)
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

router.get('/user_order_overview', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "lấy thông tin thất bại",
        "orders":"",
    }

    try {
        req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
        req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
        req.query.offset = req.query.offset * req.query.limit
        const Order = await clientOrder(req.headers,req.query);
        if ((typeof(Order) == "undefined") || order.length == 0){
            response.exitcode = 147
            response.message = "Không có đơn hàng nào"
            return res.send(response)
        }
        response.exitcode = 0
        response.message = 'Lấy thông tin thành công'
        response.orders = Order
        return res.send(response)
    }
    catch (e) {
        console.log(e)
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

router.get('/user_order_detail/info', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "lấy thông tin thất bại",
        "info":"",
        "list_state":""
    }
    try {
        
        const Client = await checkClient(req.headers);
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại/user không tồn tại"
            return res.send(response)
        }
        const orderDetail_info = await queryOrderInfo(req.query);
        const orderDetail_state = await queryOrderState(req.query);
        if (typeof(orderDetail_info) == "undefined"){
            response.exitcode = 106
            response.message = "Đơn hàng không tồn tại"
            return res.send(response)
        }
        response.exitcode = 0
        response.message = 'Lấy thông tin thành công'
        response.info = orderDetail_info
        response.list_state = orderDetail_state
        return res.send(response)
    }
    catch (e) {
        console.log(e)
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

router.get('/user_order_detail/items', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "lấy thông tin thất bại",
        "items":"",
    }
    try {
        
        const Client = await checkClient(req.headers);
        if (typeof(Client) == "undefined"){
            response.exitcode = 106
            response.message = "Token không tồn tại/user không tồn tại"
            return res.send(response)
        }
        const orderItems = await queryOrderItems(req.query);
        if ((typeof(orderItems) == "undefined") || (orderItems.length == 0)){
            response.exitcode = 106
            response.message = "Đơn hàng không tồn tại"
            return res.send(response)
        }
        response.exitcode = 0
        response.message = 'Lấy thông tin thành công'
        response.items = orderItems
        return res.send(response)
    }
    catch (e) {
        console.log(e)
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});


module.exports = router;