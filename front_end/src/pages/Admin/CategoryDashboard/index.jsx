import React from "react";
import "./style.css";
import AddProduct from "../../../components/AddProduct";
import {
    Card,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
import Sidebar from "../../../components/sidebar/Sidebar";
import {Link, useNavigate} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";
export default function CategoryDashboard(){
   const navigate = useNavigate();
  const handleRowCLick = (id) => {
    navigate(`/admin/category/${id}`);
   } 
    const type = [
        {
            malh: 10,
            name: "Thức ăn",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659319834/category/food_spgzt9.jpg",
        },
        {
            malh: 11,
            name: "Mỹ phẩm & Làm đẹp",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659319833/category/beauty_fjbhq3.jpg",

        },
        {
            malh: 12,
            name: "Thời trang",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659321092/category/fashion1_bzswql.jpg",

        },
        {
            malh: 13,
            name: "Đồ chơi",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659321095/category/toy1_w7ndho.jpg",

        },
        {
            malh: 14,
            name: "Y tế",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659321214/category/drug1_coxe4s.jpg",

        },
        {
            malh: 15,
            name: "Chuồng thú",
            img: "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1659320879/category/house1_b2yloj.jpg",

        },

    ];
    return (<>
        <Container fluid>
        <Row style={{backgroundColor: "#F5F5F5"}}>
        <Col lg="2"><Sidebar/></Col>
          <Col>
          <Row>
          <AdminNavbar 
          title="Quản lý kho"
          text ="Danh mục sản phẩm"
          count = "6"/>
          </Row>
        <div className="d-flex justify-content-between">
          <Link to="/admin/all-products"><h5 className="p-2">Xem tất cả {'>>'} </h5></Link>
            <AddProduct/>
        </div>
          <Row>  
          {type.map((item, index) => {
          return (
            <Col sm="4">
            <Card onClick={()=> handleRowCLick(item.malh)}>
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