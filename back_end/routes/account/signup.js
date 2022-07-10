var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function checkAvailable(props){
  const rawSQL = `  SELECT count(*) FROM khach_hang 
                    WHERE email_kh  = '${props.email_kh}'
                    or sdt_kh = '${props.sdt_kh}'
                  `
  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

async function addAccount(props){
  await knexQuery('khach_hang')
  .insert({
    tenkh: props.tenkh,
    email_kh: props.email_kh,
    sdt_kh: props.sdt_kh,
    mat_khau: props.mat_khau,
    check_sd_voucher: false,
    ma_cap_bac: 4,
    tong_diem_tich_luy: 0,
  })

  const rawSQL = `  SELECT makh FROM khach_hang 
                    WHERE email_kh  = '${props.email_kh}'
                    or sdt_kh = '${props.sdt_kh}'
                  `
  const result = await knexQuery.raw(rawSQL)
  // console.log(result.rows[0])

  await knexQuery('dia_chi_kh')
  .insert({
    makh: result.rows[0].makh,
    stt: 1,
    so_nha_duong: props.so_nha_duong,
    phuong_xa: props.phuong_xa,
    quan_tp: props.quan_tp,
    tp_tinh: props.tp_tinh,
    mac_dinh: true
  })
}

router.post('/', async (req, res, next) =>{
  var response = {
    "exitcode": 1,
    "message": "Đăng ký thất bại",
    "token": "",
  }

  const checkRes = await checkAvailable(req.body);
  if (checkRes.count > 0){
    response.message      = "Email hoặc sđt đã tồn tại"
    response.exitcode     = 104
    res.send(response)
  }
  else {
    await addAccount(req.body);
    response.message      = "Đăng ký tài khoản thành công!!"

    response.exitcode     = 0
    res.send(response)
  }
});

module.exports = router;
