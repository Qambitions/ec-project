var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function pushItem(props){
    // console.log(props)
    var ma_phieu_nhap = null
    await knexQuery('san_pham')
    .insert({
        malh           : props.malh,
        manpp          : props.manpp,
        ten_sp         : props.ten_sp,
        hinh_anh       : props.hinh_anh,
        mo_ta          : props.mo_ta,
        khoi_luong     : props.khoi_luong,
        gia_ban        : props.gia_ban
    }).returning('masp').then(function (masp){
        // console.log(masp)
        ma_phieu_nhap = masp
    }).catch(error => {
        console.log(error)
        throw new Error(error);
    });
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
    }
    try{
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          return res.send(response)
          
      }
      const orderOverview = await pushItem(req.body);
      response.exitcode   = 0
      response.message    = "Update thông tin thành công"
      console.log("1 items đã được add")
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
    
});

module.exports = router;