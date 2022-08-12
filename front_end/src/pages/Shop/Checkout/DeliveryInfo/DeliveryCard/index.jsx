import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../../../context/AuthProvider";
import CheckoutContext from "../../../../../context/CheckoutProvider";
import "./style.css";

export function DeliveryCard(props) {
  const authContext = useContext(AuthContext);
  const checkoutContext = useContext(CheckoutContext);
  useEffect(() => {
    if (props.info.mac_dinh) {
      checkoutContext.setDeliveryInfo(props.info);
    }
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked) {
      checkoutContext.setDeliveryInfo(props.info);
    }
  };
  return (
    <div className="container__flex  delivery__card">
      <div className="container__flex">
        <input
          type="radio"
          name="deliveryAddress"
          defaultChecked={props.info.mac_dinh}
          onChange={handleCheck}
        ></input>
        <div className="container__flex_col">
          <div className="container__flex">
            <label>{authContext.info.tenkh}</label>
          </div>
          <small>{authContext.info.sdt_kh}</small>
          <small>
            {props.info.so_nha_duong +
              ", phường " +
              props.info.phuong_xa +
              ", quận " +
              props.info.quan_tp +
              ", TP " +
              props.info.tp_tinh}
          </small>
        </div>
      </div>
      {props.info.mac_dinh ? <label>Mặc định</label> : <></>}
    </div>
  );
}
