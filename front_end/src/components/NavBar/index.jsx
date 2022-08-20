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
        <a href="/">Trang chủ</a>
        <a href="/">Hot deals</a>
        <label onClick={(event) => handleView(event, "10", "Thức ăn")}>
          Thức ăn
        </label>
        <label
          onClick={(event) => handleView(event, "11", "Mỹ phẩm và làm đẹp")}
        >
          Mỹ phẩm và làm đẹp
        </label>
        <label onClick={(event) => handleView(event, 12, "Thời trang")}>
          Thời trang
        </label>
        <label onClick={(event) => handleView(event, 13, "Đồ chơi")}>
          Đồ chơi
        </label>
        <label onClick={(event) => handleView(event, 14, "Y tế")}>Y tế</label>
        <label onClick={(event) => handleView(event, 15, "Chuồng thú")}>
          Chuồng thú
        </label>
      </div>
    </div>
  );
}
