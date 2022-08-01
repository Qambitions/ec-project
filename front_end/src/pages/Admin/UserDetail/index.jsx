import React, { useEffect, useState } from "react";
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
import {Link, useParams} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";

import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_USER_DETAIL_URL = "/management/user_detail";
const POST_DELIVERY_STATUS = "/management/order_detail/change_status";


export default function UserDetail(){
  const {user_id} = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    fetchOrderDetail();
  }, []);


  const fetchOrderDetail = async () => {
    await axios(GET_USER_DETAIL_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: { makh: user_id },
    }).then((res) => {
      setDetail(res.data.user);
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
          title="Quản lý người dùng"/>
          <Card className="card-plain table-plain-bg">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table>
                <thead>
                  <tr style={{backgroundColor: "#FF9B7F"}}>
                    <th>Mã khách hàng</th>
                    <th>Email</th>
                    <th>Cấp bậc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="ms-3">
                            <p class="fw-bold mb-1">{detail.makh}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">{detail.email_kh}</p>
                      </td>
                      <td>{detail.ma_cap_bac}</td>
                      <td>
                      {detail.activate ? <span className="badge badge-active">Active</span> : 
                      <span className="badge badge-block">Tạm khóa</span> }  
                      </td>
                    </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Row>
          <Row>
            <h3>Thông tin chi tiết</h3>
            <Card className="card-plain table-plain-bg">
              <Card.Body>
                <Table className="table table-bordered">
                    <tbody>
                        <tr><td>Tham gia từ: {moment(detail.thoi_gian_dk).format("DD/MM/YYYY")}</td></tr>
                        <tr>
                            <td>Tên người dùng: {detail.tenkh}</td>
                            <td>Tổng số đơn đã mua: {detail.tong_so_don_da_mua}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại: {detail.sdt_kh}</td>
                            <td>Tổng số đơn đã hủy: {detail.tong_so_don_da_huy}</td>
                        </tr>
                        <tr>
                            <td>Ngày sinh: {detail.ngsinh_kh}</td>
                            <td>Tổng điểm tích lũy: {detail.tong_diem_tich_luy}</td>
                        </tr>
                    </tbody>
                </Table>
                <button type="button" class="btn btn-danger">Cập nhật</button>
              </Card.Body>
            </Card>
          </Row>
          </Col>
            </Row>

    </>);
}