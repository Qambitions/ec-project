import { useContext } from "react";
import AuthContext from "../../../../context/AuthProvider";
import "./style.css";

export function DeliveryCard(props) {
  const authContext = useContext(AuthContext);

  return (
    <div className="container__flex  delivery__card">
      <div className="container__flex">
        <input type="radio"></input>
        <div className="container__flex_col">
          <div className="container__flex">
            <label>{authContext.info.tenkh}</label>
          </div>
          <small>{authContext.info.sdt_kh}</small>
          <small>{props.diachi}</small>
        </div>
      </div>
      <label>Mặc định</label>
    </div>
  );
}
