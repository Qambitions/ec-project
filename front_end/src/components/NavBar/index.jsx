import { useNavigate } from "react-router-dom";
import "./style.css";

export default function NavBar(props) {
  const navigate = useNavigate();

  const handleView = (event, malh, header) => {
    console.log("alo");
    console.log(header);
    let des = `/view/${malh}`;
    navigate(des, {
      state: {
        from: header,
      },
      replace: true,
    });
  };

  return (
    <div className="nav-container">
      <div className="container navbar">
        <a className="nav_item" href="/">
          Trang chủ
        </a>
        <a className="nav_item" href="/">
          Hot deals
        </a>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, "10", "Thức ăn")}
        >
          Thức ăn
        </label>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, "11", "Mỹ phẩm và làm đẹp")}
        >
          Mỹ phẩm và làm đẹp
        </label>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, 12, "Thời trang")}
        >
          Thời trang
        </label>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, 13, "Đồ chơi")}
        >
          Đồ chơi
        </label>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, 14, "Y tế")}
        >
          Y tế
        </label>
        <label
          className="nav_item"
          onClick={(event) => handleView(event, 15, "Chuồng thú")}
        >
          Chuồng thú
        </label>
      </div>
    </div>
  );
}
