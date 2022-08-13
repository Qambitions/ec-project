var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function queryUser(props){
    var date = new Date();
    var date_str = String(date.toISOString().split('T')[0]);
    const rawSQL = `  SELECT count(*) FROM khach_hang 
                        WHERE kh_token  = '${crypto.createHmac("sha256", secret).update(props.token).digest("base64")}'
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL).catch(error => {
        console.log(error)
        throw new Error(error);
    });
    return result.rows[0]
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 104,
        "message": "Thông tin đăng nhập không đúng",
        "token": "",
        "account_type":""
    }
    // console.log(req.headers.token)
    const retUser = await queryUser(req.headers);
    if (retUser.count > 0){
      response.account_type = 1
      response.message      = "Đăng nhập thành công"
      response.exitcode     = 0
      return res.send(response)
    }
    else return res.send(response)
});

module.exports = router;
