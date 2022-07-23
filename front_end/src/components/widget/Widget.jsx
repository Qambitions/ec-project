import "./widget.css";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {AiOutlineClose} from 'react-icons/ai';
export default function Widget ({ type })  {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <AiOutlineClose
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        count: 1000
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <AiOutlineClose
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        count: 1000
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <AiOutlineClose
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        count: 1000
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AiOutlineClose
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        count: 1000
      };
      break;
    default:
      break;
  }

  return (
    // <div className="widget">
    //   <div className="left">
    //     <span className="title">{data.title}</span>
    //     <span className="counter">
    //       {data.isMoney && "$"} {amount}
    //     </span>
    //     <span className="link">{data.link}</span>
    //   </div>
    //   <div className="right">
    //     <div className="percentage positive">
    //       <AiOutlineClose />
    //       {diff} %
    //     </div>
    //     {data.icon}
    //   </div>
    // </div>
    <>
    <div class="card text-white bg-primary mb-3">
      <div class="card-header">{data.title}</div>
      <div class="card-body">
        <h5 class="card-title">{data.count}</h5>
      </div>
    </div>
    </>
  );
};
