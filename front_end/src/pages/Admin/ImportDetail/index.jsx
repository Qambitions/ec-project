import React, { useState, useEffect } from "react";
import {
    Card,
    Table,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import {Link, useParams} from "react-router-dom";

import moment from "moment";

import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GETPO_URL = "/management/purchase_detail";

export default function ImportDetail(){
  const {po_id} = useParams();
  const [detail, setDetail] = useState([]);
  const [info, setInfo] = useState({});


  useEffect(() => {
    fetchPurchaseDetail();
  }, []);


  const fetchPurchaseDetail = async () => {
    await axios(GETPO_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: { mapn: po_id },
    }).then((res) => {
      setInfo(res.data.purchase);
      setDetail(res.data.purchase.items);

    });

  };

    return (<>
          <Row>
            <Col lg="2">
                <Sidebar/>
            </Col>
          <Col>
          <Row>
          <AdminNavbar 
          title="Quản lý phiếu nhập"/>
          <Card className="card-plain table-plain-bg">
          <Card.Body className="table-full-width table-responsive px-0">
            <Table>
              <thead>
                <tr style={{backgroundColor: "#FF9B7F"}}>
                  <th>Mã phiếu nhập</th>
                  <th>Nhà phân phối</th>
                  <th>Thời gian</th>
                  <th>Tổng số mặt hàng</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
              <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{info.mapn}</p>
                  </div>
                </div>
              </td>
              <td>{info.ten_npp}</td>
              <td>{moment(info.ngay_lap).format("HH:mm:ss DD/MM/YYYY")}</td>
              <td>{info.tong_so_mat_hang}</td>
              <td>{info.tong_tien_nhap}</td>

            </tr>

      
    </tbody>
            </Table>
          </Card.Body>
        </Card>
          </Row>

          <Row>
          <h3>Chi tiết phiếu nhập</h3>
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
                    {detail.length !=0 ? <>
                      {detail.map((product, index) => {
                  return (
                    <div  className="checkout-main-row">
                      <div className="checkout-main-col-1">
                          <label>{product.masp}</label>
                    </div>
                    <div className="checkout-main-col-2">
                        <div className="checkout__product-card">
                            <p>{product.ten_sp}</p>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                        <div className="checkout-product-info">
                            <label id='product-price'>{product.don_gia_nhap}</label>
                        </div>
                    </div>
                    <div className="checkout-main-col-3">
                    <label>{product.so_luong_nhap}</label>

                    </div>
                    <div className="checkout-main-col-3">{product.thanh_tien_nhap}</div>
                </div>
                  )
              })}</>: "No data"}
                </div>

                </div>

            </div>
            <Link to="/admin/stock/import"><h5 className="p-2">{'<<'} Trở về </h5></Link>

          </Row>
          </Col>
            </Row>
            

    </>);
}