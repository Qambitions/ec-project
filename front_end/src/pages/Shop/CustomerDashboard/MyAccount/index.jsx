import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { DatePicker } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import Form from "react-bootstrap/Form";

import "./style.css";
export default function MyAccount() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [info, setInfo] = useState({});
  const fetchBasicInfo = async () => {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_GET_BASIC_INFO,
      headers: { token: Cookies.get("token") },
    });
    if (res.data.exitcode === 0) {
      setInfo(res.data.user);
    } else {
      console.log("fetch fail");
    }
  };

  useEffect(() => {
    fetchBasicInfo();
  }, []);

  return (
    <>
      <h3 className="user_dashboard_header_title">Thông tin tài khoản</h3>
      <div className="horizontal_divider"></div>
      <Row className="user_dashboard_body">
        <Col xs={2} className="user_dashboard_body_left">
          <img
            className="user_profile_avt"
            src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2423830_yxc5kd.png"
            alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2423830_yxc5kd.png"
          ></img>
          <div>
            <button className="FF8888_button">Tải ảnh lên</button>
          </div>
        </Col>
        <Col>
          <div className="vertical_divider"></div>
        </Col>
        <Col xs={9} className="user_dashboard_body_right">
          <Row>
            <Col className="address_card_col2">
              <label>Họ tên:</label>
            </Col>
            <Col xs={9}>
              <input
                className="input__bordered"
                type={"text"}
                value={info.tenkh}
              ></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              <label>Email:</label>
            </Col>
            <Col xs={9}>
              <input className="input__bordered" value={info.email_kh}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              {" "}
              <label>Số điện thoại:</label>
            </Col>
            <Col xs={9}>
              <input className="input__bordered" value={info.sdt_kh}></input>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              <label>Giới tính:</label>
            </Col>
            <Col xs={9}>
              {" "}
              <Form.Check
                className="my__address_info"
                inline
                label="Nam"
                name="gender"
                type={"radio"}
                id="male"
              />
              <Form.Check
                className="my__address_info"
                inline
                label="Nữ"
                name="gender"
                type={"radio"}
                id="female"
              />
              <Form.Check
                className="my__address_info"
                inline
                label="Khác"
                name="gender"
                type={"radio"}
                id="other-gender"
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              {" "}
              <label>Ngày sinh:</label>
            </Col>
            <Col xs={9}>
              <DatePicker defaultValue={info?.ngsinh_kh} onChange={onChange} />
            </Col>
          </Row>
          <Row>
            <br />
            <Col></Col>

            <Col xs={7}>
              <br />
              <div>
                <button className="FF5D5D_button">Cập nhật</button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
