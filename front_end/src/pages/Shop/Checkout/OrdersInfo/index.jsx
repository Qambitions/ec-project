import { useEffect } from "react";
import { useState } from "react";
import { OrderCard } from "./OrderCard";

export function OrderInfo(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    let items = [];
    for (var i in cart) {
      if (cart[i].isChecked) {
        items.push(cart[i]);
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
        {/* {items.map((item) => (
          <OrderCard quantity={item.quantity} itemID={item.itemID} />
        ))} */}
      </div>
    </div>
  );
}
