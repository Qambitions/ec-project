var express = require('express');
var router = express.Router();
var knexQuery = require('../db_connect');

async function queryAds(props){
    var date = new Date();
    var date_str = String(date.toISOString().split('T')[0]);
    const rawSQL = `  SELECT hinh_anh_qc,vi_tri,link_website FROM hop_dong_quang_cao 
                      WHERE tg_bat_dau <= '${date_str}'
                      AND '${date_str}'<= tg_ket_thuc
                    `
    // return knexQuery.select().from("store_admin");
    const result = await knexQuery.raw(rawSQL)
    console.log(result)
    return result.rows
}

router.get('/', async (req, res, next) =>{
  var response = {
    "exitcode": 0,
    "message": "Lấy dữ liệu quảng cáo thành công",
    "list_ads": "",
  }
  const retAds = await queryAds(req.body);
  response.list_ads = retAds
  res.send(response)
});

module.exports = router;