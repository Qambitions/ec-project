import { Link } from "react-router-dom";
import "./style.css";
function SuccessTransaction() {
  return (
    <div className="popup_message">
      <div>
        <img
          src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057715/icon/190411_dbftms.png"
          alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057715/icon/190411_dbftms.png"
        ></img>
        <h3>GIAO DỊCH THÀNH CÔNG</h3>
        <p>Cảm ơn bạn đã lựa chọn Huimitu</p>
      </div>

      <a href="/user/myorder">Xem lại đơn hàng</a>
    </div>
  );
}

function FailTransaction() {
  return (
    <div className="container">
      {" "}
      <div className="popup_message">
        <div>
          <img
            src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057714/icon/190406_wray8h.png"
            alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1658057714/icon/190406_wray8h.png"
          ></img>
          <h3>GIAO DỊCH THẤT BẠI</h3>
          <p>Thanh toán không hợp lệ!</p>
        </div>

        <a href="/user/myorder">Xem lại đơn hàng</a>
      </div>
    </div>
  );
}

export { SuccessTransaction, FailTransaction };
