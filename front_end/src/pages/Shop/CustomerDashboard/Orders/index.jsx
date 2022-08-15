import "./style.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DashboardOrderCard from "./DashboardOrderCard";
import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import Cookies from "js-cookie";
import OrderDetail from "./OrderDetail";
import { useContext } from "react";
import OrdersContext, { OrdersProvider } from "../../../../context/OrdersProvider";


export default function Orders() {
  const ordersContext = useContext(OrdersContext);
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    let res = await axios({
      method: "get",
      headers: {
        token: Cookies.get("token"),
      },
      url: process.env.REACT_APP_GET_CUSTOMER_ORDER,
      params: { limit: 4, offset: 0 },
    });
    if (res.data.exitcode === 0) {
      setOrders(res.data.orders);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>{ordersContext.viewDetail===true? (<OrderDetail orderID={ordersContext?.orderID}/>):(<div>
      <label>Đơn hàng của tôi</label>
      <Tabs
        defaultActiveKey="profile"
        id="justify-tab-example"
        className="mb-6"
        justify
      >
        <Tab eventKey="all" title="Tất cả">
          {orders.map((order) => (
            <DashboardOrderCard key={order.madh} orderInfo={order} />
          ))}
        </Tab>
        <Tab eventKey="wait-confirmed" title="Chờ xác nhận">
          {orders
            .filter((order) => {
              return order.trang_thai === "CHỜ XÁC NHẬN";
            })
            .map((order) => (
              <DashboardOrderCard key={order.madh} orderInfo={order} />
            ))}
        </Tab>
        <Tab eventKey="confirmed" title="Đã xác nhận">
          {orders
            .filter((order) => {
              return order.trang_thai === "ĐÃ XÁC NHẬN";
            })
            .map((order) => (
              <DashboardOrderCard key={order.madh} orderInfo={order} />
            ))}
        </Tab>
        <Tab eventKey="on-delivery" title="Đang giao">
          {orders
            .filter((order) => {
              return order.trang_thai === "ĐANG GIAO";
            })
            .map((order) => (
              <DashboardOrderCard key={order.madh} orderInfo={order} />
            ))}
        </Tab>
        <Tab eventKey="delivered" title="Đã giao">
          {orders
            .filter((order) => {
              return order.trang_thai === "ĐÃ GIAO";
            })
            .map((order) => (
              <DashboardOrderCard key={order.madh} orderInfo={order} />
            ))}
        </Tab>
        <Tab eventKey="canceled" title="Đã hủy">
          {orders
            .filter((order) => {
              return order.trang_thai === "ĐÃ HỦY";
            })
            .map((order) => (
              <DashboardOrderCard key={order.madh} orderInfo={order} />
            ))}
        </Tab>
      </Tabs>
    </div>)}    

    </>
  );
}
