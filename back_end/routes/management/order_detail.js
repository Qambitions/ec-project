var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryOrderDetail(props){
    const rawSQL = `SELECT madh, (thoi_gian + interval '7 hours') as thoi_gian,tong_phi, trang_thai, 
                    dh.HINH_THUC_THANH_TOAN, dh.HINH_THUC_GIAO_HANG,
                    dc.SO_NHA_DUONG, dc.PHUONG_XA, dc.QUAN_TP, dc.TP_TINH,
                    kh.tenkh, kh.sdt_kh 
                    FROM don_hang dh 
                    left join dia_chi_kh dc on dh.makh = dc.makh and dh.id_dia_chi_giao = dc.stt
                    left join khach_hang kh on dh.makh = kh.makh   
                    where dh.madh = '${props.madh}'
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Sai thông tin/sản phẩm không tồn tại",
        "list_order":"",
    }
    try {
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          res.send(response)
          return
      }
      const orderOverview = await queryOrderDetail(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_order = orderOverview
    }
    catch (e){
      response.message = e
    }
    
    res.send(response)
});

module.exports = router;