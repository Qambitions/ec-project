var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryBranch(props){
    var rawSQL = `SELECT *
                    FROM chi_nhanh  
                  `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
  });
  return result.rows  
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "chi_nhanh":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      const chi_nhanh = await queryBranch(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.chi_nhanh = chi_nhanh
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }

    return res.send(response)
    
});

module.exports = router;