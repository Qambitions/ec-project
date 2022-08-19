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
  const [image, setImage] = useState();
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [show, setShow] = useState(false);

  const handleCancel = () => setShow(false);
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


  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ec_upload");
    // await axios.post("https://api.cloudinary.com/v1_1/ec-2022-lam-zau-khum-kho/image/upload", formData).then((res) => {
    //   console.log(res);
    //   postItem(e, res.data.url);

    // });
    try {
        fetch("https://api.cloudinary.com/v1_1/ec-2022-lam-zau-khum-kho/image/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => postItem(e, data.url));
    }
    catch (err) {
        console.log(err);
    }
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
    window.location.reload();
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
              <Form onSubmit={handleSubmit}> 
              <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Loại hàng&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100">
                    {category.length != 0 ? <>
                      {category.map((item, index) => {
                    return (
                      <option value={item.malh}>{item.ten_lh}</option>
                    )
                })}
                    </> : "No data"
                    }
                  </select>
                </Form.Group>
                <Form.Group>
                <Form.Label>Nhà phân phối&nbsp;&nbsp;</Form.Label>
                  <select className="p-2 w-100">
                    {suppliers.length !=0 ? <>
                      {suppliers.map((item, index) => {
                    return (
                      <option value={item.manpp}>{item.ten_npp}</option>
                    )
                })}</> : "No data"}
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

    </>);
}