import React,{ useEffect, useState } from "react";
import {
    Row,
    Col,
    Button,
    Form,
    Modal
  } from "react-bootstrap";
import axios from "../../api/axios";
import { ToastContainer, toast } from 'react-toastify';

const {REACT_APP_MAGIC_PASS} = process.env;
const GET_CATEGORY_URL = "/management/list_category";
const GET_SUPPLIER_URL = "/management/list_supplier";
const POST_ITEM = "/management/add_item";


export default function AddProduct(){
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [tenSP, setTenSP] = useState("");
  const [MALH, setMALH] = useState('10');
  const [MANPP, setMANPP] = useState('1000');
  const [gia, setGia] = useState(0);
  const [khoiLuong, setKhoiLuong] = useState(0);
  const [moTa, setMoTa] = useState("");
  const [image, setImage] = useState("");

  const [show, setShow] = useState(false);
  const handleCancel = () => {
    setShow(false);
    setGia(0);
    setKhoiLuong(0);
    setMoTa("");
    setTenSP("")
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchSupplier();
    fetchCategory();
  }, []);

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


  const handleSubmit = async(e) => {
  if (tenSP == "" || moTa==""){
    toast("Tên sản phẩm và mô tả không được bỏ trống", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });
  }
  else if (gia <= 0 || khoiLuong <= 0) {
    toast("Giá bán và khối lượng phải lớn hơn 0", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });
  }
  else if (image ==""){
    toast("Vui lòng chọn hình ảnh", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });
  }
  else {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ec_upload');
    await axios.post("https://api.cloudinary.com/v1_1/ec-2022-lam-zau-khum-kho/image/upload", formData).then((res) => {
        postItem(e, res.data.url);
        
      });
  }
  }
  
  const postItem = async (e, uploadImg) => {
    var postData = {
      ten_sp: tenSP,
      malh: MALH,
      manpp: MANPP,
      gia_ban: gia,
      khoi_luong: khoiLuong,
      mo_ta: moTa,
      hinh_anh: uploadImg

  };
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

    return (
    <>  
        <ToastContainer style={{ width: "500px" }}/>

        <div>
        <Button onClick={handleShow} style={{padding: "1rem", width: "200px"}}>
            Thêm sản phẩm
          </Button>

          <Modal show={show} onHide={handleCancel}>

            <Modal.Header closeButton>
              <Modal.Title>Thêm sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form> 
              <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text" onChange = {e => setTenSP(e.target.value)}/>
            </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Loại hàng&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100" value={MALH} onChange={e => setMALH(e.target.value)}>
                    {category.length != 0 ? <>
                      {category.map((item, index) => {
                    return (
                      <option value={item.malh} key={index}>{item.ten_lh}</option>
                    )
                })}
                    </> : "No data"
                    }
                  </select>
                </Form.Group>
                <Form.Group>
                <Form.Label>Nhà phân phối&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100" value={MANPP} onChange={e => setMANPP(e.target.value)}>
                    {suppliers.length !=0 ? <>
                      {suppliers.map((item, index) => {
                    return (
                      <option value={item.manpp} key={index}>{item.ten_npp}</option>
                    )
                })}</> : "No data"}
                  </select>
                </Form.Group>
                <Row className="my-2">
                  <Form.Group as={Col}>
                  <Form.Label>Giá tiền (VND)</Form.Label>
                  <Form.Control type="number" onChange={e => setGia(e.target.value)}/>
                  </Form.Group>

                  <Form.Group as={Col}>
                  <Form.Label>Khối lượng (g)</Form.Label>
                  <Form.Control type="number"  onChange={e => setKhoiLuong(e.target.value)}/>
                  </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={e => setMoTa(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control type="file" onChange={(e) => {setImage(e.target.files[0])}}/>
                </Form.Group>
                <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Thêm
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
          </Modal>
        </div>

    </>);
}