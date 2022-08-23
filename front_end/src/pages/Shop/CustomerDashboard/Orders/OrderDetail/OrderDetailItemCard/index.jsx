import { useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import CommentPopUp from "./CommentPopUp";

export default function OrderDetailItemCard({ info }) {
  const handleCommentPopUp = () => {};
  const [commentPopUpIsRemove, setCommentPopUpIsRemove] = useState(false);

  const toggleReview = () => {
    console.log("alo 123");
    setCommentPopUpIsRemove(!commentPopUpIsRemove);
  };

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
              <button onClick={toggleReview}>Đánh giá</button>
              <button>Mua lại</button>
              {commentPopUpIsRemove && (
                <CommentPopUp info={info} handleClose={toggleReview} />
              )}
            </div>
          </div>
        </div>
      </Col>
      <Col>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(info.gia_phai_tra)}
      </Col>
      <Col>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(info.so_luong_mua)}
      </Col>
      <Col>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(info.thanh_tien_mua)}
      </Col>
    </Container>
  );
}
