var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryAddress(props){
    const rawSQL = ` 
                    select dck.stt, dck.so_nha_duong, dck.phuong_xa, dck.quan_tp, dck.tp_tinh, dck.mac_dinh
                    from khach_hang kh 
                    left join dia_chi_kh dck on dck.makh = kh.makh 
                    where kh.kh_token = '${props.token}' 
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "list_address": []
    }
    // console.log(req.headers.token)
    const retAddress = await queryAddress(req.headers);
    response.message      = "Lấy thông tin voucher thành công"
    response.exitcode     = 0
    response.list_voucher = retAddress
    res.send(response)
});

module.exports = router;
