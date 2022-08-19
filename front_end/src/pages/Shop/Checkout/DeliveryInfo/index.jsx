import { useContext } from "react";
import { DeliveryCard } from "./DeliveryCard";
import AuthContext from "../../../../context/AuthProvider";

export function DeliveryInfo(props) {
  const authContext = useContext(AuthContext);

  return (
    <div className="payment__info_container">
      <div className="container__flex payment__info_head">
        <h4>Thông tin nhận hàng</h4>
        <a>Tùy chỉnh</a>
      </div>
      <div className="payment__info_body">
        {authContext.deliveryAddress.map((item) => (
          <DeliveryCard info={item} />
        ))}
        <br/>
        <a className="navigate__detail">+ Thêm địa chỉ mới</a>
      </div>
    </div>
  );
}
