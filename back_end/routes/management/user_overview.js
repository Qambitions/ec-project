var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryUserOverview(props){
    const rawSQL = `SELECT makh, email_kh, ma_cap_bac, activate
                    FROM khach_hang kh 
                    ORDER BY makh
                    --limit '${props.limit}' offset '${props.offset}'
                  `

  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

async function queryTotalUser(props){
    const rawSQL = `SELECT count(*)
                    FROM khach_hang dh 
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
        "list_user":"",
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
      const userOverview = await queryUserOverview(req.query);
      const totalUser = await queryTotalUser(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.list_user = userOverview
      response.total  =  totalUser
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }

    return res.send(response)
    
});

module.exports = router;