var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function updateToken(props,token){
    var date = new Date();
    date.setDate(date.getDate() + 3);
    await knexQuery('khach_hang')
    .whereRaw(`kh_token  = '${props.token}'`)
    .update({
      kh_token: null,
      token_end_time: null,
    })
  }

router.post('/', async (req, res, next) =>{
    var response = {
      "exitcode": 0,
      "message": "Đăng xuất thành công",
      "token": "",
     
    }

    await updateToken(req.headers,);
    res.send(response)
});

module.exports = router;