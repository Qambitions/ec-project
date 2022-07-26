var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryPurchaseOverview(props){
    const rawSQL = `SELECT pn.mapn, npp.ten_npp, macn, pn.ngay_lap, pn.tong_tien_nhap, pn.tong_so_mat_hang
                    FROM PHIEU_NHAP_HANG pn
                    left join nha_phan_phoi npp on npp.manpp = pn.manpp 
                    where macn = '${props.macn}'
                    limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows  
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "list_purchase":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
      req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
      const purhchaseOverview = await queryPurchaseOverview(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_purchase = purhchaseOverview
    }
    catch (e){
      response.exitcode= 1
      response.message = e
    }

    return res.send(response)
    
});

module.exports = router;