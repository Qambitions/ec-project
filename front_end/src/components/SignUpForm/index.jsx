import "./style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const REGISTER_URL = "/account/signup";

export default function SignUpForm() {
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
    console.log(e.target);
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = validate(formValues);
    setFormErrors(res);

    console.log("error", formErrors);
    var selectedDistrict = document.getElementById("district");
    var district_id =
      selectedDistrict.options[selectedDistrict.selectedIndex].value;
    if (res.validate) {
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
        if (res.data.exitcode === 104) {
          console.log("existed");
        } else if (res.data.exitcode === 101) {
          console.log("signup failed");
        } else {
          let res = await authContext.toggleLoggin(
            formValues.email,
            formValues.confirm
          );
          console.log(res);
          // setExitCode(res);
          if (res === 0) {
            console.log("dung roi");
            navigate(from, { replace: true });
          }
        }
      } catch (error) {
        console.log("sv failed");
      }
    }
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
