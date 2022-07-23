var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryInventoryOverview(props){
    const rawSQL = `SELECT masp, ten_sp, 
                    FROM san_pham
                    where (malh = '${props.malh}' or '${props.malh}' is null)
                    limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
  });
  return result.rows  
}

async function queryTotalInventory(props){
    const rawSQL = `SELECT count(*)
                    FROM san_pham dh 
                    where (malh = '${props.malh}' or '${props.malh}' is null)
                  `

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
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
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    req.query.limit = (typeof req.query.limit === 'undefined') ? 5 : req.query.limit;
    req.query.offset = (typeof req.query.offset === 'undefined') ? 0 : req.query.offset;
    req.query.malh = (typeof req.query.malh === 'undefined') ? 'null' : req.query.malh;

    const InventoryOverview = await queryInventoryOverview(req.query);
    const totalInventory = await queryTotalInventory(req.query);
    response.exitcode = 0
    response.message = "lấy thông tin thành công"
    response.list_order = InventoryOverview
    response.total  =  totalInventory
    res.send(response)
    
});

module.exports = router;