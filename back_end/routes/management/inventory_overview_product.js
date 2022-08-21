var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryInventoryOverview(props){
  var rawSQL = `SELECT sp.masp, ten_sp, kho.so_luong_ton 
                FROM san_pham sp
                LEFT JOIN kho ON sp.masp = kho.masp
                WHERE kho.macn = '${props.macn}'
                  `
  if (typeof props.malh != 'undefined'){
    rawSQL += ` and malh = '${props.malh}' ` 
  }
  // rawSQL += ` limit '${props.limit}' offset '${props.offset}' `
                  

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

async function queryTotalInventory(props){
    var rawSQL = `SELECT count(*)
                    FROM san_pham dh 
                  `
    if (typeof props.malh != 'undefined'){
      rawSQL += ` where malh = '${props.malh}' `
      var rawSQL2 = `SELECT ten_lh 
                    FROM loai_hang
                    where malh = '${props.malh}'
                  ` 
      var result2 = await knexQuery.raw(rawSQL2).catch(error => {
        console.log(error)
        throw new Error(error);
      });
    }

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  // console.log(result2)
  return {
    total: result.rows[0].count,
    loai_hang : result2.rows[0].ten_lh,
  } 
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "total":"",
        "ten_loai_hang":"",
        "list_order":"",
    }
    try{
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          res.send(response)
          return
      }
      req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
      req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
      req.query.offset = req.query.offset * req.query.limit
      // req.query.malh = (typeof req.query.malh === 'undefined') ? 'null' : req.query.malh;

      const InventoryOverview = await queryInventoryOverview(req.query);
      const totalInventory = await queryTotalInventory(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_order = InventoryOverview
      response.total  =  totalInventory.total
      response.ten_loai_hang  =  totalInventory.loai_hang
    }
    catch (e){
        response.exitcode=1
        response.message = e
        response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
    
});

module.exports = router;
