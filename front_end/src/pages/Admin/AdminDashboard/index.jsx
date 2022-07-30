import React from "react";
import "./style.css";
// react-bootstrap components
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


import {MdDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../UserDashboard";
import AdminNavbar from "../../../components/NavBar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import {Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const dashboards = [
  {
    name: "Visitors today",
    value: 1000,
    icon: <FiUsers/>,
    color: "bg-primary text-white",
  },
    {
      name: "Users",
      value: 1000,
      icon: <FiUsers/>,
      color: "bg-warning text-dark ",
    },
    {
      name: "Products",
      value: 1000,
      icon: <BsBoxSeam/>,
      color: "bg-light text-dark",
    },
    {
      name: "Orders",
      value: 1000,
      icon: <BsNewspaper/>,
      color: "bg-info text-white",
    }
  ];

  const data = [
    {
      id: '20/07/2022',
      price: 100000,
      quantity: 2,
    },
    {
      id: '21/07/2022',
      price: 1000000,
      quantity: 1,
    },
    {
      id: '22/07/2022',
      price: 1000000,
      quantity: 1,
    },
    {
      id: '23/07/2022',
      price: 1000000,
      quantity: 17,
    },

];
const topProducts = [
  {
    name: 'Chuồng mèo',
    quantity: 12,
  },
  {
    name: 'Súp',
    quantity: 12,
  },
  {
    name: 'Sữa tắm mèo',
    quantity: 23,
  },
  {
    name: 'Bóng',
    quantity: 29,
  },
  {
    name: 'Plapla',
    quantity: 45,
  },
  {
    name: 'pleple',
    quantity: 50,
  },

];
export default function Dashboard() {
  return (
        <Row style={{backgroundColor: "#F5F5F5"}}>
        <Col lg="2"><Sidebar/></Col>
          <Col>
          <Row>
          <AdminNavbar 
          title="Dashboard"/>
          </Row>
          <br/>
          <Row >
          <div className="home-content">
            <div className="overview-boxes">
              {dashboards.map((prop, key) => {
                return (
                  <div class="box">
                      <div class="right-side">
                        <div class="box-topic">{prop.name}</div>
                        <div class="number">{prop.value}</div>
                        <div class="indicator">
                          <span class="text">Up from yesterday</span>
                        </div>
                      </div>
                      <span style={{padding: "20px", borderRadius: "5px"}} className={prop.color}> {prop.icon}</span>
                    </div>
                  
                );
                })}
              </div>
            </div>
          </Row>
    <div class="home-content">

      <div class="sales-boxes">
        <div class="recent-sales box">
          <div class="title">Daily Sales</div>
          <div class="sales-details">
          <div className="container cart-body">
                <div className="checkout-main">
                    <div className="checkout-main-row checkout__product_header">
                        <div className="checkout-main-col-1 fw-bold">Ngày</div>         
                        <div className="checkout-main-col-2 fw-bold">Tổng sản phẩm</div>
                        <div className="checkout-main-col-3 fw-bold">Tổng tiền</div>
                    </div>
                    {data.map((product, index) => {
                  return (
                    <div  className="checkout-main-row">
                      <div className="checkout-main-col-1">
                          <label>{product.id}</label>
                    </div>

                    <div className="checkout-main-col-2">
                        <div className="checkout-product-info">
                            <label id='product-price'>{product.quantity}</label>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                    <label>{product.price} đ</label>

                    </div>
                </div>
                  )
              })}
              </div>
              </div>
          </div>
        </div>
        <div class="top-sales box">
          <div class="title">Top Selling Product</div>
          <ul class="top-sales-details">
          {topProducts.map((prop, key) => {
                return (
                  <li>
                    <a href="#">
                      <span class="product">{prop.name}</span>
                    </a>
                    <span class="quantity">{prop.quantity}</span>
                  </li>
                  
                );
                })}
            
          </ul>
        </div>
      </div>
    </div>
          </Col>
        </Row>

  );
}
