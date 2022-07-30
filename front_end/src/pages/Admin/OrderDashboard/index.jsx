import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
import './style.css';
import AdminNavbar from "../../../components/NavBar/Navbar";
import {
  Card,
  Table,
} from "react-bootstrap";

import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GETORDER_URL = "/management/order_overview";

export default function OrderDashboard(props) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    await axios(GETORDER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: { limit: props.limit, offset: props.offset },
    }).then((res) => {
      console.log(res.data.list_order);
      setTotal(res.data.total);
      setOrders(res.data.list_order);
    });
  };

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
     count = {total}/>
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
      {orders.map((item, index) => {
          return (
            <tr onClick={handleRowCLick}>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{item.madh}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">{item.thoi_gian}</p>

              </td>
              <td>{item.tong_phi}</td>
              <td>
              {item.trang_thai == "CHỜ XÁC NHẬN" ? <span className="badge badge-wait">{item.trang_thai}</span> : 
              item.trang_thai == "ĐÃ XÁC NHẬN" ? <span className="badge badge-confirmed">{item.trang_thai}</span> :
              item.trang_thai == "ĐANG GIAO" ? <span className="badge badge-delivering">{item.trang_thai}</span> :
              item.trang_thai == "ĐÃ GIAO" ? <span className="badge badge-delivered">{item.trang_thai}</span> :
              <span className="badge badge-cancel">{item.trang_thai}</span>}   
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