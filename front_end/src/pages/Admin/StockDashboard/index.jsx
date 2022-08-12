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
          <Row>
            <Col lg="2">
                <Sidebar/>
            </Col>
          <Col style={{backgroundColor: "#F5F5F5"}}>
            <div className="d-flex align-items-center justify-content-center">
            <button className="btn">
                <Link to="/admin/stock/category" className="text-dark"><h3>Quản lý sản phẩm</h3></Link>
            </button>
            <button className="btn">
                <Link to="/admin/stock/import" className="text-dark"><h3>Quản lý xuất/nhập kho</h3></Link>
            </button>
            </div>
          </Col>
            </Row>

    </>);
}