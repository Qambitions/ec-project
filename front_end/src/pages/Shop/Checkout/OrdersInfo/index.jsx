import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CheckoutContext from "../../../../context/CheckoutProvider";
import { OrderCard } from "./OrderCard";

export function OrderInfo({ itemsList }) {
  const checkoutContext = useContext(CheckoutContext);
  const [items, setItems] = useState([]);
  const fetchDetail = () => {
    if (itemsList.length > 0) {
      setItems(itemsList);
    }
  };

  useEffect(() => {
    fetchDetail();
    calTempPay();
  }, [itemsList]);

  const calTempPay = () => {
    let tmpPay = 0;
    itemsList.forEach((item) => {
      tmpPay += item.gia_ban_giam * item.so_luong_mua;
    });
    checkoutContext.setTempPay(tmpPay);
  };

  return (
    <div className="payment__info_container">
      <div className="container__flex payment__info_head">
        <h4>Đơn hàng</h4>
        <a href="/user/cart" className="navigate__detail">
          Thay đổi
        </a>
      </div>
      <div className="payment__info_body">
        {items.map((item) => (
          <OrderCard
            hinh_anh={item.hinh_anh}
            ten_npp={item.ten_npp}
            gia_phai_tra={item.gia_ban_giam}
            tensp={item.tensp}
            so_luong_mua={item.so_luong_mua}
          />
        ))}
      </div>
    </div>
  );
}
