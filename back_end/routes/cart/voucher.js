var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryVoucher(props){
    var date = new Date();
    var date_str = String(date.toISOString().split('T')[0]);
    const rawSQL = `  SELECT ma_voucher, phan_tram_giam_gia, giam_toi_da FROM voucher  
                        WHERE tg_bat_dau <= '${date_str}'
                        AND '${date_str}'<= tg_ket_thuc
                        AND phan_loai = 'sanpham'
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "list_voucher": []
    }
    // console.log(req.headers.token)
    const retVoucher = await queryVoucher(req.headers);
    response.message      = "Lấy thông tin voucher thành công"
    response.exitcode     = 0
    response.list_voucher = retVoucher
    res.send(response)
});

module.exports = router;
