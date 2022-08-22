import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "../../../../api/axios";
import Cookies from "js-cookie";
import { MyVerticallyCenteredModal } from "../../../../components/PopUp";

export default function MyPassword() {
  const [mess, setMess] = useState("go");
  const [modalShow, setModalShow] = useState(false);
  const [currPass, setCurrPass] = useState({
    iconType: faEyeSlash,
    inputType: "password",
    value: "",
  });
  const [newPass, setNewPass] = useState({
    iconType: faEyeSlash,
    inputType: "password",
    value: "",
  });
  const [confirm, setConfirm] = useState({
    iconType: faEyeSlash,
    inputType: "password",
    value: "",
  });
  const callChangePass = async () => {
    let flag = true;
    if (!currPass.value) {
      flag = false;
    }
    if (!newPass.value) {
      flag = false;
    }
    if (!confirm.value) {
      flag = false;
    }
    if (confirm.value != newPass.value) {
      flag = false;
    }
    if (flag === false) {
      return;
    }
    console.log("cur", currPass);
    console.log("new", newPass);
    let res = await axios({
      method: "post",
      url: "/account/change_password",
      headers: { token: Cookies.get("token") },
      data: {
        mat_khau_cu: currPass.value,
        mat_khau_moi: newPass.value,
      },
    });
    setMess(res.data.message);
    setModalShow(true);
    if (res.data.exitcode === 0) {
      setConfirm({
        iconType: faEyeSlash,
        inputType: "password",
        value: "",
      });
      setNewPass({
        iconType: faEyeSlash,
        inputType: "password",
        value: "",
      });
      setCurrPass({
        iconType: faEyeSlash,
        inputType: "password",
        value: "",
      });
    }
  };

  const revealCurrPass = () => {
    if (currPass.inputType === "password") {
      setCurrPass((prevState) => {
        return { ...prevState, iconType: faEye, inputType: "text" };
      });
    } else {
      setCurrPass((prevState) => {
        return { ...prevState, iconType: faEyeSlash, inputType: "password" };
      });
    }
  };

  const revealNewPass = () => {
    if (newPass.inputType === "password") {
      setNewPass((prevState) => {
        return { ...prevState, iconType: faEye, inputType: "text" };
      });
    } else {
      setNewPass((prevState) => {
        return { ...prevState, iconType: faEyeSlash, inputType: "password" };
      });
    }
  };

  const revealConfirm = () => {
    if (confirm.inputType === "password") {
      setConfirm((prevState) => {
        return { ...prevState, iconType: faEye, inputType: "text" };
      });
    } else {
      setConfirm((prevState) => {
        return { ...prevState, iconType: faEyeSlash, inputType: "password" };
      });
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        title={mess}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <h3 className="user_dashboard_header">Thay đổi mật khẩu</h3>
      <div className="horizontal_divider"></div>
      <Row className="user_dashboard_body">
        <Col xs={2} className="user_dashboard_body_left"></Col>
        <Col xs={9} className="user_dashboard_body_right">
          <Row>
            <Col className="address_card_col2">
              <label>Mật khẩu hiện tại:</label>
            </Col>
            <Col xs={9}>
              <input
                className="input__bordered"
                type={currPass.inputType}
                value={currPass.value}
                onChange={(e) => {
                  setCurrPass((prevState) => {
                    return { ...prevState, value: e.target.value };
                  });
                }}
              ></input>

              <FontAwesomeIcon
                className="eye"
                icon={currPass.iconType}
                onClick={revealCurrPass}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              <label>Mật khẩu mới:</label>
            </Col>
            <Col xs={9}>
              <input
                className="input__bordered"
                type={newPass.inputType}
                value={newPass.value}
                onChange={(e) => {
                  setNewPass((prevState) => {
                    return { ...prevState, value: e.target.value };
                  });
                }}
              ></input>
              <FontAwesomeIcon
                className="eye"
                icon={newPass.iconType}
                onClick={revealNewPass}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="address_card_col2">
              {" "}
              <label>Xác nhận mật khẩu:</label>
            </Col>
            <Col xs={9}>
              <input
                className="input__bordered"
                type={confirm.inputType}
                value={confirm.value}
                onChange={(e) => {
                  setConfirm((prevState) => {
                    return { ...prevState, value: e.target.value };
                  });
                }}
              ></input>
              <FontAwesomeIcon
                className="eye"
                icon={confirm.iconType}
                onClick={revealConfirm}
              />
            </Col>
          </Row>
          <br />
          <Col></Col>
          <Row>
            <br />
            <Col></Col>

            <Col xs={8}>
              <br />
              <div>
                <button className="FF5D5D_button" onClick={callChangePass}>
                  Cập nhật
                </button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
