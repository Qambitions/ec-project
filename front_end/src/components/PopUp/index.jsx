import "./style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../../api/axios";
import { useState } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useEffect } from "react";
import Cookies from "js-cookie";

function ConfirmRemoveItemPopUp(props) {
  return (
    <>
      <div className="popup__background">
        <div className="popup__container">
          <div>
            <h5>Xóa sản phẩm</h5>
            <p>Bạn có muốn xóa sản phẩm đang chọn?</p>
          </div>
          <div>
            <button onClick={props.handleConfirm}>Xác nhận</button>
            <button onClick={props.handleClose}>Hủy</button>
          </div>
        </div>
      </div>
    </>
  );
}

function VoucherPickerPopUp(props) {
  return (
    <>
      <div className="popup__background">
        <div className="popup__container">
          <div>
            <h5>Xóa sản phẩm</h5>
            <p>Bạn có muốn xóa sản phẩm đang chọn?</p>
          </div>
          <div>
            <button onClick={props.handleConfirm}>Xác nhận</button>
            <button onClick={props.handleClose}>Hủy</button>
          </div>
        </div>
      </div>
    </>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
}

function LoadingOverlay(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      enforceFocus
      className="loading_popup"
    >
      <img
        className="loading_icon"
        src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1661233171/icon/Huimitu-final-v4_kmvvtd.png"
        alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1661233171/icon/Huimitu-final-v4_kmvvtd.png"
      ></img>
      <img
        className="bell_icon"
        src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1661246494/icon/Huimitu-final-v4-chuong_ilbsc6.png"
        alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1661246494/icon/Huimitu-final-v4-chuong_ilbsc6.png"
      ></img>
    </Modal>
  );
}

function SignupSuccessPopup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      enforceFocus
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          "ĐĂNG KÝ THÀNH CÔNG"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a href="/user/dang-nhap">Đăng nhập ngay</a>
      </Modal.Body>
    </Modal>
  );
}

function EditAddress(props) {
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [address, setAddress] = useState({
    province: "",
    ward: "",
    district: "",
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

  const handleSelectProvince = (e) => {
    setFormErrors({ ...formErrors, [e.target.name]: null });
    var select = document.getElementById("new-address-city");
    var option = select.options[select.selectedIndex].value;
    fetchDistrict(option);
    setAddress((prevState) => {
      return { ...prevState, province: option };
    });
  };

  const handleSelectDistrict = (e) => {
    setFormErrors({ ...formErrors, [e.target.name]: null });
    var select = document.getElementById("new-address-district");
    var option = select.options[select.selectedIndex].value;
    fetchWard(option);
    setAddress((prevState) => {
      return { ...prevState, district: option };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    var cities = document.getElementById("new-address-city");
    var selectedCity = cities.options[cities.selectedIndex].text;

    var districts = document.getElementById("new-address-district");
    var districtId = districts.value;
    var selectedDistrict = districts.options[districts.selectedIndex].text;

    var wards = document.getElementById("new-address-ward");
    var selectedWard = wards.options[wards.selectedIndex].text;

    const error = {};
    let flag = true;
    if (!name.value) {
      flag = false;
      error.name = "Không được để trống";
    }
    if (!phone.value) {
      flag = false;
      error.phone = "Không được để trống";
    }
    if (!cities.value) {
      flag = false;
      error.province = "Không được để trống";
    }
    if (!districtId) {
      flag = false;
      error.district = "Không được để trống";
    }

    if (!wards.value) {
      flag = false;
      error.ward = "Không được để trống";
    }

    if (!addressDetail) {
      flag = false;
      error.detail = "Không được để trống";
    }
    if (flag === false) {
      setFormErrors(error);
      return;
    }

    await axios({
      url: "/account/add_new_address",
      method: "post",
      headers: { token: Cookies.get("token") },
      data: {
        districtid: districtId,
        so_nha_duong: addressDetail,
        phuong_xa: selectedWard,
        quan_tp: selectedDistrict,
        tp_tinh: selectedCity,
      },
    }).then((res) => {
      setMessage(res.data.message);
      setModalShow(true);
    });
  }

  useEffect(() => {
    fetchProvince();
  }, [modalShow]);

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        title={"Thông báo"}
        body={message}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="add_address_form"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#DA4141" }}
          >
            Thêm địa chỉ mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <Row className="justify-content-md-center">
              <input
                className="input__bordered"
                placeholder="Họ và tên"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormErrors({ ...formErrors, [e.target.name]: null });
                }}
              ></input>{" "}
              <div className="input_error" style={{ width: "65%" }}>
                {formErrors.name}
              </div>
            </Row>

            <br />
            <Row className="justify-content-md-center">
              <input
                type="number"
                className="input__bordered"
                placeholder="Số điện thoại"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormErrors({ ...formErrors, [e.target.name]: null });
                }}
              ></input>
              <div className="input_error" style={{ width: "65%" }}>
                {formErrors.phone}
              </div>
            </Row>
            <br /> */}
            <Row
              className="justify-content-md-center half_half_input"
              style={{ width: "70%" }}
            >
              <Col xs={6}>
                <select
                  value={address.province}
                  name="province"
                  onChange={(e) => {
                    handleSelectProvince(e);
                  }}
                  className="input__half"
                  id="new-address-city"
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
                <div className="input_error" style={{ width: "65%" }}>
                  {formErrors.province}
                </div>
                <select
                  value={address.ward}
                  name="ward"
                  onChange={(e) => {
                    setAddress((prevState) => {
                      return { ...prevState, ward: e.target.value };
                    });
                    setFormErrors({ ...formErrors, [e.target.name]: null });
                  }}
                  className="input__half"
                  id="new-address-ward"
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
                <div className="input_error" style={{ width: "65%" }}>
                  {formErrors.ward}
                </div>
                {/* <input type={"checkbox"}></input>
                <label style={{ marginLeft: "0.5rem" }}>
                  {" "}
                  Đặt làm mặc định
                </label> */}
              </Col>
              <Col xs={6}>
                <select
                  value={address.district}
                  name="district"
                  onChange={(e) => {
                    handleSelectDistrict(e);
                  }}
                  className="input__half"
                  id="new-address-district"
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
                <div className="input_error" style={{ width: "65%" }}>
                  {formErrors.district}
                </div>
                <input
                  className="input__half"
                  placeholder="Sô nhà, đường"
                  value={addressDetail}
                  name="detail"
                  onChange={(e) => {
                    setAddressDetail(e.target.value);
                    setFormErrors({ ...formErrors, [e.target.name]: null });
                  }}
                ></input>
                <div className="input_error">{formErrors.detail}</div>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-md-center">
              <Col xs lg="2"></Col>
              <Col md="auto">
                <button
                  className="FF5D5D_button"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Đồng ý
                </button>
              </Col>
              <Col xs lg="2"></Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export {
  ConfirmRemoveItemPopUp,
  VoucherPickerPopUp,
  MyVerticallyCenteredModal,
  LoadingOverlay,
  EditAddress,
  SignupSuccessPopup,
};
