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
    fetchSupplier();
    fetchCategory();
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

  const fetchCategory = async () => {
    await axios(GET_CATEGORY_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    }).then((res) => {
      setCategory(res.data.loai_hang);
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
    fetchProducts(e.target.value);
  }


  const handleSubmit = async(e) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "j3eosdqd");
    await axios.post("https://api.cloudinary.com/v1_1/ec-2022-lam-zau-khum-kho/image/upload", formData).then((res) => {
      postItem(e, res.data.url);

    });

  }
  
  const postItem = async (e, uploadImg) => {
    var postData = {
        ten_sp: e.target[0].value,
        malh: e.target[1].value,
        manpp: e.target[2].value,
        gia_ban: e.target[3].value,
        khoi_luong: e.target[4].value,
        mo_ta: e.target[5].value,
        hinh_anh: uploadImg

    };
    console.log(postData);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "magic_pass": REACT_APP_MAGIC_PASS
      }
    };

  await axios.post(POST_ITEM, postData, axiosConfig).then((res) => {
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
          {branches.map((item, index) => {
          return (
            <option value={item.macn}>{item.macn}</option>
          )
      })}
        </select>
        </div>

        <div>
        <Button onClick={handleShow} style={{padding: "1rem", width: "200px"}}>
            Thêm sản phẩm
          </Button>

          <Modal show={show} onHide={handleCancel}>

            <Modal.Header closeButton>
              <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}> 
              <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Loại hàng&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100">
                    {category.map((item, index) => {
                    return (
                      <option value={item.malh}>{item.ten_lh}</option>
                    )
                })}
                  </select>
                </Form.Group>
                <Form.Group>
                <Form.Label>Nhà phân phối&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100">
                    {suppliers.map((item, index) => {
                    return (
                      <option value={item.manpp}>{item.ten_npp}</option>
                    )
                })}
                  </select>
                </Form.Group>
                <Row className="my-2">
                  <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Giá tiền (VND)</Form.Label>
                  <Form.Control type="number"/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Khối lượng (g)</Form.Label>
                  <Form.Control type="number"/>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
                </Form.Group>
                <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
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
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng tồn</th>
                  </tr>
                </thead>
                <tbody>
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