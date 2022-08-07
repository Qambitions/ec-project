import "./style.css";
import { Navigate } from "react-router-dom";

export default function CustomerDashboard() {
  return (
    <div>
      <div>
        <div>
          <img></img>
          <label>Tên khách hàng</label>
        </div>
        <br />
        <div>
          <label>Thông tin tài khoản</label>
          <label>Đơn hàng</label>
          <label>Thay đổi mật khẩu</label>
          <label>Quản lý địa chỉ</label>
        </div>
      </div>
      <div></div>
    </div>
  );
}
