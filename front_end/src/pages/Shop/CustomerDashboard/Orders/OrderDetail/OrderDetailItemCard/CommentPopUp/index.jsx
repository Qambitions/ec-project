import React, { useState } from "react";
import { Rate } from "antd";
import "antd/dist/antd.min.css";
import { RiCloseLine } from "react-icons/ri";
import "./style.css";
import axios from "../../../../../../../api/axios";
import Cookies from "js-cookie";
import { LoadingOverlay } from "../../../../../../../components/PopUp";

export default function CommentPopUp({ info, handleClose }) {
  const [currentStar, setCurrentStar] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState();
  const [modalShow, setModalShow] = useState(false);
  const handleSendComment = async () => {
    try {
      setModalShow(true);
      await axios({
        method: "POST",
        headers: { token: Cookies.get("token") },
        url: process.env.REACT_APP_PUSH_COMMENT,
        data: {
          masp: info.masp,
          sao: currentStar,
          noi_dung: comment,
        },
      }).then((res) => {
        setModalShow(false);
        if (res.data.exitcode === 0) {
          setMessage("Cám ơn bạn đã đánh giá");
          setTimeout(() => {
            handleClose();
          }, 3000);
        } else {
          setMessage("Bạn đã đánh giá cho món hàng này rồi");
        }
      });
    } catch (error) {}
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  return (
    <>
      <LoadingOverlay show={modalShow} onHide={() => setModalShow(false)} />
      <div className="popup__background">
        <div className="popup__container comment__popup">
          <div className="popup__header">
            <h4>Đánh giá sản phẩm</h4>
            <RiCloseLine onClick={handleClose} />
          </div>
          <div className="container__flex">
            <img
              className="order__card_img"
              src={info.hinh_anh}
              alt={info.hinh_anh}
            ></img>
            <div className="container__flex_col">
              <label>{info.ten_npp}</label>
              <label>{info.ten_sp}</label>
            </div>
          </div>
          <div>
            <Rate
              className="popup__product_ratting"
              onChange={(value) => {
                setCurrentStar(value);
              }}
              value={currentStar}
            />{" "}
            <br />
          </div>
          <textarea
            placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé!"
            onChange={handleComment}
          ></textarea>
          <div>
            <p>{message}</p>
            <button onClick={handleSendComment}>Gửi đánh giá</button>
          </div>
        </div>
      </div>
    </>
  );
}
