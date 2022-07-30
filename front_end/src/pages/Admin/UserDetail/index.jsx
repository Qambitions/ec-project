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
export default function UserDetail(){
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
                            <p class="fw-bold mb-1">001</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">123@gmail.com</p>
                      </td>
                      <td>Normal</td>
                      <td>
                      <span className="badge badge-active">Đang hoạt động</span>
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
                        <tr><td>Tham gia từ</td></tr>
                        <tr>
                            <td>Tên người dùng</td>
                            <td>Tổng số đơn đã mua</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại</td>
                            <td>Tổng số đơn thất bại</td>
                        </tr>
                        <tr>
                            <td>Ngày sinh</td>
                            <td>Tổng điểm tích lũy</td>
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