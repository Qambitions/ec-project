var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryAdmin(props){
  const rawSQL = `  SELECT count(*) FROM store_admin 
                    WHERE email  = '${props.username}'
                    AND mat_khau = '${props.password}'
                  `
  // return knexQuery.select().from("store_admin");
  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

async function queryUser(props){
  const rawSQL = `  SELECT makh, tenkh, email_kh, sdt_kh FROM khach_hang 
                    WHERE (email_kh  = '${props.username}' or sdt_kh = '${props.username}')
                    AND mat_khau = '${props.password}'
                    group by 1,2,3,4
                  `
  // return knexQuery.select().from("store_admin");
  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

async function updateToken(props,token){
  var date = new Date();
  date.setDate(date.getDate() + 3);
  await knexQuery('khach_hang')
  .whereRaw(`(email_kh  = '${props.username}' or sdt_kh = '${props.username}') and mat_khau = '${props.password}'`)
  .update({
    kh_token: token,
    token_end_time: String(date.toISOString().split('T')[0]),
  })
}

router.post('/', async (req, res, next) =>{
  var response = {
    "exitcode": 1,
    "message": "Thông tin đăng nhập không đúng",
    "token": "",
    "account_type":"",
    "account_info":"",
  }
  
  const retAdmin = await queryAdmin(req.body);
  console.log(retAdmin)
  if (retAdmin.count > 0){
    response.account_type = 0
    response.message      = "Chào mừng mấy đứa đua đòi làm zàu!!"
    response.exitcode     = 0
    res.send(response)
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
      res.send(response)
    }
    else res.send(response)
  }
});

module.exports = router;
