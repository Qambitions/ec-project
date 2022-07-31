import "./sidebar.css";
import {useState} from 'react';
import {MdDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
import Logo from "../../assets/logo.png";
import { Link} from "react-router-dom";
import {Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick =() => {
    setIsActive(!isActive);}

  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }} className="top">
          <img src={Logo} alt="logo" className="logo"></img>
        </Link>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
          <li>
            <MdDashboard className="fa-3x" style={{color: "black"}}/>
            <span>Dashboard</span>
          </li>
          </Link>
          
          <p className="title">LISTS</p>
          <Link to="/admin/user" style={{ textDecoration: "none" }}>
            <li>
              <FiUsers className="fa-3x" style={{color: "black"}}/>
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/stock" style={{ textDecoration: "none" }}>
            <li>
              <BsBoxSeam className="fa-3x" style={{color: "black"}}/>
              <span>Stock</span>
            </li>
          </Link>
          <Link to="/admin/order" style={{ textDecoration: "none" }}>
          <li>
            <BsNewspaper className="fa-3x" style={{color: "black"}}/>
            <span>Orders</span>
          </li>
          </Link>    
        </ul>
      </div>
    </div>
  );
};
