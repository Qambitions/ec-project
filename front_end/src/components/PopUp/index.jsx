import "./style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../../api/axios";
import { useState } from "react";

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
      className="loading_popup"
    >
      <img
        className="loading_icon"
        src="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655547531/Huimitu-Logo-Final_zakn2y.png"
        alt="https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655547531/Huimitu-Logo-Final_zakn2y.png"
      ></img>
    </Modal>
  );
}

function EditAddress(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

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
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm địa chỉ mới
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <input placeholder="Họ và tên"></input>
          <input placeholder="Số điện thoại"></input>
          <input placeholder="xã"></input>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export {
  ConfirmRemoveItemPopUp,
  VoucherPickerPopUp,
  MyVerticallyCenteredModal,
  LoadingOverlay,
  EditAddress,
};
