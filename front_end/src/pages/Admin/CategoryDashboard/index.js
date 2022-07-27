import React from "react";
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import {Link, useNavigate} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";
export default function CategoryDashboard(){
    const navigate = useNavigate();
    // const handleRowCLick = (id) => {
    //  navigate(`/${id}`);
    // } 
  const handleRowCLick = () => {
     navigate("/admin/category/detail");
    } 
    const type = [
        {
            name: "Thức ăn",
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",
        },
        {
            name: "Mỹ phẩm & Làm đẹp",
            img: "http://loremflickr.com/320/150?random=4",
        },
        {
            name: "Thời trang",
            img: "http://loremflickr.com/320/150?random=4",
        },
        {
            name: "Đồ chơi",
            img: "http://loremflickr.com/320/150?random=4",
        },
        {
            name: "Y tế",
            img: "http://loremflickr.com/320/150?random=4",
        },
        {
            name: "Chuồng thú",
            img: "http://loremflickr.com/320/150?random=4",
        },

    ];
    return (<>
        <Container fluid>
          <Row>
            <Col lg="2">
                <Sidebar/>
            </Col>
          <Col>
          <Row>
          <AdminNavbar 
          title="Quản lý đơn hàng"
          text ="Danh mục sản phẩm"
          count = "6"/>
          </Row>
          <Row>  
          {type.map((item, index) => {
          return (
            <Col sm="4">
            <Card onClick={handleRowCLick}>
              <img src={item.img} className="img-fluid"/>
              <h2>{item.name}</h2>
            </Card>
            </Col>
          )
      })}
           
            
          </Row>
          </Col>
            </Row>
        </Container>

    </>);
}