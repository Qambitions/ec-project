var express = require('express');
var router = express.Router();
var knexQuery = require('../../db_connect');

async function queryOrderDetail(props){
    const rawSQL = `SELECT madh, (thoi_gian + interval '7 hours') as thoi_gian,tong_phi, trang_thai, 
                    dh.hinh_thuc_thanh_toan, dh.hinh_thuc_giao_hang, 
                    dh.phi_san_pham, dh.phi_van_chuyen, dh.phi_giam,
                    dc.SO_NHA_DUONG, dc.PHUONG_XA, dc.QUAN_TP, dc.TP_TINH,
                    kh.tenkh, kh.sdt_kh 
                    FROM don_hang dh 
                    left join dia_chi_kh dc on dh.makh = dc.makh and dh.id_dia_chi_giao = dc.stt
                    left join khach_hang kh on dh.makh = kh.makh   
                    where dh.madh = '${props.madh}'
                  `

  const result = await knexQuery.raw(rawSQL)
  return result.rows[0]
}

async function queryOrderItems(props){
  const rawSQL = `select ctdh.masp, so_luong_mua, gia_phai_tra, thanh_tien_mua, sp.ten_sp, sp.hinh_anh
                  from chi_tiet_don_hang ctdh
                  left join san_pham sp on sp.masp = ctdh.masp 
                  where madh = '${props.madh}'
                `
  const result = await knexQuery.raw(rawSQL)
  return result.rows
}

async function changeOrderStatus(props){
  await knexQuery('don_hang')
  .where('madh','=',props.madh)
  .update({
    trang_thai:props.trang_thai_moi
  }).catch(error => {
    console.log(error)
  });
}

async function checkInventory(props){
  const rawSQL = `SELECT ctdh.masp
                  FROM chi_tiet_don_hang ctdh 
                  LEFT JOIN don_hang dh on dh.madh = ctdh.madh 
                  LEFT JOIN kho k on k.masp = ctdh.masp and k.macn = dh.macn 
                  WHERE dh.madh = '${props.madh}' 
                  AND k.so_luong_ton - ctdh.so_luong_mua < 0
                `
  const result = await knexQuery.raw(rawSQL)
  return result.rows
}

async function checkFlow(props){
  if (props.trang_thai_hien_tai.toUpperCase() == 'CHỜ XÁC NHẬN' &&
      props.trang_thai_moi.toUpperCase() == 'ĐÃ XÁC NHẬN'){
      var status = await checkInventory(props);
      if (status.length == 0)
        return true
      else {
        return status
      }
  }

  if (props.trang_thai_hien_tai.toUpperCase() == 'ĐÃ XÁC NHẬN' &&
      (props.trang_thai_moi.toUpperCase() == 'ĐANG GIAO' || props.trang_thai_moi.toUpperCase() == 'HỦY ĐƠN HÀNG'))
        return true

  if (props.trang_thai_hien_tai.toUpperCase() == 'ĐANG GIAO' &&
      (props.trang_thai_moi.toUpperCase() == 'ĐÃ GIAO THÀNH CÔNG' || props.trang_thai_moi.toUpperCase() == 'HỦY ĐƠN HÀNG'))
        return true

  return false
}

router.get('/', async (req, res, next) =>{
    var response = {
        "exitcode": 1,
        "message": "Sai thông tin/sản phẩm không tồn tại",
        "order":"",
    }
    try {
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          return res.send(response)
      }
      if (typeof(req.query.madh) == "undefined"){
        response.exitcode = 101
        response.message = "chưa có thông tin đơn hàng"
        return res.send(response)
      }
      const orderOverview = await queryOrderDetail(req.query);
      var dia_chi = {
        "so_nha_duong":orderOverview.so_nha_duong,
        "phuong_xa":orderOverview.phuong_xa,
        "quan_tp":orderOverview.quan_tp,
        "tp_tinh":orderOverview.tp_tinh,
      }
      const orderItems = await queryOrderItems(req.query);
      response.exitcode = 0
      response.message = "lấy thông tin thành công"
      response.order = {
        "madh": orderOverview.madh,
        "thoi_gian": orderOverview.thoi_gian,
        "tong_phi": orderOverview.tong_phi,
        "phi_san_pham":orderOverview.phi_san_pham,
        "phi_van_chuyen":orderOverview.phi_van_chuyen,
        "phi_giam":orderOverview.phi_giam,
        "trang_thai": orderOverview.trang_thai,
        "dia_chi": dia_chi,
        "giao_hang": orderOverview.hinh_thuc_giao_hang,
        "thanh_toan": orderOverview.hinh_thuc_thanh_toan,
        "tenkh":orderOverview.tenkh,
        "sdt_kh":orderOverview.sdt_kh,
        "items" : orderItems
      }
    }
    catch (e){
      response.message = e
    }
    return res.send(response)
});

router.post('/change_status', async (req, res, next) =>{
  var response = {
        "exitcode": 1,
        "message": "Sai thông tin/sản phẩm không tồn tại",
        "items" : ""
    }
    try {
      if (req.headers.magic_pass != 'LamZauKhumKho'){
          response.message = "sai Pass ròi!!"
          return res.send(response)
      }
      if (typeof(req.body.madh) == "undefined" || 
          typeof(req.body.trang_thai_moi) == "undefined" ||
          typeof(req.body.trang_thai_hien_tai) == "undefined"){
        response.exitcode = 101
        response.message = "Thiếu trường dữ liệu cần thiết"
        return res.send(response)
      }
  
      var checkedFlow = await checkFlow(req.body)
      if (checkedFlow == true){
        changeOrderStatus(req.body)
        response.exitcode = 0
        response.message = "Cập nhật trạng thái thành công"
        return res.send(response)
      }
      else if (checkedFlow == false) {
        response.exitcode = 114
        response.message = "Chuyển đổi trạng thái không đúng trình tự"
        return res.send(response)
      }
      else {
        response.exitcode = 116
        response.message = "tồn tại mã hàng bị thiếu hàng" 
        response.items = checkedFlow
        return res.send(response)
      }
    }
    catch (e){
      response.message = e
    }
    return res.send(response)
});

module.exports = router;