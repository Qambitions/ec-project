var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryInventoryOverview(props){
    const rawSQL = `SELECT masp, ten_sp, 
                    FROM san_pham
                    where (malh = '${props.malh}' or '${props.malh}' is null)
                    limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows  
}

async function queryTotalInventory(props){
    const rawSQL = `SELECT count(*)
                    FROM san_pham dh 
                    where (malh = '${props.malh}' or '${props.malh}' is null)
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
    req.body.malh = (typeof req.body.malh === 'undefined') ? 'null' : req.body.malh;

    const InventoryOverview = await queryInventoryOverview(req.body);
    const totalInventory = await queryTotalInventory(req.body);
    response.exitcode = 0
    response.message = "lấy thông tin thành công"
    response.list_order = InventoryOverview
    response.total  =  totalInventory
    res.send(response)
    
});

module.exports = router;