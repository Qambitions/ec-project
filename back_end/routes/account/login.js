var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;


async function queryAdmin(props){
  const rawSQL = `  SELECT count(*) FROM store_admin 
                    WHERE email  = '${props.username}'
                    AND mat_khau = '${crypto.createHmac("sha256", secret).update(props.password).digest("base64")}'
                  `
  // return knexQuery.select().from("store_admin");
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows[0]
}

async function queryUser(props){
  const rawSQL = `  SELECT makh, tenkh, email_kh, sdt_kh FROM khach_hang 
                    WHERE (email_kh  = '${props.username}' or sdt_kh = '${props.username}')
                    AND mat_khau = '${crypto.createHmac("sha256", secret).update(props.password).digest("base64")}'
                  `
  // return knexQuery.select().from("store_admin");
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows[0]
}

async function updateToken(props,token){
  var password = crypto.createHmac("sha256", secret).update(props.password).digest("base64")
  await knexQuery('khach_hang')
  .whereRaw(`(email_kh  = '${props.username}' or sdt_kh = '${props.username}') and mat_khau = '${crypto.createHmac("sha256", secret).update(props.password).digest("base64")}'`)
  .update({
    kh_token: crypto.createHmac("sha256", secret).update(token).digest("base64"),
  }).catch(error => {
    console.log(error)
    throw new Error(error);
  });
}

router.post('/', async (req, res, next) =>{
  var response = {
    "exitcode": 104,
    "message": "Thông tin đăng nhập không đúng",
    "token": "",
    "account_type":"",
    "account_info":"",
  }
  try{
    const retAdmin = await queryAdmin(req.body);
    console.log(retAdmin)
    if (retAdmin.count > 0){
      response.account_type = 0
      response.message      = "Chào mừng mấy đứa đua đòi làm zàu!!"
      response.exitcode     = 0
      return res.send(response)
    }
    else {
      const retUser = await queryUser(req.body);
      if (typeof(retUser) != "undefined"){
        response.account_type = 1
        response.message      = "Đăng nhập thành công"
        response.exitcode     = 0
        response.account_info = retUser
        response.token = require('crypto').randomBytes(47).toString('hex');
        await updateToken(req.body, response.token);
        return res.send(response)
      }
      else return res.send(response)
    }
  }
  catch (e){
    response.exitcode = 1
    response.message = e
    response['warning'] = "có lỗi bất ngờ xảy ra..."
  }
  return res.send(response)
});

module.exports = router;
