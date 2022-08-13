var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');
require("dotenv").config();
const crypto = require("crypto");
const secret = process.env.SECRET_KEY;

async function checkAvailable(props){
  const rawSQL = `  SELECT count(*) FROM khach_hang 
                    WHERE email_kh  = '${props.email_kh}'
                    or sdt_kh = '${props.sdt_kh}'
                  `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows[0]
}

async function addAccount(props){
  await knexQuery('khach_hang')
  .insert({
    tenkh: props.tenkh,
    email_kh: props.email_kh,
    sdt_kh: props.sdt_kh,
    mat_khau: crypto.createHmac("sha256", secret).update(props.mat_khau).digest("base64"),
    check_sd_voucher: false,
  })

  const rawSQL = `  SELECT makh FROM khach_hang 
                    WHERE email_kh  = '${props.email_kh}'
                    or sdt_kh = '${props.sdt_kh}'
                  `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  // console.log(result.rows[0])

  await knexQuery('dia_chi_kh')
  .insert({
    makh: result.rows[0].makh,
    stt: 1,
    districtid: props.districtid,
    so_nha_duong: props.so_nha_duong,
    phuong_xa: props.phuong_xa,
    quan_tp: props.quan_tp,
    tp_tinh: props.tp_tinh,
    mac_dinh: true
  }).catch(error => {
    console.log(error)
    throw new Error(error);
  });
}

router.post('/', async (req, res, next) =>{
  req.body.districtid = (typeof req.query.districtid === 'undefined') ? 0 : req.query.districtid;
  var response = {
    "exitcode": 101,
    "message": "Đăng ký thất bại",
    "token": "",
  }
  try{
    const checkRes = await checkAvailable(req.body);
    if (checkRes.count > 0){
      response.message      = "Email hoặc sđt đã tồn tại"
      response.exitcode     = 104
      return res.send(response)
    }
    else {
      await addAccount(req.body);
      response.message      = "Đăng ký tài khoản thành công!!"
      response.exitcode     = 0
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
