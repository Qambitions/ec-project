import { useContext, useState } from "react";
import axios from "../../../../../api/axios";
import { OrderCard } from "../../../Checkout/OrdersInfo/OrderCard";
import "./style.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import OrdersContext from "../../../../../context/OrdersProvider";

export default function DashboardOrderCard({ orderInfo }) {
  const [items, setItems] = useState([]);

  const fetchOrderDetail = async () => {
    let res = await axios({
      method: "get",
      headers: { token: Cookies.get("token") },
      url: "/account/user_info/user_order_detail/items",
      params: { madh: orderInfo.madh },
    });
    if (res.data.exitcode === 0) {
      setItems(res.data.items);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);
  const ordersContext = useContext(OrdersContext)
  const handleViewDetail=()=>{
    ordersContext.setOrderID(orderInfo.madh);
    ordersContext.setViewDetail(true);
  }

  return (
    <div className="dashboard__ordercard">
      <div className="container__spacebetween">
        <div className="container__flex">
          {orderInfo.trang_thai === "ĐÃ XÁC NHẬN" ? (
            <label className="confirmed_label">Đã xác nhận</label>
          ) : orderInfo.trang_thai === "CHỜ XÁC NHẬN" ? (
            <label className="waitconfirm_label">Chờ xác nhận</label>
          ) : orderInfo.trang_thai === "ĐANG GIAO" ? (
            <label className="ondelivery_label">Đang giao</label>
          ) : orderInfo.trang_thai === "ĐÃ GIAO" ? (
            <label className="delivered_label">Đã giao</label>
          ) : (
            <label className="canceled_label">Đã hủy</label>
          )}
          <label>|</label>
          <label>Tổng tiền: {orderInfo.tong_phi}đ</label>
        </div>
        <label onClick={handleViewDetail}>Xem chi tiết</label>
      </div>
      <div>
        {items.map((item) => (
          <OrderCard info={item} />
        ))}
      </div>
    </div>
  );
}
