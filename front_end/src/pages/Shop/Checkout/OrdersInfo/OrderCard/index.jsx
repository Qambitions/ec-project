import { useEffect } from "react";
import { useState } from "react";
import { fetchProductDetail } from "../../../../../api/axios";
import "./style.css";
import axios from "../../../../../api/axios";
export function OrderCard({ info }) {
  // const [info, setInfo] = useState();

  // const fetch = async () => {
  //   let res = await axios({
  //     method: "get",
  //     url: process.env.REACT_APP_GET_PRODUCT_DETAIL,
  //     params: { masp: itemID },
  //   });
  //   // console.log(res.data.item);
  //   // console.log(itemID + " " + quantity);
  //   setInfo(res.data.item);
  // };
  // useEffect(() => {
  //   fetch();
  // }, []);

  return (
    <div className="container__flex order__card">
      <img className="order__card_img" src={info?.hinh_anh}></img>
      <div className="container__flex_col">
        <div className="container__flex">
          <small>{info?.ten_npp}</small>
          <small>{info?.gia_phai_tra}đ</small>
        </div>
        <small>{info?.ten_sp}</small>
        <p>SL: {info?.so_luong_mua}</p>
      </div>
    </div>
  );
}
