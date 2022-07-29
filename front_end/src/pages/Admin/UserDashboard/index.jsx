

import React from "react";
import { Routes, Route, Link, Navigate } from 'react-router-dom';
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
} from "react-bootstrap";

import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";


  

export default function UserDashboard() {
  const navigate = useNavigate();
  // const handleRowCLick = (id) => {
  //  navigate(`/${id}`);
  // } 
const handleRowCLick = () => {
   navigate("/admin/user/detail");
  } 
  const data = [
    {
      id: '001',
      email: 'ND001@gmail.com',
      level: 'Norrmal',
      status: 'active'
    },
    {
      id: '002',
      email: 'ND002@gmail.com',
      level: 'Normal',
      status: 'active'
    },
    {
      id: '003',
      email: 'ND003@gmail.com',
      level: 'Gold',
      status: 'blocked'
    },
    {
      id: '004',
      email: 'ND004@gmail.com',
      level: 'Silver',
      status: 'active'
    },
    {
      id: '005',
      email: 'ND005@gmail.com',
      level: 'Normal',
      status: 'active'
    },
    {
      id: '006',
      email: 'ND006@gmail.com',
      level: 'Normal',
      status: 'blocked'
    },

  ];
  return (
    <> 
        <Row>
          <Col lg="2">
          <Sidebar/>
          </Col>
          <Col style={{backgroundColor: "#F5F5F5"}}>
          <AdminNavbar 
          title="Quản lý người dùng"
          text ="Tổng số người dùng"
          count = "1234"/>
          <Card className="card-plain table-plain-bg">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover">
                <thead>
                  <tr style={{backgroundColor: "#FF9B7F"}}>
                    <th>Mã khách hàng</th>
                    <th>Email</th>
                    <th>Cấp bậc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                  return (
                    <tr onClick={handleRowCLick}>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="ms-3">
                            <p class="fw-bold mb-1">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">{item.email}</p>
                      </td>
                      <td>{item.level}</td>
                      <td>
                      {item.status == "active" ? <span className="badge badge-active">{item.status}</span> : 
                      <span className="badge badge-block">{item.status}</span> }   
                      </td>
                    </tr>
                  )
              })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
            
       
    </>
  );
}
