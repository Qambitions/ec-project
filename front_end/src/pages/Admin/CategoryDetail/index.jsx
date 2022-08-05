import React,{ useEffect, useState } from "react";
import {
    Card,
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import {Link} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";

import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PRODUCTS_URL = "/management/inventory_overview_product";

export default function CategoryDetail(){
  const [value, setValue] = useState("200");
  const [total, setTotal] = useState(0);
  const [pdt, setPdt] = useState([]);

  useEffect(() => {
    fetchProducts("200");
  }, []);


  const fetchProducts = async (iVal) => {
    await axios(GET_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: {macn: iVal },
    }).then((res) => {
      console.log(res.data.list_order);
      setPdt(res.data.list_order);
      setTotal(res.data.total);
    });
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    fetchProducts(e.target.value);
  }


    return (<>
        <Container fluid>    
        <Row>
          <Col lg="2">
          <Sidebar/>
          </Col>
          <Col>
          <AdminNavbar 
          title="Quản lý kho"
          text ="Tổng số mặt hàng"
          count = {total}/>

        <div className="input-group p-4">
          <h5>Chọn chi nhánh: &nbsp;&nbsp;</h5>
          <select value={value}  onChange={e => handleChange(e)} className="px-5">
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
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng tồn</th>
                  </tr>
                </thead>
                <tbody>
                {pdt.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="ms-3">
                            <p class="fw-bold mb-1">{item.masp}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">{item.ten_sp}</p>
                      </td>
                      <td> {item.so_luong_ton}</td>
                    </tr>
                  )
              })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>

    </>);
}