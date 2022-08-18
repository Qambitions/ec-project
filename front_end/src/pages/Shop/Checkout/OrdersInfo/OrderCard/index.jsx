import "./style.css";
export function OrderCard({
  hinh_anh,
  ten_npp,
  tensp,
  so_luong_mua,
  gia_phai_tra,
}) {
  return (
    <div className="order__card">
      <img className="order__card_img" src={hinh_anh}></img>
      <div className="card_info">
        <div className="card_info_head">
          <small>{ten_npp}</small>
          <small>{gia_phai_tra} <span className="currency">đ</span></small>
        </div>
        <small>{tensp}</small>
        <p>SL: {so_luong_mua}</p>
      </div>
    </div>
  );
}
