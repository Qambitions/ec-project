import React from "react";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import {Link} from "react-router-dom";

export default function StockDashboard(){
    return (<>
        <Container fluid>
          <Row>
            <Col lg="2">
                <Sidebar/>
            </Col>
          <Col>
            <btn className="btn">
                <Link to="/admin/stock/category"><h3>Quản lý sản phẩm</h3></Link>
            </btn>
            <btn className="btn">
                <Link to="/admin/stock/import"><h3>Quản lý xuất/nhập kho</h3></Link>
            </btn>
          </Col>
            </Row>
        </Container>

    </>);
}