import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SignInErrorMessageBox } from "./SignInErrorMessageBox";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import Cookies from "js-cookie";

const LOGIN_URL = "/account/login";

export default function SignInForm() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [exitCode, setExitCode] = useState(2);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Không được để trống";
    }
    if (!values.password) {
      errors.password = "Không được để trống";
    }
    return errors;
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
    setFormErrors((prevState) => {
      return { ...prevState, username: null };
    });
  };

  const handlePassInput = (e) => {
    setPassword(e.target.value);
    setFormErrors((prevState) => {
      return { ...prevState, password: null };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate({ username, password }));
    if (username && password) {
      try {
        const res = await axios.post(LOGIN_URL, {
          username: username,
          password: password,
        });
        console.log(res.data.exitcode);

        if (res.data.exitcode === 0) {
          Cookies.set("token", res.data.token, {
            expires: 1,
            path: "/",
            sameSite: "strict",
            secure: true,
          });
          localStorage.setItem(
            "account_info",
            JSON.stringify(res.data.account_info)
          );
          setUsername("");
          setPassword("");
          navigate("/", { replace: true });
        } else {
        }
        setExitCode(res.data.exitcode);
      } catch (error) {}
    }
  };

  return (
    <div className="container signin-body">
      <div className="signin-container">
        <h2>Đăng nhập</h2>
        {exitCode === 1 && <SignInErrorMessageBox />}
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            id="loginUsernameInput"
            placeholder="Email/ Số điện thoại"
            ref={userRef}
            value={username}
            onChange={handleUsernameInput}
          ></input>
          <div className="error_message_container">
            <small>{formErrors.username}</small>
          </div>
          <input
            id="loginPassInput"
            placeholder="Mật khẩu"
            value={password}
            onChange={handlePassInput}
            type="password"
          ></input>
          <div className="error_message_container">
            <small>{formErrors.password}</small>
          </div>
          <div className="signin-form-else">
            <Link to="/user/quen-mat-khau">Quên mật khẩu?</Link>
            <Link to="/user/dang-ky">
              <span>Chưa có tài khoản? </span>Đăng ký
            </Link>
          </div>
          <button className="btn signin-form-signbutton">Đăng nhập</button>
        </form>
        <div className="divider">
          <hr className="line"></hr>
          <p>Hoặc</p>
          <hr className="line"></hr>
        </div>
        <button className="btn sign-form-continue-google">
          <FcGoogle className="google-icon" />
          Tiếp tục với Google
        </button>
      </div>
    </div>
  );
}
