import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../../../../context/AuthProvider";
import CheckoutContext from "../../../../../context/CheckoutProvider";
import "./style.css";

export function DeliveryCard(props) {
  const authContext = useContext(AuthContext);
  const checkoutContext = useContext(CheckoutContext);
  const updateCheckoutInfo = (iddc) => {
    var info = localStorage.getItem("checkoutInfo");
    info = info ? JSON.parse(info) : {};
    info.id_dia_chi_giao = iddc;
    localStorage.setItem("checkoutInfo", JSON.stringify(info));
  };

  useEffect(() => {
    if (props.info.mac_dinh) {
      checkoutContext.setDeliveryInfo(props.info);
      updateCheckoutInfo(props.info.stt);
    }
  }, []);

  const handleCheck = (e) => {
    if (e.target.checked) {
      checkoutContext.setDeliveryInfo(props.info);
      updateCheckoutInfo(props.info.stt);
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
        <div className="card__info">
          <div className="container__flex">
            <label>{authContext.info.tenkh}</label>
          </div>
          <label>{authContext.info.sdt_kh}</label>
          <br/>
          <label>
            {props.info.so_nha_duong +
              ", phường " +
              props.info.phuong_xa +
              ", quận " +
              props.info.quan_tp +
              ", TP " +
              props.info.tp_tinh}
          </label>
        </div>
      </div>
      {props.info.mac_dinh ? <label style={{color:"#DA4141"}}>Mặc định</label> : <></>}
    </div>
  );
}
