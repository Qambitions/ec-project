import React, { useState } from "react";
import {FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import {GiHamburgerMenu} from 'react-icons/gi';
import {FiUsers} from 'react-icons/fi';
import {BsBoxSeam} from 'react-icons/bs';
import {FaWpforms} from 'react-icons/fa';
import { Link,  Routes, Route, Outlet, useNavigate  } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import Sidebar from "../../../components/sidebar/Sidebar";
import './style.css';
import AdminNavbar from "../../../components/NavBar/Navbar";

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


export default function OrderDashboard() {

  const data = [
    {
      id: '001',
      time: '01/07/2022',
      total: 150000,
      status: 'Chờ xác nhận'
    },
  
    {
      id: '002',
      time: '01/07/2022',
      total: 200000,
      status: 'Đã xác nhận'
    },
    {
      id: '003',
      time: '06/07/2022',
      total: 200000,
      status: 'Đang giao'
    },
    {
      id: '004',
      time: '15/07/2022',
      total: 200000,
      status: 'Đã giao'
    },
    {
      id: '005',
      time: '20/07/2022',
      total: 400000,
      status: 'Đã hủy'
    }

  ];
  const navigate = useNavigate();
  // const handleRowCLick = (id) => {
  //  navigate(`/${id}`);
  // } 
  const handleRowCLick = () => {
   navigate("/admin/order/detail");
  } 

  
  return (
    <>
      <div className="row">
     <div className="col-2"><Sidebar/></div>  
     <div className="col-10" style={{backgroundColor: "#F5F5F5"}}>
     <AdminNavbar 
     title="Quản lý đơn hàng"
     text ="Tổng số đơn hàng"
     count = "1234"/>
     <Card className="card-plain table-plain-bg">
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover">
              <thead>
                <tr style={{backgroundColor: "#FF9B7F"}}>
                  <th>Mã đơn hàng</th>
                  <th>Thời gian</th>
                  <th>Tổng tiền</th>
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
                <p class="fw-normal mb-1">{item.time}</p>

              </td>
              <td>{item.total}</td>
              <td>
              {item.status == "Chờ xác nhận" ? <span className="badge badge-wait">{item.status}</span> : 
              item.status == "Đã xác nhận" ? <span className="badge badge-confirmed">{item.status}</span> :
              item.status == "Đang giao" ? <span className="badge badge-delivering">{item.status}</span> :
              item.status == "Đã giao" ? <span className="badge badge-delivered">{item.status}</span> :
              <span className="badge badge-cancel">{item.status}</span>}
                
              </td>

            </tr>
          )
      })}

      
    </tbody>
            </Table>
          </Card.Body>
        </Card>
      
      </div>

      </div>
      
    </>
  );
    
}