import "./style.css";
import { Navigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Orders from "./Orders";
import OrderDetail from "./Orders/OrderDetail";
import { Routes, Route, Outlet } from "react-router-dom";
import { OrdersProvider } from "../../../context/OrdersProvider";
import MyAddress from "./MyAddress";
import MyAccount from "./MyAccount";
import MyPassword from "./MyPassword";
import { useEffect } from "react";
import { useState } from "react";
export default function CustomerDashboard({ page }) {
  const [name, setName] = useState("");
  function loadName() {
    var info = localStorage.getItem("account_info");
    info = info ? JSON.parse(info) : {};
    let name = info.tenkh;
    if (name) {
      setName(name);
    } else {
      setName("error");
    }
  }

  useEffect(() => {
    loadName();
  }, []);

  return (
    <div className="body">
      <div className="customer__dashboard">
        <Tab.Container id="left-tabs-example" defaultActiveKey={page}>
          <Row>
            <Col sm={3}>
              <div>
                {" "}
                <img
                  className="user_profile_avt"
                  style={{ border: "none" }}
                  src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2423830_yxc5kd.png"
                  alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2423830_yxc5kd.png"
                ></img>
                <label style={{ fontSize: "1.2rem" }}>{name}</label>
              </div>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="account">Thông tin tài khoản</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">Đơn hàng của tôi</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="changepass">Thay đổi mật khẩu</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="address">Quản lý địa chỉ</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9} style={{ backgroundColor: "white" }}>
              <Tab.Content>
                <Tab.Pane eventKey="account">
                  <MyAccount />
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <OrdersProvider>
                    <Orders />
                  </OrdersProvider>
                </Tab.Pane>
                <Tab.Pane eventKey="address">
                  <OrdersProvider>
                    <MyAddress />
                  </OrdersProvider>
                </Tab.Pane>
                <Tab.Pane eventKey="changepass">
                  <MyPassword />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}
