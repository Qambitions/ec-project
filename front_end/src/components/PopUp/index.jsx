import "./style.css";

function ConfirmPopUp(props) {
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

export { ConfirmPopUp };
