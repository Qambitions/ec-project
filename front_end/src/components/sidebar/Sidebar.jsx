import "./sidebar.css";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import {MdDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span><img src={Logo} alt="logo"  className="logo"></img></span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li>
            <MdDashboard className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          
          <p className="title">LISTS</p>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <FiUsers className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/stock" style={{ textDecoration: "none" }}>
            <li>
              <BsBoxSeam className="icon" />
              <span>Stock</span>
            </li>
          </Link>
          <Link to="/admin/order" style={{ textDecoration: "none" }}>
          <li>
            <BsNewspaper className="icon" />
            <span>Orders</span>
          </li>
          </Link>    
        </ul>
      </div>
    </div>
  );
};
