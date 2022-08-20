import React,{ useEffect, useState } from "react";
import {
    Card,
    Table,
    Container,
    Row,
    Col,
    Button,
    Form,
    Modal
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import axios from "../../../api/axios";
import SweetPagination from "sweetpagination";
import { ToastContainer, toast } from 'react-toastify';
import {useParams, Link, useNavigate} from "react-router-dom";
import AddProduct from "../../../components/AddProduct";

const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PRODUCTS_URL = "/management/inventory_overview_product";
const GET_BRANCH_URL = "/management/list_branch";
const GET_CATEGORY_URL = "/management/list_category";
const GET_SUPPLIER_URL = "/management/list_supplier";
const POST_ITEM = "/management/add_item";


export default function CategoryDetail(){
  const navigate = useNavigate();
  const {category_id} = useParams();
  const [branchValue, setBranchValue] = useState("200");
  const [image, setImage] = useState();


  const [total, setTotal] = useState(0);
  const [pdt, setPdt] = useState([]);
  const [branches, setBranches] = useState([]);
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [show, setShow] = useState(false);

  const handleCancel = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setBranchValue(e.target.value);
    fetchProducts(e.target.value);
  }

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

  

  const handleRowCLick = (id) => {
    navigate(`/product/${id}`);
   }  

    return (<>

        <Container fluid>    
        <ToastContainer style={{ width: "500px" }}/>

        <Row>
          <Col lg="2">
          <Sidebar/>
          </Col>
          <Col>
          <AdminNavbar 
          title="Quản lý kho"
          subtitle= {category_id}
          text ="Tổng số mặt hàng"
          count = {total}/>
        <div style={{display: "flex"}}>
     <div className="input-group p-4">
        <h5>Chọn chi nhánh: &nbsp;&nbsp;</h5>
        <select value={branchValue} onChange={e => handleChange(e)} className="px-5">
          {branches.length !=0 ? <>
            {branches.map((item, index) => {
          return (
            <option value={item.macn}>{item.macn}</option>
          )
      })}
          </>: "No data"}
        </select>
        </div>
        <AddProduct/>
        
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
                {currentData.length != 0 ? <>
                  {currentData.map((item, index) => {
                  return (
                    <tr onClick={()=> handleRowCLick(item.masp)}>
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
              </> : "No data"}
              <SweetPagination
                currentPageData={setCurrentData}
                dataPerPage={10}
                getData={pdt}
                navigation={true}
              />

                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Link to="" onClick={()=>navigate(-1)}><h5 className="p-2">{'<<'} Trở về </h5></Link>

          </Col>
        </Row>
      </Container>

    </>);
}