import React from "react";
import "./style.css";

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
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",

        },
        {
            name: "Thời trang",
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",

        },
        {
            name: "Đồ chơi",
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",

        },
        {
            name: "Y tế",
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",

        },
        {
            name: "Chuồng thú",
            img: "https://happydog_en_sb.cstatic.io/440x440/f/69110/480x480/c90b13149a/hd-vet-new-product-slider-packshots-sensible-11kg-300g.png",

        },

    ];
    return (<>
        <Container fluid>
        <Row style={{backgroundColor: "#F5F5F5"}}>
        <Col lg="2"><Sidebar/></Col>
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
              <div className="row">
              <a class="portfolio-item" href="#action">
                <div class="text">
                    <div class="text-content">
                        <h2 >{item.name}</h2>
                    </div>
                </div>
                <img class="img-wrap" src={item.img} alt="portfolio" />
            </a>
              </div>
              
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