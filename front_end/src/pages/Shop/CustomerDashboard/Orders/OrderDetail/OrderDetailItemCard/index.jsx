import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function OrderDetailItemCard({ info }) {
  return (
    <Container className="container__100 order__detail_item_card">
      <Col xs={6}>
        <div className="container__flex">
          <img
            className="order__card_img"
            src={info.hinh_anh}
            alt={info.hinh_anh}
          ></img>
          <div className="container__flex_col">
            <div>
              <label>{info.ten_npp}</label>
              <label>{info.ten_sp}</label>
            </div>
            <div>
              <button>Đánh giá</button>
              <button>Mua lại</button>
            </div>
          </div>
        </div>
      </Col>
      <Col>{info.gia_phai_tra}</Col>
      <Col>{info.so_luong_mua}</Col>
      <Col>{info.thanh_tien_mua}</Col>
    </Container>
  );
}
