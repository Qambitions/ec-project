var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function pushPO(props){
    // console.log(props)
    var ma_phieu_nhap = null
    await knexQuery('phieu_nhap_hang')
    .insert({
        manpp           : props.manpp,
        macn            : props.macn,
        tong_tien_nhap  : props.tong_tien_nhap,
        tong_so_mat_hang: props.po_items.length
    }).returning('mapn').then(function (mapn){
        console.log(mapn)
        ma_phieu_nhap = mapn
    }).catch(error => {
        console.log(error)
        throw new Error(error);
    });

    const data = props.po_items.map(x => {
        return {
            mapn: ma_phieu_nhap[0].mapn,
            masp: x.masp,
            so_luong_nhap: x.so_luong_nhap,
            don_gia_nhap: x.don_gia_nhap
        };
    });
    
    await knexQuery('chi_tiet_nhap_hang')
    .insert(data).catch(error => {
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
          res.send(response)
          return
      }
      const orderOverview = await pushPO(req.body);
      response.exitcode   = 0
      response.message    = "Update thông tin thành công"
    }
    catch (e){
      response.exitcode= 1
      response.message = e
      response['warning'] = "có lỗi bất ngờ xảy ra..."
    }
    return res.send(response)
    
});

module.exports = router;