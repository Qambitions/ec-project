import { RiCoupon2Line } from "react-icons/ri";
import "./style.css";
import VoucherCard from "./VoucherCard";
import { RiCloseFill } from "react-icons/ri";

export default function VoucherPopUp(props) {
  return (
    <div className="voucher__popup">
      <div className="voucher__input">
        <h4>Voucher Khuyến mãi</h4>
        <RiCloseFill onClick={props.close} />
      </div>

      <div className="voucher__input">
        <div className="voucher__input_container">
          <RiCoupon2Line></RiCoupon2Line>
          <input placeholder="Nhập mã Voucher"></input>
        </div>
        <button>Áp dụng</button>
      </div>
      <div className="voucher__body_title">
        <label>Voucher hiện có</label>
        <label>Có chọn tối đa: 1</label>
      </div>
      <VoucherCard />
      <VoucherCard />

      <button className="voucher__button_agree button_pink">Đồng ý</button>
    </div>
  );
}
