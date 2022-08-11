import React,{ useEffect, useState } from "react";
import {
    Card,
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import axios from "../../../api/axios";
import SweetPagination from "sweetpagination";
import {useParams} from "react-router-dom";

const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PRODUCTS_URL = "/management/inventory_overview_product";
const GET_BRANCH_URL = "/management/list_branch";


export default function CategoryDetail(){
  const {category_id} = useParams();
  const [value, setValue] = useState("200");
  const [total, setTotal] = useState(0);
  const [pdt, setPdt] = useState([]);
  const [branches, setBranches] = useState([]);

  const [currentData, setCurrentData] = useState([
    {
      masp: '001',
      ten_sp: 'Test',
      so_luong_ton: 10
    }
  ]);

  useEffect(() => {
    fetchProducts("200");
    fetchBranchID();
  }, []);


  const fetchProducts = async (iVal) => {
    await axios(GET_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
      params: {macn: iVal, malh: category_id },
    }).then((res) => {
      console.log(res.data.list_order);
      setPdt(res.data.list_order);
      setTotal(res.data.total);
    });
  };

  const fetchBranchID = async () => {
    await axios(GET_BRANCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setBranches(res.data.chi_nhanh);
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
            {branches.map((item, index) => {
                return (
                  <option value={item.macn}>{item.macn}</option>
                )
            })}
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
                {currentData.map((item, index) => {
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
              <SweetPagination
                currentPageData={setCurrentData}
                dataPerPage={2}
                getData={pdt}
                navigation={true}
              />

                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>

    </>);
}