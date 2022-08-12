import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Row,
  Col,
} from "react-bootstrap";

import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import SweetPagination from "sweetpagination";


const {REACT_APP_MAGIC_PASS} = process.env;
const GET_USER_URL = "/management/user_overview";


  

export default function UserDashboard(props) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentData, setCurrentData] = useState([
    {
      makh: '001',
      email_kh: 'email@gmail.com',
      ma_cap_bac: 1, 
      activate: true
    }
  ]);


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    await axios(GET_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: { limit: props.limit, offset: props.offset },
    }).then((res) => {
      setTotal(res.data.total);
      setUsers(res.data.list_user);
    });
  };
const navigate = useNavigate();
const handleRowCLick = (id) => {
  navigate(`/admin/user/${id}`);
 }  
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
          count = {total}/>
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
                {currentData.map((item, index) => {
                  return (
                    <tr onClick={()=> handleRowCLick(item.makh)}>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="ms-3">
                            <p class="fw-bold mb-1">{item.makh}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">{item.email_kh}</p>
                      </td>
                      <td>{item.ma_cap_bac}</td>
                      <td>
                      {item.activate ? <span className="badge badge-active">Active</span> : 
                      <span className="badge badge-block">Tạm khóa</span> }   
                      </td>
                    </tr>
                  )
              })}
              <SweetPagination
                currentPageData={setCurrentData}
                dataPerPage={10}
                getData={users}
                navigation={true}
              />
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>      
    </>
  );
}
