import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import axios from "../../../../api/axios";
import { OrderCard } from "./OrderCard";

export function OrderInfo({ itemsList }) {
  const [items, setItems] = useState([]);

  const fetchDetail = () => {
    if (itemsList.length > 0) {
      setItems(itemsList);
    }
  };

  useEffect(() => {
    fetchDetail();
    console.log("IL", itemsList.length);
  }, [itemsList]);

  return (
    <div className="payment__info_container">
      <div className="container__flex payment__info_head">
        <h4>Đơn hàng</h4>
        <a>Thay đổi</a>
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
