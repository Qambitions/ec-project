import React, { useEffect, useState } from "react";
import {
    Card,
    Table,
    Row,
    Col,
  } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../../components/sidebar/Sidebar";
import {Link, useParams} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";
import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_ORDER_DETAIL_URL = "/management/order_detail";
const POST_DELIVERY_STATUS = "/management/order_detail/change_status";

export default function OrderDetail(){
  const {order_id} = useParams();

  const [detail, setDetail] = useState({});
  const [address, setAddress] = useState({});
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchOrderDetail();
  }, []);


  const fetchOrderDetail = async () => {
    await axios(GET_ORDER_DETAIL_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: { madh: order_id },
    }).then((res) => {
      setDetail(res.data.order);
      setProducts(res.data.order.items);
      setAddress(res.data.order.dia_chi);
      setValue(res.data.order.trang_thai);
    });

  };

  const postDeliveryStatus = async (newStatus, curr) => {
    var postData = {
        madh: order_id, 
        trang_thai_moi: newStatus,
        trang_thai_hien_tai: curr
    };
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    };

  await axios.post(POST_DELIVERY_STATUS, postData, axiosConfig).then((res) => {
    console.log(res.data.message);
    toast(res.data.message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });

  });
  
  
  };

    return (<>
    <ToastContainer style={{ width: "500px" }}/>
    <Row>
      <Col lg="2">
          <Sidebar/>
      </Col>
    <Col>
    <Row>
    <AdminNavbar 
    title="Quản lý đơn hàng"/>
    <Card className="card-plain table-plain-bg">
    <Card.Body className="table-full-width table-responsive px-0">
      <Table>
        <thead>
          <tr style={{backgroundColor: "#FF9B7F"}}>
            <th>Mã đơn hàng</th>
            <th>Thời gian</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td>
          <div class="d-flex align-items-center">
            <div class="ms-3">
              <p class="fw-bold mb-1">{detail.madh}</p>
            </div>
          </div>
        </td>
        <td>
          <p class="fw-normal mb-1">{moment(detail.thoi_gian).format("HH:mm:ss DD/MM/YYYY")}</p>
        </td>
        <td>{detail.tong_phi}</td>
        <td>
      <div className="input-group mb-3">
        <select value={value} onChange={e => setValue(e.target.value)}>
          <option selected>{value}</option>
          <option value="CHỜ XÁC NHẬN">CHỜ XÁC NHẬN</option>
          <option value="ĐÃ XÁC NHẬN">ĐÃ XÁC NHẬN</option>
          <option value="ĐANG GIAO">ĐANG GIAO</option>
          <option value="ĐÃ GIAO">ĐÃ GIAO</option>
          <option value="ĐÃ HỦY">ĐÃ HỦY</option>
        </select>
        </div>
        </td>

      </tr>

</tbody>
      </Table>
    </Card.Body>
  </Card>
    </Row>
    <button type="button" class="btn btn-danger" onClick={() => postDeliveryStatus(value, detail.trang_thai)}>Cập nhật</button>
      
    <Row>
    <h3>Chi tiết đơn hàng</h3>
      <div className="body">
      <div className="container cart-body">
          <div className="checkout-main">
              <div className="checkout-main-row checkout__product_header">
                  <div className="checkout-main-col-1">ID</div>         
                  <div className="checkout-main-col-2">Sản phẩm</div>
                  <div className="checkout-main-col-3">Đơn giá</div>
                  <div className="checkout-main-col-3">Số lượng</div>
                  <div className="checkout-main-col-3">Thành tiền</div>
              </div>
              {products.map((product, index) => {
            return (
              <div  className="checkout-main-row">
                <div className="checkout-main-col-1">
                    <label>{product.masp}</label>
              </div>
              <div className="checkout-main-col-2">
                  <div className="checkout__product-card">
                      <a href="https://www.petmart.vn/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito">
                      <img className="checkout__cart_product_img" src={product.hinh_anh}></img>
                      </a>
                      <p>{product.ten_sp}</p>
                  </div>
              </div>
              <div className="checkout-main-col-3">
                  <div className="checkout-product-info">
                      <label id='product-price'>{product.gia_phai_tra}</label>
                  </div>
              </div>
              <div className="checkout-main-col-3">
              <label>{product.so_luong_mua}</label>

              </div>
              <div className="checkout-main-col-3">{product.thanh_tien_mua}</div>
          </div>
            )
        })}
          <div  className="checkout-main-row">
          <div className="checkout-main-col-2">Phí sản phẩm: </div>
          <div className="checkout-main-col-3">{detail.phi_san_pham}</div>

          </div>
          <div  className="checkout-main-row">
          <div className="checkout-main-col-2">Phí vận chuyển: </div>
          <div className="checkout-main-col-3">{detail.phi_van_chuyen} </div>

          </div>
          <div  className="checkout-main-row">
          <div className="checkout-main-col-2">Phí giảm: </div>
          <div className="checkout-main-col-3">{detail.phi_giam} </div>
          </div>
          <div  className="checkout-main-row">
          <div className="checkout-main-col-2">Tổng tiền: </div>
          <h5 className="checkout-main-col-3">{detail.tong_phi}</h5>
          </div>
          </div>

          <div className="checkout-aside" style={{margin:"10px"}}>
              <div className="checkout-product-invoice">
                  <h4>{detail.tenkh}</h4>
                  <hr/>
                  <div>
                      <label>{detail.sdt_kh}</label>
                  </div>
                  <div>
                      <label>{address.so_nha_duong}, phường {address.phuong_xa}, quận (huyện) {address.quan_tp}, {address.tp_tinh}</label>
                  </div>
                  <hr/>
                  <label>
                    {["GHTK" ,"GHTK_NORM", "GHTK_FAST"].includes(detail.giao_hang) ? <>
                    <img style={{height:"40px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"}></img>
                    </>
                    : detail.giao_hang == "GHN" ? <>
                      <img style={{height:"40px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"}></img>
                    </> : null}
                  </label>
                  <hr/>
                  <label>
                    {detail.thanh_toan == "MOMO" ? <>
                    <img style={{height:"20px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/momo-logo-ED8A3A0DF2-seeklogo.com_pnirvg.png"}></img>
                    <label>&nbsp;&nbsp;Thanh toán bằng Momo</label></>
                    : detail.thanh_toan == "PAYPAL" ? <>
                    <img style={{height:"20px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/888870_wptg5q.png"}></img>
                    <label>&nbsp;&nbsp;Thanh toán bằng Paypal</label></>: 
                    detail.thanh_toan == "VNPAY" ? <>
                    <img style={{height:"20px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773206/icon/icon-payment-method-vnpay_zh2dfi.png"}></img>
                    <label>&nbsp;&nbsp;Thanh toán bằng Paypal</label></> : <>   
                    <img style={{height:"20px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2543174_viafmp.png"}></img>
                    <label>&nbsp;&nbsp;Thanh toán khi nhận hàng</label></>}
                  </label>
              </div>
              <div>
          </div>
              </div>
          </div>

      </div>

    </Row>
    </Col>
      </Row>
            

    </>);
}

<div className='footer__icon_container_vertical'>
                            <img style={{height:"35px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"}></img>
                            <img style={{height:"35px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"}></img>
                            <img style={{height:"35px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656573798/icon/Logo-Viettel-Post-Transparent_zw5rmz.webp"}></img>
                        </div>
