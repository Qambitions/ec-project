var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function checkClient(props){
    const rawSQL = ` 
                    select tenkh, email_kh, sdt_kh, ngsinh_kh
                    from khach_hang kh 
                    where kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    and kh.kh_token is not null
                    `
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
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
    });
    return result.rows[0]
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
});

module.exports = router;