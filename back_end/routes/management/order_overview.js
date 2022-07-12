var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryOrderOverview(props){
    const rawSQL = `SELECT madh, (thoi_gian + interval '7 hours') as thoi_gian,tong_phi, trang_thai 
                    FROM don_hang dh 
                    limit '${props.limit}' offset '${props.offset}'
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
        "message": "",
        "total":"",
        "list_order":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    req.body.limit = (typeof req.body.limit === 'undefined') ? 5 : req.body.limit;
    req.body.offset = (typeof req.body.offset === 'undefined') ? 0 : req.body.offset;
    const orderOverview = await queryOrderOverview(req.body);
    const totalOrder = await queryTotalOrder(req.body);
    response.exitcode = 0
    response.message = "lấy thông tin thành công"
    response.list_order = orderOverview
    response.total  =  totalOrder
    res.send(response)
    
});

module.exports = router;