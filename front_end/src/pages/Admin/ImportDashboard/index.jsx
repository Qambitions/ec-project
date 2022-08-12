import React,  {useEffect, useState} from "react";
import {useNavigate  } from 'react-router-dom';
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import SweetPagination from "sweetpagination";

import {
  Card,
  Table,
  Button,
  Form,
  Modal
} from "react-bootstrap";

import moment from "moment";
import axios from "../../../api/axios";
const {REACT_APP_MAGIC_PASS} = process.env;
const GET_PO_URL = "/management/purchase_overview";
const GET_BRANCH_URL = "/management/list_branch";
const GET_SUPPLIER_URL = "/management/list_supplier";

export default function ImportDashboard() {
  const [branchValue, setBranchValue] = useState("200");
  const [supplierValue, setSupplierValue] = useState();

  const [branches, setBranches] = useState([]);
  const [suppliers, setSuppliers] = useState([]);


  const [po, setPO] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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

  const handleChange = (e) => {
    setBranchValue(e.target.value);
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
     count = "200"/>
     <div style={{display: "flex"}}>
     <div className="input-group p-4">
        <h5>Chọn chi nhánh: &nbsp;&nbsp;</h5>
        <select value={branchValue} onChange={e => handleChange(e)} className="px-5">
          {branches.map((item, index) => {
          return (
            <option value={item.macn}>{item.macn}</option>
          )
      })}
        </select>
        </div>

        <div>
        <Button onClick={handleShow} style={{padding: "1rem", width: "200px"}}>
            Tạo mới phiếu nhập
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo mới phiếu nhập</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Chi nhánh&nbsp;&nbsp;</Form.Label>
                  <select value={branchValue} onChange={e => handleChange(e)} className="px-5">
                    {branches.map((item, index) => {
                    return (
                      <option value={item.macn}>{item.macn}</option>
                    )
                })}
                  </select>
                </Form.Group>
                <Form.Group>
                <Form.Label>Nhà phân phối&nbsp;&nbsp;</Form.Label>
                  <select value={supplierValue} onChange={e => setSupplierValue(e.target.value)} className="px-5">
                    {suppliers.map((item, index) => {
                    return (
                      <option value={item.ten_npp}>{item.ten_npp}</option>
                    )
                })}
                  </select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Thêm
              </Button>
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
      })}

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
      
      </div>

      </div>
      
    </>
  );
    
}