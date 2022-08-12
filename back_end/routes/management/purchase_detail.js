var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryPurchaseDetail(props){
    const rawSQL = `SELECT pn.mapn, npp.ten_npp, macn, pn.ngay_lap, pn.tong_tien_nhap, pn.tong_so_mat_hang
                    FROM PHIEU_NHAP_HANG pn
                    left join nha_phan_phoi npp on npp.manpp = pn.manpp 
                    where mapn = '${props.mapn}'
                  `
  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

async function queryPurchaseItem(props){
    const rawSQL = `SELECT ct.masp, ct.so_luong_nhap, ct.don_gia_nhap, ct.thanh_tien_nhap,
                    sp.ten_sp
                    FROM CHI_TIET_NHAP_HANG ct
                    left join san_pham sp on ct.masp = sp.masp 
                    where mapn = '${props.mapn}'
                  `
  const result = await knexQuery.raw(rawSQL)
  return result.rows
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "purchase":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
      req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
      const purhchaseOverview = await queryPurchaseDetail(req.query);
      const purhchaseItems= await queryPurchaseItem(req.query);
      var fres = {
        "mapn": purhchaseOverview.mapn,
        "ten_npp": purhchaseOverview.ten_npp,
        "macn": purhchaseOverview.macn,
        "ngay_lap": purhchaseOverview.ngay_lap,
        "tong_tien_nhap": purhchaseOverview.tong_tien_nhap,
        "tong_so_mat_hang":purhchaseOverview.tong_so_mat_hang,
        "items": purhchaseItems
      } 
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.purchase = fres
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }

    return res.send(response)
    
});

module.exports = router;