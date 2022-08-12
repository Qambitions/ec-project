import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../../api/axios";
import { OrderCard } from "./OrderCard";

export function OrderInfo(props) {
  const [items, setItems] = useState([]);

  // const fetchDetail = async (id) => {
  //   let res = await axios({
  //     method: "get",
  //     url: process.env.REACT_APP_GET_PRODUCT_DETAIL,
  //     params: { masp: id },
  //   });
  //   if (res.data.exitcode === 0) {
  //     return res.data.item;
  //   }
  //   return null;
  // };

  useEffect(() => {
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    let items = [];
    for (var i in cart) {
      if (cart[i].isChecked) {
        async function fetchDetail() {
          let res = await axios({
            method: "get",
            url: process.env.REACT_APP_GET_PRODUCT_DETAIL,
            params: { masp: cart[i].itemID },
          });
          if (res.data.exitcode === 0) {
            return res.data.item;
          }
          return null;
        }
        console.log(fetchDetail());
      }
    }
    setItems(items);
  }, []);

  return (
    <div className="payment__info_container">
      <div className="container__flex payment__info_head">
        <h4>Đơn hàng</h4>
        <a>Thay đổi</a>
      </div>
      <div className="payment__info_body">
        {items.map((item) => (
          <OrderCard info={item} />
        ))}
      </div>
    </div>
  );
}
