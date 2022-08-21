import React,{ useEffect, useState } from "react";
import "./style.css";
import {
  Row,
  Col
} from "react-bootstrap";

import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
import AdminNavbar from "../../../components/NavBar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import moment from "moment";
import axios from "../../../api/axios";

const {REACT_APP_MAGIC_PASS} = process.env;
const GET_WEEKLY_REPORT_URL = "/management/main/weekly_report";
const GET_TOP_SELLING_URL = "/management/main/top_selling";
const GET_USER_URL = "/management/user_overview";
const GETORDER_URL = "/management/order_overview";
const GET_PRODUCTS_URL = "/management/inventory_overview_product";




export default function Dashboard() {
  const [daily, setDaily] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [products, setProducts] = useState(0);

  useEffect(() => {
    fetchReport();
    fetchTopSelling();
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);


  const fetchReport = async () => {
    await axios(GET_WEEKLY_REPORT_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setDaily(res.data.daily_sale);
    });
  };

  const fetchTopSelling = async () => {
    await axios(GET_TOP_SELLING_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setTopSelling(res.data.top_product);
    });
  };

  const fetchUsers = async () => {
    await axios(GET_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setUsers(res.data.total);
    });
  };

  const fetchOrders = async () => {
    await axios(GETORDER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setOrders(res.data.total);
    });

  };

  const fetchProducts = async () => {
    await axios(GET_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: {macn: "200"},
    }).then((res) => {
      setProducts(res.data.total);
    });
  };

  const dashboards = [
    {
      name: "Tổng khách hàng",
      value: users,
      icon: <FiUsers/>,
      color: "bg-primary text-white",
    },
      {
        name: "Tổng loại hàng",
        value: 6,
        icon: <FiUsers/>,
        color: "bg-warning text-dark ",
      },
      {
        name: "Tổng sản phẩm",
        value: products,
        icon: <BsBoxSeam/>,
        color: "bg-light text-dark",
      },
      {
        name: "Tổng đơn hàng",
        value: orders,
        icon: <BsNewspaper/>,
        color: "bg-info text-white",
      }
    ];

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
                        <div className="checkout-main-col-2 fw-bold">Ngày</div>         
                        <div className="checkout-main-col-2 fw-bold">Tổng sản phẩm</div>
                        <div className="checkout-main-col-3 fw-bold">Tổng tiền</div>
                    </div>
                    {daily.length !=0 ? <>
                      {daily.map((product, index) => {
                  return (
                    <div  className="checkout-main-row">
                      <div className="checkout-main-col-2">
                          <label>{moment(product.thoi_gian).format("DD/MM/YYYY")}</label>
                    </div>

                    <div className="checkout-main-col-2">
                        <div className="checkout-product-info">
                            <label id='product-price'>{product.count}</label>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                    <label>{product.sum} đ</label>

                    </div>
                </div>
                  )
              })}</>: <h5>No data</h5>}
              </div>
              </div>
          </div>
        </div>
        <div class="top-sales box">
          <div class="title">Top Selling Product</div>
          <ul class="top-sales-details">
            {topSelling.length !=0 ? <>
              {topSelling.map((prop, key) => {
                return (
                  <li>
                    <a href="#">
                      <span class="product">{prop.ten_sp}</span>
                    </a>
                    <span class="quantity">{prop.gmv}</span>
                  </li>   
                );
                })}</> : <h5>No data</h5>}
          
            
          </ul>
        </div>
      </div>
    </div>
          </Col>

        </Row>



  );
}
