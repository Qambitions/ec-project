import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./style.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../../../api/axios";
import Cookies from "js-cookie";
import OrderDetailItemCard from "./OrderDetailItemCard";

export default function OrderDetail({ orderID }) {
  const [listState, setListState] = useState([]);
  const [progress, setProgress] = useState();
  const [info, setInfo] = useState({});
  const [items, setItems] = useState([]);
  const fetchItem = async () => {
    let res = await axios({
      method: "get",
      headers: { token: Cookies.get("token") },
      url: process.env.REACT_APP_ORDERS_DETAIL,
      params: { madh: orderID },
    });
    if (res.data.exitcode === 0) {
      setItems(res.data.items);
    }
  };

  const handleProgressBar = (listState) => {
    let states = listState;
    console.log("LS", listState);
    states.forEach((state) => {
      if (state.trang_thai.localeCompare("ĐÃ GIAO THÀNH CÔNG") == 0) {
        setProgress(100);
        return;
      }
      if (state.trang_thai.localeCompare("ĐANG GIAO HÀNG") == 0) {
        setProgress(66);
        return;
      }
      if (state.trang_thai.localeCompare("ĐÃ XÁC NHẬN") == 0) {
        setProgress(33);
        return;
      }
      if (
        state.trang_thai.localeCompare("CHỜ XÁC NHẬN") == 0 ||
        state.trang_thai.localeCompare("WAIT FOR PAYMENT") == 0
      ) {
        setProgress(0);
        return;
      }
    });
  };
  const fetchDetail = async () => {
    let res = await axios({
      method: "get",
      headers: { token: Cookies.get("token") },
      url: process.env.REACT_APP_GET_ORDER_DETAIL,
      params: { madh: 500000 },
    });
    console.log(res.data);
    if (res.data.exitcode === 0) {
      handleProgressBar(res.data.list_state);
      setInfo(res.data.info);
    } else {
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchItem();
  }, []);
  return (
    <div>
      <h3 className="user_dashboard_header">Chi tiết đơn hàng</h3>
      <hr />
      <Container className="orderdetail_info_container">
        <Col xs={4}>
          <div className="container__flex_col">
            <label>Đơn hàng: {info.madh}</label>
            <label>Ngày đặt: {info.thoi_gian}</label>
            <label>Trạng thái: {info.trang_thai}</label>
          </div>
        </Col>
        <Col xs={4}>
          <div className="container__flex_col">
            <label>Thông tin người nhận: </label>
            <label>{info.tenkh}</label>
            <label>{info.sdt_kh}</label>
            <label>
              {info.so_nha_duong},{info.phuong_xa},{info.quan_tp},{info.tp_tinh}
            </label>
          </div>
        </Col>
        <Col>
          <div className="container__flex_col">
            <label>Phương thức thanh toán </label>
            <label>{info.hinh_thuc_thanh_toan}</label>
            <label>Đơn vị vận chuyển</label>
            <label>{info.hinh_thuc_giao_hang}</label>
          </div>
        </Col>
      </Container>
      <Container className="container__100 order__progress_bar">
        <Col xs={2}>Time</Col>
        <Col xs={4}>Time</Col>
        <Col xs={4}>Time</Col>
        <Col xs={2}>Time</Col>
      </Container>
      <ProgressBar now={progress} label={`${progress}%`} />
      <Container className="container__100 order__progress_bar">
        <Col xs={2}>Đặt hàng thành công</Col>
        <Col xs={4}>Đơn hàng đã được xác nhận</Col>
        <Col xs={4}>Đang giao hàng</Col>
        <Col xs={2}>Giao hàng thành công</Col>
      </Container>

      <Container className="container__100 order__progress_bar order_detail_items_header">
        <Col xs={6}>Sản phẩm</Col>
        <Col>Đơn giá</Col>
        <Col>Số lượng</Col>
        <Col>Thành tiền</Col>
      </Container>
      {items.map((item) => (
        <OrderDetailItemCard info={item} />
      ))}

      <Container className="container__100 order__progress_bar">
        <Col xs={6}></Col>
        <Col></Col>
        <Col>
          <div>
            <label>Phí sản phẩm:</label>
            <label>Phí vận chuyển:</label>
            <label>Phí giảm:</label>
            <label>Tổng tiền:</label>
          </div>
        </Col>
        <Col>
          <div className="container__flex_col">
            <label>đ</label>
            <label>đ</label>
            <label>đ</label>
            <label>đ</label>
          </div>
        </Col>
      </Container>

      <a href="/user/myorder">Quay lại đơn hàng của tôi</a>
    </div>
  );
}
