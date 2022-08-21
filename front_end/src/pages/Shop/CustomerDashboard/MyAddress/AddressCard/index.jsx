import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./style.css";

export default function AddressCard({ name, phone, address, type }) {
  return (
    <>
      <Row className="address_card">
        <Col className="address_card_col1">
          <img
            className="icon_button"
            src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057714/icon/61456_t8f583.png"
            alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057714/icon/61456_t8f583.png"
          ></img>
        </Col>
        <Col className="address_card_col2" xs={3}>
          <Row>
            <label>Họ tên:</label>
          </Row>
          <Row>
            <label>Số điện thoại</label>
          </Row>
          <Row>
            <label>Địa chỉ:</label>
          </Row>
        </Col>
        <Col className="address_card_col3" xs={7}>
          <Row>
            <label>{name}</label>
          </Row>
          <Row>
            <label>{phone}</label>
          </Row>
          <Row>
            <label>{address}</label>
          </Row>
        </Col>
        <Col className="address_card_col4">
          <img
            className="icon_button"
            src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2311556_jwc1bf.png"
            alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2311556_jwc1bf.png"
          ></img>
        </Col>
      </Row>
    </>
  );
}
