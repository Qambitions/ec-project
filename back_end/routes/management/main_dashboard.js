var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryWeeklyReport(){
    var date = new Date()
    date.setDate(date.getDate() - 7);
    console.log(date)
    var dateStr = date.toISOString().split('T')[0]
    console.log(dateStr)
    const rawSQL = `SELECT dh.thoi_gian::date, sum(tong_phi),count(*)
                    FROM don_hang dh
                    LEFT JOIN chi_tiet_don_hang ctdh on dh.madh = ctdh.madh
                    WHERE dh.thoi_gian::date > '${dateStr}'
                    GROUP BY dh.thoi_gian::date
                  `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

async function queryTopSelling(){
  var date = new Date()
  date.setDate(date.getDate() - 7);
  console.log(date)
  var dateStr = date.toISOString().split('T')[0]
  console.log(dateStr)
  const rawSQL = `SELECT sp.masp, sp.ten_sp,sum(sp.gia_ban * ctdh.so_luong_mua) as GMV
                  FROM chi_tiet_don_hang ctdh 
                  LEFT JOIN san_pham sp on ctdh.masp = sp.masp 
                  GROUP BY 1,2
                  ORDER BY GMV desc
                  LIMIT 10
                `
  const result = await knexQuery.raw(rawSQL).catch(error => {
    console.log(error)
    throw new Error(error);
  });
  return result.rows  
}

router.get('/weekly_report', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "daily_sale":"",
    }
    try{
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          res.send(response)
          return
      }
      console.log("aaaa")
      const weeklyReport = await queryWeeklyReport();
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.daily_sale = weeklyReport
      // response.total  =  totalOrder
    }
    catch (e){
      response.exitcode= 1
      response.message = e
    }
    return res.send(response)
});

router.get('/top_selling', async (req, res, next) =>{
  var response = {
      "exitcode": 1,
      "message": "",
      "top_product":"",
  }
  try{
    if (req.headers.magic_pass != 'LamZauKhumKho'){
        response.message = "sai Pass ròi!!"
        res.send(response)
        return
    }
    console.log("aaaa")
    const topProduct = await queryTopSelling();
    response.exitcode = 0
    response.message = "lấy thông tin thành công"
    response.top_product = topProduct
  }
  catch (e){
    response.exitcode= 1
    response.message = e
    response['warning'] = "có lỗi bất ngờ xảy ra..."
  }
  return res.send(response)
});

module.exports = router;