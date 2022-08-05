var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function pushPO(props){
    console.log(props)
    await knexQuery('phieu_nhap_hang')
    .insert({
        manpp           : props.manpp,
        macn            : props.macn,
        tong_tien_nhap  : props.tong_tien_nhap,
        tong_so_mat_hang: props.po_items.length
    }).returning('mapn').then(function (mapn){
        console.log(mapn)
    })
    .catch(error => {
        console.log(error)
    });
    

    // const data = items.map(x => {
    //     return {
    //         madh: order.madh,
    //         masp: x.masp,
    //         ma_voucher: x.ma_voucher,
    //         so_luong_mua: x.so_luong_mua,
    //         gia_phai_tra: x.gia_phai_tra
    //     };
    // });
    
    // await knexQuery('chi_tiet_don_hang')
    // .insert(data).catch(error => {
    //     console.log(error)
    // });
}

router.post('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "",
        "po_items":"",
        "tong_tien_nhap":"",
    }
    try{
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          res.send(response)
          return
      }
      const orderOverview = await pushPO(req.body);
      response.exitcode   = 0
      response.message    = "lấy thông tin thành công"
      response.list_order = orderOverview
      response.total      =  totalOrder
    }
    catch (e){
      response.exitcode= 1
      response.message = e
    }
    return res.send(response)
    
});

module.exports = router;