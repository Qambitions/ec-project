import "./style.css";

export function VoucherPicker() {
  const getVoucher = () => {};
  return (
    <>
      <div>
        <img
          className="checkout__aside_coupon_icon"
          src={
            "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/679938_ckfcly.png"
          }
          alt={
            "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/679938_ckfcly.png"
          }
        ></img>
        <div className="ellipse"></div>
      </div>
      <div
        className="checkout__aside_coupon checkout__picker"
        onClick={getVoucher}
      >
        <label>Voucher</label>
        <label>Chọn Voucher</label>
      </div>
    </>
  );
}
