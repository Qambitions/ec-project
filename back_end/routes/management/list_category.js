var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryCategory(props){
    var rawSQL = `SELECT *
                    FROM loai_hang  
                  `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Lấy thông tin thất bại",
        "loai_hang":"",
    }
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    
    try{
      const category = await queryCategory(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.loai_hang = category
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }

    return res.send(response)
    
});

module.exports = router;