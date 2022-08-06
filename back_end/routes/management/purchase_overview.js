var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryPurchaseOverview(props){
    var rawSQL = `SELECT pn.mapn, npp.ten_npp, pn.macn, pn.ngay_lap, pn.tong_tien_nhap, pn.tong_so_mat_hang
                    FROM PHIEU_NHAP_HANG pn
                    left join nha_phan_phoi npp on npp.manpp = pn.manpp  
                  `
    if (typeof props.macn != 'undefined'){
      rawSQL += ` where pn.macn = '${props.macn}' `
    }
    rawSQL += ` limit '${props.limit}' offset '${props.offset}' `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
  });
  return result.rows  
}

async function queryTotalPurchase(props){
  var rawSQL = `SELECT count(*)
                  FROM phieu_nhap_hang
                `
  if (typeof props.macn != 'undefined'){
    rawSQL += ` where macn = '${props.macn}' `
  }
  console.log(rawSQL)
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
  });
  console.log(result)
  return result.rows[0].count
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "list_purchase":"",
        "total_purchase":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
      req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
      req.query.offset = req.query.offset * req.query.limit
      const purhchaseOverview = await queryPurchaseOverview(req.query);
      const totalPurchase = await queryTotalPurchase(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_purchase = purhchaseOverview
      console.log(purhchaseOverview)
      response.total_purchase = totalPurchase
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }

    return res.send(response)
    
});

module.exports = router;