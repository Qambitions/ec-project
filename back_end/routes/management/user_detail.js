var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryUserDetail(props){
    const rawSQL = `SELECT makh, email_kh, ma_cap_bac, activate,
                    ngsinh_kh, tenkh, sdt_kh, thoi_gian_dk,
                    tong_so_don_da_mua, tong_so_don_da_huy,
                    tong_diem_tich_luy
                    FROM khach_hang kh 
                    WHERE kh.makh = '${props.makh}' 
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "user":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      const user= await queryUserDetail(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.user = user
    }
    catch (e){
      response.exitcode= 1
      response.message = e
    }

    return res.send(response)
    
});

module.exports = router;