var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryUserOverview(props){
    const rawSQL = `SELECT makh, email_kh, ma_cap_bac, activate
                    FROM khach_hang kh 
                    limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows  
}

async function queryTotalUser(props){
    const rawSQL = `SELECT count(*)
                    FROM khach_hang dh 
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
    const userOverview = await queryUserOverview(req.body);
    const totalUser = await queryTotalUser(req.body);
    response.exitcode = 0
    response.message = "lấy thông tin thành công"
    response.list_order = userOverview
    response.total  =  totalUser
    res.send(response)
    
});

module.exports = router;