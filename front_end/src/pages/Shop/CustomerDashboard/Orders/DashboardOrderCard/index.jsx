import { useContext, useState } from "react";
import axios from "../../../../../api/axios";
import { OrderCard } from "../../../Checkout/OrdersInfo/OrderCard";
import "./style.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import OrdersContext from "../../../../../context/OrdersProvider";

import { RiArrowRightSLine } from "react-icons/ri";
export default function DashboardOrderCard({ orderInfo }) {
  const [items, setItems] = useState([]);

  const fetchOrderDetail = async () => {
    let res = await axios({
      method: "get",
      headers: { token: Cookies.get("token") },
      url: process.env.REACT_APP_ORDERS_DETAIL,
      params: { madh: orderInfo.madh },
    });
    if (res.data.exitcode === 0) {
      setItems(res.data.items);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);
  const ordersContext = useContext(OrdersContext);
  const handleViewDetail = () => {
    ordersContext.setOrderID(orderInfo.madh);
    ordersContext.setViewDetail(true);
  };

  return (
    <div className="dashboard__ordercard">
      <div className="container__spacebetween">
        <div className="container__flex">
          {orderInfo.trang_thai.localeCompare("ĐÃ XÁC NHẬN") === 0 ? (
            <label className="confirmed_label">Đã xác nhận</label>
          ) : orderInfo.trang_thai.localeCompare("CHỜ XÁC NHẬN") === 0 ? (
            <label className="waitconfirm_label">Chờ xác nhận</label>
          ) : orderInfo.trang_thai.localeCompare("ĐANG GIAO") === 0 ? (
            <label className="ondelivery_label">Đang giao</label>
          ) : orderInfo.trang_thai.localeCompare("ĐÃ GIAO") === 0 ? (
            <label className="delivered_label">Đã giao</label>
          ) : orderInfo.trang_thai.localeCompare("ĐÃ HỦY") === 0 ||
            orderInfo.trang_thai.localeCompare("THANH TOÁN THẤT BẠI") === 0 ? (
            <label className="canceled_label">Đã hủy</label>
          ) : (
            <label className="canceled_label">Đã hủy</label>
          )}
          <label>|</label>
          <label>Tổng tiền: {orderInfo.tong_phi}đ</label>
        </div>
        <label className="navigate__detail" onClick={handleViewDetail}>
          Xem chi tiết {">>"}
        </label>
      </div>
      <hr />
      <div>
        {items.map((item) => (
          <OrderCard
            so_luong_mua={item.so_luong_mua}
            ten_npp={item.ten_npp}
            hinh_anh={item.hinh_anh}
            tensp={item.ten_sp}
            gia_phai_tra={item.gia_phai_tra}
          />
        ))}
      </div>
    </div>
  );
}
