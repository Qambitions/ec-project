import React from "react";
import {useNavigate  } from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
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


export default function ImportDashboard() {

  const data = [
    {
      id: '001',
      vendor: 'PET IS SMILE',
      time: '01/07/2022',
      sum: 10,
      total: 1500000,
    },
  
    {
      id: '002',
      vendor: 'ND STORE',
      time: '01/07/2022',
      sum: 20,
      total: 2450000
    },
    {
      id: '003',
      vendor: 'PET IS SMILE',
      time: '06/07/2022',
      sum: 100,
      total: 20000000
    },
    {
      id: '004',
      vendor: 'PET IS SMILE',
      time: '15/07/2022',
      sum: 45,
      total: 200000,
    },
    {
      id: '005',
      vendor: 'ND STORE',
      time: '20/07/2022',
      sum: 50,
      total: 400000
    }

  ];
  const navigate = useNavigate();
  // const handleRowCLick = (id) => {
  //  navigate(`/${id}`);
  // } 
  const handleRowCLick = () => {
   navigate("/admin/import/detail");
  } 

  
  return (
    <>
      <div className="row">
     <div className="col-2"><Sidebar/></div>  
     <div className="col-10" style={{backgroundColor: "#F5F5F5"}}>
     <AdminNavbar 
     title="Quản lý đơn hàng"
     text ="Tổng đơn nhập"
     count = "200"
     button = "1"/>
     <Card className="card-plain table-plain-bg">
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover">
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
              <td>{item.vendor}</td>
              <td>{item.time}</td>
              <td>{item.sum}</td>
              <td>{item.total}</td>
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