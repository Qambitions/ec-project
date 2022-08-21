import "./style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export {
  ConfirmRemoveItemPopUp,
  VoucherPickerPopUp,
  MyVerticallyCenteredModal,
};
