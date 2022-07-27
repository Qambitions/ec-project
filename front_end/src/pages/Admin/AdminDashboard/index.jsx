// import {Layout} from "antd";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import OrderDashboard from "../OrderDashboard";
// import Sidebar from "../../../components/sidebar/Sidebar";
// import AdminNavbar from "../../../components/NavBar/Navbar";
// import Widget from "../../../components/widget/Widget";
// import { Avatar, Card, Skeleton, Switch } from 'antd';
// import "./style.css";


// const { Header, Content, Footer, Sider } = Layout;
// const { Meta } = Card;
// export default function Admin() {
//   return (
//     <>
//     <Layout >
//     <div className="row">
//       <div className="col-2"><Sidebar/></div>
//      <div className="col-10">
//      <AdminNavbar 
//      title="THỐNG KÊ"/>
//        <div className="row">
//         <Card style={{ width: 300, marginTop: 16 }}>
//           <Meta
//             avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
//             title="Card title"
//             description="This is the description"
//           />
//         </Card>

//          <div className="col-5">
//             <div class="card text-white bg-primary mb-3">
//                 <div class="card-header">USERS</div>
//                 <div class="card-body">
//                   <h5 class="card-title">1234</h5>
//                 </div>
//             </div>
//          </div>

//          <div className="col-5">
//             <div class="card text-white bg-info mb-3">
//                 <div class="card-header">ORDERS</div>
//                 <div class="card-body">
//                   <h5 class="card-title">1234</h5>
//                 </div>
//             </div>
//          </div>

//        </div>

       

//     </div>
//     </div>
//     </Layout>
   
    

//     </>
    
//   );
// }


import React from "react";

// react-bootstrap components
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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


import {MdDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../UserDashboard";

import Sidebar from "../../../components/sidebar/Sidebar";


const dashboards = [
  {
    name: "Visitors today",
    value: 1000,
    icon: <FiUsers/>,
    color: "bg-primary text-white",
  },
    {
      name: "Users",
      value: 1000,
      icon: <FiUsers/>,
      color: "bg-warning text-dark ",
    },
    {
      name: "Products",
      value: 1000,
      icon: <BsBoxSeam/>,
      color: "bg-light text-dark",
    },
    {
      name: "Orders",
      value: 1000,
      icon: <BsNewspaper/>,
      color: "bg-info text-white",
    }
  ];

export default function Dashboard() {
  return (
    <>
      <Container fluid>
        
        <Row>
          <Col lg="2">
            <Sidebar/>
          </Col>

          <Col>

          <Row>

          {dashboards.map((prop, key) => {
              return (
                <Col lg="6">
                  <Card className={prop.color}>
                    <Card.Body>
                      <Row>
                        <Col xs="5">
                          <div className="fa-3x">
                            {prop.icon}
                          </div>
                        </Col>
                        <Col xs="7">
                          <div className="numbers">
                            <p className="card-category">{prop.name}</p>
                            <h3 className="fw-bold">{prop.value}</h3>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
          })}

          </Row>
          </Col>
        </Row>
        
      </Container>
    </>
  );
}
