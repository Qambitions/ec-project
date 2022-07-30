var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function updateToken(props,token){
    var date = new Date();
    date.setDate(date.getDate() + 3);
    await knexQuery('khach_hang')
    .whereRaw(`kh_token  = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}'`)
    .update({
      kh_token: null
    }).catch(error => {
      console.log(error)
    });
  }

router.post('/', async (req, res, next) =>{
    var response = {
      "exitcode": 0,
      "message": "Đăng xuất thành công",
      "token": "",
     
    }

    await updateToken(req.headers,);
    return res.send(response)
});

module.exports = router;