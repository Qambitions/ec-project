var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryOrderOverview(props){
    const rawSQL = `SELECT madh, (thoi_gian + interval '7 hours') as thoi_gian,tong_phi, trang_thai 
                    FROM don_hang dh 
                    order by madh
                   -- limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

async function queryTotalOrder(props){
  const rawSQL = `SELECT count(*)
                  FROM don_hang dh 
                `

const result = await knexQuery.raw(rawSQL).catch(error => {
  console.log(error)
  throw new Error(error);
});
return result.rows[0].count
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "total":"",
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
      const orderOverview = await queryOrderOverview(req.query);
      const totalOrder = await queryTotalOrder(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_order = orderOverview
      response.total  =  totalOrder
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
    
});

module.exports = router;