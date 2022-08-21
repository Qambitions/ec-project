import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { DatePicker } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "../../../../api/axios";

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
      <h3 className="user_dashboard_header">Thông tin tài khoản</h3>
      <hr />
      <Row>
        <Col>Image</Col>
        <Col>
          <Row>Họ tên:</Row>
          <Row>Email:</Row>
          <Row>Số điện thoại:</Row>
          <Row>Giới tính:</Row>
          <Row>Ngày sinh:</Row>
        </Col>
        <Col>
          <Row>
            <input type={"text"} placeholder={info.tenkh}></input>
          </Row>
          <Row>
            <input placeholder={info.email_kh}></input>
          </Row>
          <Row>
            <input placeholder={info.sdt_kh}></input>
          </Row>
          <Row>Giới tính:</Row>
          <Row>
            <DatePicker defaultValue={info?.ngsinh_kh} onChange={onChange} />
          </Row>
          <button>Cập nhật</button>
        </Col>
      </Row>
    </>
  );
}
