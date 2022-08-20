import React,  {useEffect, useState} from "react";
import {useNavigate, Link } from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import SweetPagination from "sweetpagination";
import { ToastContainer, toast } from 'react-toastify';

import {
  Card,
  Table,
  Button,
  Form,
  Modal,
  Row,
  Col,
  Badge
} from "react-bootstrap";

import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PO_URL = "/management/purchase_overview";
const GET_BRANCH_URL = "/management/list_branch";
const GET_SUPPLIER_URL = "/management/list_supplier";
const GET_PRODUCTS_URL = "/product/view";
const POST_PO = "/management/create_po";

export default function ImportDashboard() {
  const [branchValue, setBranchValue] = useState("200");
  const [supplierValue, setSupplierValue] = useState("1000");
  const [selectedPrds, setSelectedPrds] = useState([]); 
  const [currMaSP, setCurrMaSP] = useState();
  const [currSL, setCurrSL] = useState(); 
  const [currGia, setCurrGia] = useState(); 
  const [total, setTotal] = useState(0); 

  const [branches, setBranches] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [po, setPO] = useState([]);

  const [show, setShow] = useState(false);

  const handleCancel = () => setShow(false);
  const handleShow = () => setShow(true);

  const addMoreProducts = (e) => {
    var prd = {
      masp: currMaSP,
      so_luong_nhap: currSL,
      don_gia_nhap: currGia
  };
    setSelectedPrds(prev => [...prev, prd])
    setCurrGia('')
    setCurrSL('')
    setTotal(prev => prev + currGia*currSL)
  };

  const [currentData, setCurrentData] = useState([
    {
      ten_npp: 'Huimitu',
      mapn: '001',
      tong_so_mat_hang: 10,
      tong_tien_nhap: 100000,
      ngay_lap: '20:20:20 12/08/2022'
    }
  ]);

  useEffect(() => {
    fetchPurchaseOrders("200");
    fetchBranchID();
    fetchSupplier();
    fetchProducts();
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
      setPO(res.data.list_purchase);
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

  const fetchSupplier = async () => {
    await axios(GET_SUPPLIER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setSuppliers(res.data.nha_phan_phoi);
    });
  };

  const fetchProducts = async () => {
    await axios(GET_PRODUCTS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      },
    }).then((res) => {
      setProducts(res.data.items);
    });
  };

  const handleChange = (e) => {
    setBranchValue(e.target.value);
    fetchPurchaseOrders(e.target.value);
  }

   
  const postPO = async(e) => {
    var postData = {
        macn: branchValue,
        manpp: supplierValue,
        tong_tien_nhap: total,
        po_items: selectedPrds
    };
    setSelectedPrds([])
    setTotal(0)
    setBranchValue("200")
    setSupplierValue("1000")
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    };

  await axios.post(POST_PO, postData, axiosConfig).then((res) => {
    setShow(false);
    toast(res.data.message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });
  });

  };

  const navigate = useNavigate();
  const handleRowCLick = (id) => {
    navigate(`/admin/import/${id}`);
   }  

  
  return (
    <>
     <ToastContainer style={{ width: "500px" }}/>
      <div className="row">
     <div className="col-2"><Sidebar/></div>  
     <div className="col-10" style={{backgroundColor: "#F5F5F5"}}>
     <AdminNavbar 
     title="Quản lý phiếu nhập"
     text ="Tổng đơn nhập"
     count = "200"/>
     <div style={{display: "flex"}}>
     <div className="input-group p-4">
        <h5>Chọn chi nhánh: &nbsp;&nbsp;</h5>
        <select value={branchValue} onChange={e => handleChange(e)} className="px-5">
          {branches.length !=0 ? <>
            {branches.map((item, index) => {
          return (
            <option value={item.macn}>{item.macn}</option>
          )
      })}</>: "No data"}
        </select>
        </div>

        <div>
        <Button onClick={handleShow} style={{padding: "1rem", width: "200px"}}>
            Tạo mới phiếu nhập
          </Button>

          <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo mới phiếu nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Chi nhánh&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100" onChange={e => setBranchValue(e.target.value)}>
                    {branches.map((item, index) => {
                    return (
                      <option value={item.macn}>{item.macn}</option>
                    )
                })}</>: "No data"}
                  </select>
                </Form.Group>
                <Form.Group>
                <Form.Label>Nhà phân phối&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100" onChange={e => setSupplierValue(e.target.value)}>
                    {suppliers.map((item, index) => {
                    return (
                      <option value={item.manpp}>{item.ten_npp}</option>
                    )
                })}
                    </> : "No data"}
                  </select>
                </Form.Group>

                <h4 className="mt-3">Chọn danh sách sản phẩm</h4>
                <Form.Group>
                <Form.Label>Tên sản phẩm&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100" value={currMaSP} onChange={e => setCurrMaSP(e.target.value)}>
                    {products.map((item, index) => {
                    return (
                      <option value={item.masp}>{item.ten_sp}</option>
                    )
                })}
                  </select>
                </Form.Group>
                
                  <Row className="my-2">
                    <Form.Group as={Col}>
                      <Form.Label>Số lượng</Form.Label>
                      <Form.Control type="number" value={currSL} onChange={e => setCurrSL(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Đơn giá nhập (VND)</Form.Label>
                      <Form.Control type="number" value={currGia} onChange={e => setCurrGia(e.target.value)}/>
                    </Form.Group>
                </Row>
                <a className="text-primary" onClick={addMoreProducts}>+ Thêm sản phẩm</a>
                <h5 className="mt-3">Preview</h5>
                <Table className="table-hover">
                  <thead>
                    <tr style={{backgroundColor: "#FF9B7F"}}>
                      <th>Mã sản phẩm</th>
                      <th>Số lượng nhập</th>
                      <th>Đơn giá nhập</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPrds.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              <div class="d-flex align-items-center">
                                <div class="ms-3">
                                  <p class="fw-bold mb-1">{item.masp}</p>
                                </div>
                              </div>
                            </td>
                            <td>{item.so_luong_nhap}</td>
                            <td>{item.don_gia_nhap}</td>
                          </tr>
                        )
                    })}
                  </tbody>
                </Table>
                <br/>
                <Form.Group>
                  <Form.Label>Thành tiền</Form.Label>
                  <h1><Badge bg="warning" text="dark" >{total} VND</Badge></h1>
                  
                  {/* <Form.Control type="number" disable value={total}/> */}
                  </Form.Group>
                
                <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={postPO}>
                Thêm
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </div>
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
      {currentData.length !=0? <>
        {currentData.map((item, index) => {
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
      })}</>: "No data"}
      <SweetPagination
        currentPageData={setCurrentData}
        dataPerPage={10}
        getData={po}
        navigation={true}
      />
    </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Link to="/admin/stock"><h5 className="p-2">{'<<'} Trở về </h5></Link>
      </div>

      </div>
      
    </>
  );
    
}