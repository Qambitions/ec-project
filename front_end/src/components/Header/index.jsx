import logo from "../../assets/logo.png";
import React, { useEffect } from "react";
import { BsCart2, BsBell, BsPersonFill } from "react-icons/bs";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import SearchBar from "../SearchBar";
import "./style.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../CustomDropDownToggle/customDropDownToggle";
import Cookies from "js-cookie";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggedState, setLoggedState] = useState();
  const [show, setShow] = useState(true);
  const toggleLogout = () => {
    setLoggedState();
    authContext.toggleLogout();
  };

  const toggleMyAccount = () => {
    navigate("/user/account", { replace: true });
  };

  const toggleMyorder = () => {
    navigate("/user/myorder", { replace: true });
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      setLoggedState(Cookies.get("token"));
    }
  }, []);

  return (
    <div className="container header">
      <Link to="/">
        <img className="logo" src={logo} alt={logo}></img>
      </Link>
      <SearchBar />
      <div className="head__nav_signin_menu">
        <Link to="/">
          <AiOutlineQuestionCircle />
          Cần giúp đỡ
        </Link>
        <Link to="/">
          <AiOutlineHome />
          Hệ thống cửa hàng
        </Link>
        <Link to="/">
          <BsBell />{" "}
        </Link>
        <Link to="/user/cart">
          <BsCart2 />
        </Link>
        <ToastContainer className="add_cart_toats">
          <Toast onClose={() => setShow(false)} show={show} delay={3000}>
            <Toast.Header>
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>
              Woohoo, you're reading this text in a Toast!
            </Toast.Body>
          </Toast>
        </ToastContainer>
        {loggedState ? (
          <Dropdown align="end">
            <Dropdown.Toggle
              as={CustomToggle}
              id="dropdown-custom-components"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onClick={toggleMyAccount}>
                Tài khoản của tôi
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={toggleMyorder}>
                Đơn hàng của tôi
              </Dropdown.Item>
              <Dropdown.Item eventKey="3" onClick={toggleLogout}>
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="container__flex" style={{ columnGap: "1rem" }}>
            <BsPersonFill style={{ fontSize: "1.5rem" }} />
            <div className="container__flex_col">
              <Link to={"/user/dang-nhap"}>Đăng nhập/</Link>
              <Link to={"/user/dang-ky"}>Đăng ký</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
