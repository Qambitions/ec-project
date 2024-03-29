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
import SweetPagination from "sweetpagination";

const {REACT_APP_MAGIC_PASS} = process.env;
const GETORDER_URL = "/management/order_overview";


export default function OrderDashboard(props) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  const [currentPageData, setCurrentPageData] = useState([
    {
      madh: '001',
      thoi_gian: '20:20:20 11/08/2022',
      tong_phi: 100000,
      trang_thai: 'CHỜ XÁC NHẬN'
    }
  ]);

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
      params: {offset: props.offset },
    }).then((res) => {
      setTotal(res.data.total);
      setOrders(res.data.list_order);
    });
  };
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
     subtitle= "Tất cả"
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
      {currentPageData.length !=0 ? <>
        {currentPageData.map((item, index) => {
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
              <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.tong_phi)}</td>
              <td>
              {item.trang_thai.normalize() === "CHỜ XÁC NHẬN".normalize() ? <span className="badge badge-wait">{item.trang_thai}</span> : 
              item.trang_thai.normalize() === "ĐÃ XÁC NHẬN".normalize() ? <span className="badge badge-confirmed">{item.trang_thai}</span> :
              item.trang_thai.normalize() === "ĐANG GIAO".normalize() ? <span className="badge badge-delivering">{item.trang_thai}</span> :
              ["ĐÃ GIAO THÀNH CÔNG".normalize() ,"ĐÃ GIAO".normalize()].includes(item.trang_thai.normalize()) ? <span className="badge badge-delivered">{item.trang_thai}</span> :
              <span className ="badge badge-cancel">{item.trang_thai}</span>}   
              </td>
              
            </tr>
          )
      })}</>: "No data"}
      <SweetPagination
        currentPageData={setCurrentPageData}
        dataPerPage={10}
        getData={orders}
        navigation={true}
      />
      
    </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
      </div>
      
    </>
  );
    
}