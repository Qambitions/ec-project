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
          <small>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(gia_phai_tra)}{" "}
          </small>
        </div>
        <small>{tensp}</small>
        <p>SL: {so_luong_mua}</p>
      </div>
    </div>
  );
}
