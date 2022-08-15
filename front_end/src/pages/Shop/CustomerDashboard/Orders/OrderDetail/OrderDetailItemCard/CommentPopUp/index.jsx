import React, { useState } from "react";
import { Rate } from "antd";
import "antd/dist/antd.min.css";
import { RiCloseLine } from "react-icons/ri";
import "./style.css";
import axios from "../../../../../../../api/axios";
import Cookies from "js-cookie";

export default function CommentPopUp({ info, handleClose }) {
  const [currentStar, setCurrentStar] = useState(0);
  const [comment, setComment] = useState('');
  const [fail,setFail]=useState();
  const handleSendComment = async()=>{
    try {
      let res = await axios({
        method: 'POST',       
        headers: {token:Cookies.get("token")},
        url:process.env.REACT_APP_PUSH_COMMENT,
        data:{
          masp:info.masp,
          sao: currentStar,
          noi_dung:comment
        }
      }).then((res)=>res.data.exitcode===0?handleClose:setFail('comment r cha'))
    } catch (error) {
      
    }
  }
  const handleComment = (e)=>{
  setComment(e.target.value)}
  return (
    <>
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
          <textarea placeholder="Hãy chia sẻ cảm nhận, đánh giá của bạn về sản phẩm này nhé!" onChange={handleComment}></textarea>
          <div>
            <p>{fail}</p>
            <button onClick={handleSendComment}>Gửi đánh giá</button>
          </div>
        </div>
      </div>
    </>
  );
}
