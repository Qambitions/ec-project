import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
import './style.css';
import AdminNavbar from "../../../components/NavBar/Navbar";
import moment from "moment";
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
  // const handleRowCLick = (id) => {
  const navigate = useNavigate();
  const handleRowCLick = (id) => {
    navigate(`/admin/order/${id}`);
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
            <tr onClick={()=> handleRowCLick(item.madh)}>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{item.madh}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="fw-normal mb-1">{moment(item.thoi_gian).format("HH:mm:ss DD/MM/YYYY")}</p>
                
              </td>
              <td>{item.tong_phi} đ</td>
              <td>
              {item.trang_thai.normalize() === "CHỜ XÁC NHẬN".normalize() ? <span className="badge badge-wait">{item.trang_thai}</span> : 
              item.trang_thai.normalize() === "ĐÃ XÁC NHẬN".normalize() ? <span className="badge badge-confirmed">{item.trang_thai}</span> :
              item.trang_thai.normalize() === "ĐANG GIAO".normalize() ? <span className="badge badge-delivering">{item.trang_thai}</span> :
              item.trang_thai.normalize() === "ĐÃ GIAO".normalize() ? <span className="badge badge-delivered">{item.trang_thai}</span> :
              <span className ="badge badge-cancel">{item.trang_thai}</span>}   
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