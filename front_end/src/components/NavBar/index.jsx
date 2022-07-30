import "./style.css";

export default function NavBar(props) {
  return (
    <div className="nav-container">
      <div className="container navbar">
        <a href="/">Trang chủ</a>
        <a href="/">Hot deals</a>
        <a href="/view/10">Thức ăn</a>
        <a href="/view/11">Mỹ phẩm và làm đẹp</a>
        <a href="/view/12">Thời trang</a>
        <a href="/view/13">Đồ chơi</a>
        <a href="/view/14">Y tế</a>
        <a href="/view/15">Chuồng thú</a>
      </div>
    </div>
  );
}
