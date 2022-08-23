import "./style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

import {
  LoadingOverlay,
  SignupSuccessPopup,
  MyVerticallyCenteredModal,
} from "../PopUp";


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const REGISTER_URL = "/account/signup";

export default function SignUpForm() {
  const [modalShow, setModalShow] = useState(false);
  const [modalSuccessShow, setModalSuccessShow] = useState(false);
  const [modalLoadShow, setModalLoadShow] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const [inputType, setInputType] = useState("password");
  const [iconType, setIconType] = useState(faEye);
  const [formValues, setFormValues] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const fetchProvince = async () => {
    await axios({
      url: process.env.REACT_APP_GET_PROVINCES_URL,
      method: "GET",
      headers: {
        token: process.env.REACT_APP_GET_ADDRESS_TOKEN,
      },
    }).then((res) => {
      setProvinces(res.data.data);
    });
  };

  const fetchDistrict = async (id) => {
    await axios({
      url: process.env.REACT_APP_GET_DISTRICTS_URL,
      method: "GET",
      headers: {
        token: process.env.REACT_APP_GET_ADDRESS_TOKEN,
      },
      params: { province_id: id },
    }).then((res) => {
      setDistricts(res.data.data);
    });
  };

  const fetchWard = async (id) => {
    await axios({
      url: process.env.REACT_APP_GET_WARDS_URL,
      method: "GET",
      headers: {
        token: process.env.REACT_APP_GET_ADDRESS_TOKEN,
      },
      params: { district_id: id },
    }).then((res) => {
      setWards(res.data.data);
    });
  };

  const handleToggle = () => {
    if (inputType === "password") {
      setIconType(faEye);
      setInputType("text");
    } else {
      setIconType(faEyeSlash);
      setInputType("password");
    }
  };

  const handleSelectProvince = (e) => {
    handleChange(e);
    var select = document.getElementById("city");
    var option = select.options[select.selectedIndex].value;
    fetchDistrict(option);
  };

  const handleSelectDistrict = (e) => {
    handleChange(e);
    var select = document.getElementById("district");
    var option = select.options[select.selectedIndex].value;
    fetchWard(option);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };
  const handleSubmit = async (e) => {
    setModalLoadShow(true);
    e.preventDefault();

    let res = validate(formValues);
    setFormErrors(res);

    var wards = document.getElementById("ward");
    var selectedWard = wards.options[wards.selectedIndex].text;

    var districts = document.getElementById("district");
    var districtId = districts.value;
    var selectedDistrict = districts.options[districts.selectedIndex].text;

    var citys = document.getElementById("city");
    var selectedCity = citys.options[citys.selectedIndex].text;

    if (res.validate) {
      try {
        const res = await axios.post(REGISTER_URL, {
          tenkh: formValues.fullname,
          email_kh: formValues.email,
          sdt_kh: formValues.phone,
          mat_khau: formValues.pass,
          so_nha_duong: formValues.address,
          phuong_xa: selectedWard,
          quan_tp: selectedDistrict,
          tp_tinh: selectedCity,
          districtid: districtId,
        });
        setErrorMess(res.data.message);
        setModalLoadShow(false);
        if (res.data.exitcode === 104) {
          console.log("existed");
          setModalShow(true);
        } else if (res.data.exitcode === 101) {
          console.log("signup failed");
          setModalShow(true);
        } else if (res.data.exitcode === 0) {
          setModalSuccessShow(true);
        }
      } catch (error) {
        console.log("sv failed");
      }
    }

    setTimeout(1000);
  };

  const validate = (values) => {
    const errors = {};
    errors.validate = true;
    if (!values.fullname) {
      errors.fullname = "Không được để trống";
      errors.validate = false;
    }
    if (!values.phone) {
      errors.phone = "Không được để trống";
      errors.validate = false;
    } else if (!PHONE_REGEX.test(values.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
      errors.validate = false;
    }
    if (!values.email) {
      errors.email = "Không được để trống";
      errors.validate = false;
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Email không hợp lệ!";
      errors.validate = false;
    }
    if (!values.city) {
      errors.city = "Không được để trống";
      errors.validate = false;
    }
    if (!values.district) {
      errors.district = "Không được để trống";
      errors.validate = false;
    }
    if (!values.ward) {
      errors.ward = "Không được để trống";
      errors.validate = false;
    }
    if (!values.address) {
      errors.address = "Không được để trống";
      errors.validate = false;
    }
    if (!values.pass) {
      errors.pass = "Không được để trống";
      errors.validate = false;
    } else if (!PWD_REGEX.test(values.pass)) {
      errors.pass =
        "Yêu cầu mật khẩu: 8-24 ký tự bao gồm chữ, số, ký tự đặc biệt, chữ cái in hoa!";
      errors.validate = false;
    }
    if (!values.confirm) {
      errors.confirm = "Không được để trống";
      errors.validate = false;
    } else if (!(values.pass === values.confirm)) {
      errors.confirm = "Không khớp mật khẩu!";
      errors.validate = false;
    }
    return errors;
  };

  return (
    <div className="container signin-body">
      <SignupSuccessPopup
        show={modalSuccessShow}
        onHide={() => setModalSuccessShow(false)}
      />
      <LoadingOverlay
        show={modalLoadShow}
        onHide={() => setModalLoadShow(false)}
      />
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <div className="signup__section_1">
          <div className="signup-input-container">
            <input
              id="fullname"
              placeholder="Họ và tên"
              name="fullname"
              value={formValues.fullname}
              onChange={handleChange}
            ></input>
          </div>
          <div className="error_message_container">
            <small>{formErrors.fullname}</small>
          </div>
          <div className="signup-input-container">
            <input
              id="phone"
              placeholder="Số điện thoại"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            ></input>
          </div>
          <div className="error_message_container">
            <small>{formErrors.phone}</small>
          </div>
          <div className="signup-input-container">
            <input
              id="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="error_message_container">
            <small>{formErrors.email}</small>
          </div>
        </div>
        <div className="signup__section_2 container__flex">
          <div className="signup__section_2_col">
            <div className="signup-input-container">
              <select
                id="city"
                className="signup-form-input-2"
                name="city"
                value={formValues.city}
                onChange={handleSelectProvince}
              >
                <option value="" disabled selected hidden>
                  Tỉnh/ Thành phố
                </option>
                {provinces.map((item) => (
                  <option key={item.ProvinceID} value={item.ProvinceID}>
                    {item.ProvinceName}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="error_message_container">
              <small>{formErrors.city}</small>
            </div>
            <div className="signup-input-container">
              <select
                className="signup-form-input-2"
                name="ward"
                value={formValues.ward}
                onChange={handleChange}
                id="ward"
              >
                <option value="" disabled selected hidden>
                  Phường/ Xã
                </option>
                {wards.map((item) => (
                  <option key={item.WardCode} value={item.WardCode}>
                    {item.WardName}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="error_message_container">
              <small>{formErrors.ward}</small>
            </div>
            <div className="signup-input-container">
              <input
                placeholder="Mật khẩu"
                name="pass"
                type={inputType}
                value={formValues.pass}
                onChange={handleChange}
              ></input>
            </div>
            <div className="error_message_container">
              <small>{formErrors.pass}</small>
            </div>
          </div>
          <div className="signup__section_2_col">
            <div className="signup-input-container">
              <select
                className="signup-form-input-2"
                name="district"
                id="district"
                value={formValues.district}
                onChange={handleSelectDistrict}
              >
                <option value="" disabled selected hidden>
                  Quận/ Huyện
                </option>
                {districts.map((item) => (
                  <option key={item.DistrictID} value={item.DistrictID}>
                    {item.DistrictName}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div className="error_message_container">
              <small>{formErrors.district}</small>
            </div>
            <div className="signup-input-container">
              <input
                placeholder="Địa chỉ cụ thể"
                name="address"
                id="address"
                value={formValues.address}
                onChange={handleChange}
              ></input>
            </div>
            <div className="error_message_container">
              <small>{formErrors.address}</small>
            </div>
            <div className="signup-input-container">
              <input
                placeholder="Nhập lại mật khẩu"
                name="confirm"
                type={inputType}
                value={formValues.confirm}
                onChange={handleChange}
              ></input>
              <FontAwesomeIcon
                className="eye"
                icon={iconType}
                onClick={handleToggle}
              />
            </div>
            <div className="error_message_container">
              <small>{formErrors.confirm}</small>
            </div>
          </div>
        </div>
        <div className="signup-form-else">
          <Link to="/user/dang-nhap">
            <span>Đã có tài khoản? </span>Đăng nhập
          </Link>
        </div>
        <button className="FF5D5D_button"> Đăng ký</button>
        <div className="divider">
          <hr className="line"></hr>
          <p>Hoặc</p>
          <hr className="line"></hr>
        </div>
        <button className="sign-form-continue-google">
          <FcGoogle />
          Tiếp tục với Google
        </button>
      </form>
      <MyVerticallyCenteredModal
        title={"Đăng ký"}
        body={errorMess}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
