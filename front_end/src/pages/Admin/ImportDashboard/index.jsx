import React,  {useEffect, useState} from "react";
import {useNavigate  } from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";

import {
  Card,
  Table,
} from "react-bootstrap";

import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PO_URL = "/management/purchase_overview";

export default function ImportDashboard() {
  const [value, setValue] = useState("200");

  const [po, setPO] = useState([]);

  useEffect(() => {
    fetchPurchaseOrders("200");
  }, []);


  const fetchPurchaseOrders = async (iVal) => {
    await axios(GET_PO_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: {macn: iVal },
    }).then((res) => {
      console.log(res.data.list_purchase);
      setPO(res.data.list_purchase);
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    fetchPurchaseOrders(e.target.value);
  }

  const navigate = useNavigate();
  const handleRowCLick = (id) => {
    navigate(`/admin/import/${id}`);
   }  

  
  return (
    <>
      <div className="row">
     <div className="col-2"><Sidebar/></div>  
     <div className="col-10" style={{backgroundColor: "#F5F5F5"}}>
     <AdminNavbar 
     title="Quản lý phiếu nhập"
     text ="Tổng đơn nhập"
     count = "200"
     button = "1"/>
     <div className="input-group p-4">
        <h5>Chọn chi nhánh: &nbsp;&nbsp;</h5>
        <select value={value} onChange={e => handleChange(e)} className="px-5">
          <option value="200">200</option>
          <option value="201">201</option>
          <option value="202">202</option>
          <option value="203">203</option>
          <option value="204">204</option>
        </select>
        </div>
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
      {po.map((item, index) => {
          return (
            <tr onClick={()=> handleRowCLick(item.mapn)}>
              <td>
                <div class="d-flex align-items-center">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">{item.mapn}</p>
                  </div>
                </div>
              </td>
              <td>{item.ten_npp}</td>
              <td>{moment(item.ngay_lap).format("HH:mm:ss DD/MM/YYYY")}</td>
              <td>{item.tong_so_mat_hang}</td>
              <td>{item.tong_tien_nhap}</td>
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