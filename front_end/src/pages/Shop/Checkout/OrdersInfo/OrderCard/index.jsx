import { useEffect } from "react";
import { useState } from "react";
import { fetchProductDetail } from "../../../../../api/axios";
import "./style.css";
import axios from "../../../../../api/axios";
export function OrderCard({ quantity, itemID }) {
  const [info, setInfo] = useState();

  const fetch = async () => {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_GET_PRODUCT_DETAIL,
      params: { masp: itemID },
    });
    console.log(res.data.item);
    console.log(itemID + " " + quantity);
    setInfo(res.data.item);
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="container__flex">
      <img className="order__card_img" src={info?.hinh_anh}></img>
      <div className="container__flex_col">
        <div className="container__flex">
          <small>{itemID}</small>
          {/* <small>{info.gia_ban_giam}</small> */}
        </div>
        <small>{info?.tensp}</small>
        <p>SL: {quantity}</p>
      </div>
    </div>
  );
}
