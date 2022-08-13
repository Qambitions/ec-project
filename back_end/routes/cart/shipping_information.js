var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function queryAddress(props){
    const rawSQL = ` 
                    select dck.districtid, dck.stt, dck.so_nha_duong, dck.phuong_xa, dck.quan_tp, dck.tp_tinh, dck.mac_dinh
                    from khach_hang kh 
                    left join dia_chi_kh dck on dck.makh = kh.makh 
                    where kh.kh_token = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}' 
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 101,
        "message": "Lấy thông tin thất bại / Không có thông tin address",
        "list_address": []
    }
    try{
        // console.log(req.headers.token)
        const retAddress = await queryAddress(req.headers);
        response.message      = "Lấy thông tin address thành công"
        response.exitcode     = 0
        response.list_address = retAddress
    }
    catch (e){
        response.exitcode= 1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
});

module.exports = router;
