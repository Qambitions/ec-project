import "./style.css";
export function OrderCard({
  hinh_anh,
  ten_npp,
  tensp,
  so_luong_mua,
  gia_phai_tra,
}) {
  return (
    <div className="container__flex order__card">
      <img className="order__card_img" src={hinh_anh}></img>
      <div className="container__flex_col">
        <div className="container__flex">
          <small>{ten_npp}</small>
          <small>{gia_phai_tra}đ</small>
        </div>
        <small>{tensp}</small>
        <p>SL: {so_luong_mua}</p>
      </div>
    </div>
  );
}
