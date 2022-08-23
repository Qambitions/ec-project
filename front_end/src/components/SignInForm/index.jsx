import "./style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SignInErrorMessageBox } from "./SignInErrorMessageBox";
import { useRef, useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import Cookies from "js-cookie";
import { UserConfig } from "../../context/config";
import { encrypt10 } from "../../utils/crypto";
import debounce from "lodash.debounce";
import { LoadingOverlay } from "../PopUp";
const LOGIN_URL = "/account/login";

export default function SignInForm() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [exitCode, setExitCode] = useState(2);
  const [modalShow, setModalShow] = useState(false);
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

  // <<<<<<< HEAD

  async function callLoginInAPI(username, password) {
    setModalShow(true);
    if (username && password) {
      try {
        const res = await axios
          .post(LOGIN_URL, {
            username: username,
            password: password,
          })
          .then((res) => {
            return res;
          });
        if (res.data.exitcode === 0) {
          Cookies.set("token", res.data.token, {
            expires: 1,
            path: "/",
            sameSite: "strict",
            secure: false,
          });
          localStorage.setItem(
            "account_info",
            JSON.stringify(res.data.account_info)
          );

          const loginDate = Date.now();
          Cookies.set("login_time", loginDate, {
            expires: 1,
            path: "/",
            sameSite: "strict",
            secure: false,
          });
          var encryptedString = encrypt10(
            res.data.account_type,
            Cookies.get("login_time")
          );
          Cookies.set("token_u", encryptedString, {
            expires: 1,
            path: "/",
            sameSite: "strict",
            secure: false,
          });
          setUsername("");
          setPassword("");
          if (res.data.account_type === 0) {
            if (from === "/") {
              navigate("/admin", { replace: true });
            } else {
              navigate(from, { replace: true });
            }
          } else {
            navigate(from, { replace: true });
          }
        } else {
        }
        setExitCode(res.data.exitcode);
      } catch (error) {
        console.log(error);
      }
    }
    setModalShow(false);
  }

  const debounceSubmit = useCallback(
    debounce((username, password) => callLoginInAPI(username, password), 1000),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate({ username, password }));
    debounceSubmit(username, password);
  };

  return (
    <div className="container signin-body">
      <LoadingOverlay show={modalShow} onHide={() => setModalShow(false)} />
      <div className="signin-container">
        <h2>Đăng nhập</h2>
        {exitCode === 104 && <SignInErrorMessageBox />}
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            id="loginUsernameInput"
            placeholder="Email/ Số điện thoại"
            // ref={userRef}
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
          <button className="FF5D5D_button">Đăng nhập</button>
        </form>
        <div className="divider">
          <hr className="line"></hr>
          <p>Hoặc</p>
          <hr className="line"></hr>
        </div>
        <button className="sign-form-continue-google">
          <FcGoogle className="google-icon" />
          Tiếp tục với Google
        </button>
      </div>
    </div>
  );
}
