import "./style.css";
import { Navigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Orders from "./Orders";
import OrderDetail from "./Orders/OrderDetail";

export default function CustomerDashboard() {
  return (
    <div className="body">
      <div className="customer__dashboard">
        <div className="container__flex">
          <label>avt</label>
          <label>Tên KH</label>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Thông tin tài khoản</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Đơn hàng của tôi</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <OrderDetail />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Orders />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}
