var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryVoucher(props){
    var date = new Date();
    var date_str = String(date.toISOString().split('T')[0]);
    // console.log(date_str)
    const rawSQL = `  SELECT ma_voucher, phan_tram_giam_gia, giam_toi_da FROM voucher  
                        WHERE tg_bat_dau <= '${date_str}'
                        AND '${date_str}'<= tg_ket_thuc
                        AND phan_loai = 'DH'
                        AND so_luong_voucher > 0
                    `
    
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 105,
        "message": "Không có mã nào tồn tại",
        "list_voucher": []
    }
    try{
        // console.log(req.headers.token)
        const retVoucher = await queryVoucher();
        if (retVoucher.length > 0)
            response.message      = "Lấy thông tin voucher thành công"
        response.exitcode     = 0
        response.list_voucher = retVoucher
    }
    catch (e){
        response.exitcode= 1
        response.message = e
    }
    return res.send(response)
});

module.exports = router;
