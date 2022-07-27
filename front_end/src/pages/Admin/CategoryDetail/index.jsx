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
import {Link} from "react-router-dom";
import AdminNavbar from "../../../components/NavBar/Navbar";
export default function CategoryDetail(){
    const data = [
        {
          id: '001',
          name: 'Thức ăn cho chó',
          stockQuantity: 12,
        },
        {
        id: '002',
        name: 'Sữa tắm cho mèo',
        stockQuantity: 45,
        },
        {
        id: '003',
        name: 'Balo thú cưng',
        stockQuantity: 42,
        },
        {
        id: '004',
        name: 'Chuồng chó',
        stockQuantity: 112,
        },
    
    
      ];
    return (<>
        <Container fluid>    
        <Row>
          <Col lg="2">
          <Sidebar/>
          </Col>
          <Col>
          <AdminNavbar 
          title="Quản lý kho"
          text ="Tổng số mặt hàng"
          count = "1234"/>
          <Card className="card-plain table-plain-bg">
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover">
                <thead>
                  <tr style={{backgroundColor: "#F0C9C9"}}>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng tồn</th>
                  </tr>
                </thead>
                <tbody>
                {data.map((item, index) => {
                  return (
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="ms-3">
                            <p class="fw-bold mb-1">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-normal mb-1">{item.name}</p>
                      </td>
                      <td> {item.stockQuantity}</td>
                    </tr>
                  )
              })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>

    </>);
}