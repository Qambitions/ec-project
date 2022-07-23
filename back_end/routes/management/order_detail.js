var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryOrderOverview(props){
    const rawSQL = `SELECT madh, (thoi_gian + interval '7 hours') as thoi_gian,tong_phi, trang_thai 
                    FROM don_hang dh 
                    
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows  
}

async function queryTotalOrder(props){
    const rawSQL = `SELECT count(*)
                    FROM don_hang dh 
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows[0].count
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Sai thông tin/sản phẩm không tồn tại",
        "total":"",
        "list_order":"",
    }
    try {
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          res.send(response)
          return
      }
      const orderOverview = await queryOrderOverview(req.query);
      const totalOrder = await queryTotalOrder(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_order = orderOverview
      response.total  =  totalOrder
    }
    catch (e){
      response.message = e
    }
    
    res.send(response)
});

module.exports = router;