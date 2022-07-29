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
import AdminNavbar from "../../../components/NavBar/Navbar";
import { IoTrashBin } from "react-icons/io5";
import {FaShippingFast} from "react-icons/fa";
import {MdPattern, MdPayment} from "react-icons/md";
import { useState } from 'react';


export default function OrderDetail(){
  const data = [
    {
      id: '001',
      name: "Súp cá cho mèo",
      price: 100000,
      quantity: 2,
    },
    {
      id: '112',
      name: "Chuồng mèo",
      price: 1000000,
      quantity: 1,
    },

];
    return (<>
          <Row>
            <Col lg="2">
                <Sidebar/>
            </Col>
          <Col>
          <Row>
          <AdminNavbar 
          title="Quản lý đơn hàng"/>
          <Card className="card-plain table-plain-bg">
          <Card.Body className="table-full-width table-responsive px-0">
            <Table>
              <thead>
                <tr style={{backgroundColor: "#FF9B7F"}}>
                  <th>Mã đơn hàng</th>
                  <th>Thời gian</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">001</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">13:00:19 26/07/2022</p>
              </td>
              <td>100000</td>
              <td>
              <span className="badge badge-delivered">Đã giao</span>
                
              </td>

            </tr>
      
    </tbody>
            </Table>
          </Card.Body>
        </Card>
          </Row>

          <Row>
          <h3>Chi tiết đơn hàng</h3>
            <div className="body">
            <div className="container cart-body">
                <div className="checkout-main">
                    <div className="checkout-main-row checkout__product_header">
                        <div className="checkout-main-col-1">ID</div>         
                        <div className="checkout-main-col-2">Sản phẩm</div>
                        <div className="checkout-main-col-3">Đơn giá</div>
                        <div className="checkout-main-col-3">Số lượng</div>
                        <div className="checkout-main-col-3">Thành tiền</div>
                    </div>
                    {data.map((product, index) => {
                  return (
                    <div  className="checkout-main-row">
                      <div className="checkout-main-col-1">
                          <label>{product.id}</label>
                    </div>
                    <div className="checkout-main-col-2">
                        <div className="checkout__product-card">
                            <a href="https://www.petmart.vn/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito">
                            <img className="checkout__cart_product_img" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065284/food/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito_h9a9du.webp"}></img>
                            </a>
                            <p>{product.name}</p>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                        <div className="checkout-product-info">
                            <label id='product-price'>{product.price}</label>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                    <label>{product.quantity}</label>

                    </div>
                    <div className="checkout-main-col-3">{product.price * product.quantity}</div>
                </div>
                  )
              })}
                <div  className="checkout-main-row">
                <div className="checkout-main-col-2">Phí sản phẩm: </div>
                <div className="checkout-main-col-3">100000 </div>

                </div>
                <div  className="checkout-main-row">
                <div className="checkout-main-col-2">Phí vận chuyển: </div>
                <div className="checkout-main-col-3">15000 </div>

                </div>
                <div  className="checkout-main-row">
                <div className="checkout-main-col-2">Phí giảm: </div>
                <div className="checkout-main-col-3">10000 </div>
                </div>
                <div  className="checkout-main-row">
                <div className="checkout-main-col-2">Tổng tiền: </div>
                <h5 className="checkout-main-col-3">100000 </h5>
                </div>
                </div>

                <div className="checkout-aside" style={{margin:"10px"}}>
                    <div className="checkout-product-invoice">
                        <h4>Nguyễn Thị Ngọc Diệu </h4>
                        <hr/>
                        <div>
                            <label>0987654321</label>
                        </div>
                        <div>
                            <label>227 Nguyễn Văn Cừ</label>
                        </div>
                        <hr/>
                        <text><FaShippingFast/></text>
                        <label>Giao hàng nhanh</label>
                        <hr/>
                        <text><MdPayment/></text>
                        <label>Thanh toán bằng Momo</label>
                    </div>
                    <div>
                </div>
                    </div>
                </div>

            </div>

          </Row>
          </Col>
            </Row>
            

    </>);
}