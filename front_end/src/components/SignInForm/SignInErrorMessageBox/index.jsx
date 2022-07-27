import { IoIosCloseCircle } from "react-icons/io";
import "./style.css";

export function SignInErrorMessageBox(props) {
  return (
    <div className="signin__error_message_box container__flex">
      <label>
        <IoIosCloseCircle /> Email/ số điện thoại đăng nhập hoặc mật khẩu không
        chính xác vui lòng thử lại.
      </label>
    </div>
  );
}
