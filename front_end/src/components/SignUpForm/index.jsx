import "./style.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  ProvinceSelector,
  DistrictSelector,
  WardSelector,
} from "../../components/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const REGISTER_URL = "/account/signup";

export default function SignUpForm() {
  const [inputType, setInputType] = useState("password");
  const [iconType, setIconType] = useState(faEye);
  const [formValues, setFormValues] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [formErrors, setFormErrors] = useState({
    fullname: "Không được để trống",
    phone: "Không được để trống",
    email: "Không được để trống",
    city: "Không được để trống",
    district: "Không được để trống",
    ward: "Không được để trống",
    address: "Không được để trống",
    pass: "Không được để trống",
    confirm: "Không được để trống",
  });
  const [errorState, setErrorState] = useState({
    fullname: "hidden",
    phone: "hidden",
    email: "hidden",
    city: "hidden",
    district: "hidden",
    ward: "hidden",
    address: "hidden",
    pass: "hidden",
    confirm: "hidden",
  });

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
    console.log(`'province_id=${id}'`);
    await axios({
      url: process.env.REACT_APP_GET_DISTRICTS_URL,
      method: "GET",
      headers: {
        token: process.env.REACT_APP_GET_ADDRESS_TOKEN,
      },
      params: { province_id: id },
    }).then((res) => {
      console.log(res.data.data);
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
      console.log(res.data.data);
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

  const handleSelectProvince = () => {
    var select = document.getElementById("province");
    var option = select.options[select.selectedIndex].value;
    fetchDistrict(option);
  };

  const handleSelectDistrict = () => {
    var select = document.getElementById("district");
    var option = select.options[select.selectedIndex].value;
    fetchWard(option);
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  useEffect(() => {}, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    var selectedDistrict = document.getElementById("district");
    var district_id =
      selectedDistrict.options[selectedDistrict.selectedIndex].value;
    e.preventDefault();
    if (formErrors.validate) {
      try {
        const res = await axios.post(REGISTER_URL, {
          tenkh: formValues.fullname,
          email_kh: formValues.email,
          sdt_kh: formValues.phone,
          mat_khau: formValues.pass,
          so_nha_duong: formValues.address,
          phuong_xa: formValues.ward,
          quan_tp: formValues.district,
          tp_tinh: formValues.city,
          districtid: district_id,
        });
        console.log("CALL SIGNUP");
        console.log(JSON.stringify(res?.data));
      } catch (error) {}
    }
  };

  const validate = (values) => {
    const errors = {};
    const states = {};
    errors.validate = true;
    if (values.fullname) {
      states.fullname = "hidden";
    }
    if (values.phone) {
      if (!PHONE_REGEX.test(values.phone)) {
        errors.phone = "Số điện thoại không hợp lệ!";
      } else {
        states.phone = "hidden";
      }
    }
    if (values.email) {
      if (!MAIL_REGEX.test(values.email)) {
        errors.email = "Email không hợp lệ!";
      } else {
        states.email = "hidden";
      }
    }
    if (values.city) {
      states.city = "hidden";
    }
    if (values.district) {
      states.district = "hidden";
    }
    if (values.ward) {
      states.ward = "hidden";
    }
    if (values.address) {
      states.address = "hidden";
    }
    if (values.pass) {
      if (!PWD_REGEX.test(values.pass)) {
        errors.pass =
          "Yêu cầu 8-24 ký tự bao gồm chữ, số, ký tự đặc biệt, chữ cái in hoa!! ";
      } else {
        states.pass = "hidden";
      }
    }
    if (values.confirm) {
      if (values.confirm !== values.pass) {
        errors.confirm = "Không khớp mật khẩu!!";
      } else {
        states.confirm = "hidden";
      }
    }
    return { states, errors };
  };

  return (
    <div className="container signin-body">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>
        <div className="signup__section_1">
          <div className="signup-input-container">
            <input
              placeholder="Họ và tên"
              name="fullname"
              value={formValues.fullname}
              onChange={handleChange}
            ></input>
          </div>
          <div
            className="error_message_container"
            style={{ visibility: errorState.fullname }}
          >
            <small>{formErrors.fullname}</small>
          </div>
          <div className="signup-input-container">
            <input
              placeholder="Số điện thoại"
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            ></input>
          </div>
          <div
            className="error_message_container"
            style={{ visibility: errorState.phone }}
          >
            <small>{formErrors.phone}</small>
          </div>
          <div className="signup-input-container">
            <input
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            ></input>
          </div>
          <div
            className="error_message_container"
            style={{ visibility: errorState.email }}
          >
            <small>{formErrors.email}</small>
          </div>
        </div>
        <div className="signup__section_2 container__flex">
          <div className="signup__section_2_col">
            <div className="signup-input-container">
              <select
                className="signup-form-input-2"
                name="city"
                value={formValues.city}
                onChange={handleSelectProvince}
                id="province"
              >
                <option value="" disabled selected hidden>
                  Tỉnh/ Thành phố
                </option>
                {provinces.map((item) => (
                  <ProvinceSelector key={item.ProvinceID} obj={item} />
                ))}
              </select>
            </div>
            <div
              className="error_message_container"
              style={{ visibility: errorState.city }}
            >
              <small>{formErrors.city}</small>
            </div>
            <div className="signup-input-container">
              <select
                className="signup-form-input-2"
                name="ward"
                value={formValues.ward}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Phường/ Xã
                </option>
                {wards.map((item, index) => (
                  <WardSelector key={index} obj={item} />
                ))}
              </select>
            </div>
            <div
              className="error_message_container"
              style={{ visibility: errorState.ward }}
            >
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
            <div
              className="error_message_container"
              style={{ visibility: errorState.pass }}
            >
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
                {districts.map((item, index) => (
                  <DistrictSelector key={index} obj={item} />
                ))}
              </select>
            </div>
            <div
              className="error_message_container"
              style={{ visibility: errorState.district }}
            >
              <small>{formErrors.district}</small>
            </div>
            <div className="signup-input-container">
              <input
                placeholder="Địa chỉ cụ thể"
                name="address"
                value={formValues.address}
                onChange={handleChange}
              ></input>
            </div>
            <div
              className="error_message_container"
              style={{ visibility: errorState.address }}
            >
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
            <div
              className="error_message_container"
              style={{ visibility: errorState.confirm }}
            >
              <small>{formErrors.confirm}</small>
            </div>
          </div>
        </div>
        <div className="signup-form-else">
          <Link to="/user/dang-nhap">
            <span>Đã có tài khoản? </span>Đăng nhập
          </Link>
        </div>
        <button className="btn signin-form-signbutton"> Đăng ký</button>
        <div className="divider">
          <hr className="line"></hr>
          <p>Hoặc</p>
          <hr className="line"></hr>
        </div>
        <button className="btn sign-form-continue-google">
          <FcGoogle />
          Tiếp tục với Google
        </button>
      </form>
    </div>
  );
}
