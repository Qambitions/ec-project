import "./sidebar.css";
import {useState} from 'react';
import {MdDashboard} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BsBoxSeam, BsNewspaper} from "react-icons/bs";
import Logo from "../../assets/logo.png";
import { Link} from "react-router-dom";

export default function Sidebar() {
  const dashboard = [
    {
      name: "Main",
      logo: <MdDashboard/>,
      path: "/admin"
  },
  {
    name: "Users",
    logo: <FiUsers/>,
    path: "/admin/user"
  },
  {
    name: "Stock",
    logo: <BsBoxSeam/>,
    path: "/admin/stock"
  },
  {
    name: "Orders",
    logo: <BsNewspaper/>,
    path: "/admin/order"
  }
  
];


  return (
    <div className="sidebar">
      <Link to="/" style={{ textDecoration: "none" }} className="top">
          <img src={Logo} alt="logo" className="logo"></img>
        </Link>
      <hr />
      <div className="center">
        <ul>
        {dashboard.map((item, index) => {
          return (
            <>
            <Link to={item.path} style={{ textDecoration: "none" }}>
              <li>
                <div className="fa-3x" style={{color: "black"}}>{item.logo}</div>
                <span>{item.name}</span>
              </li>
            </Link>
            </>

          )
      })}
        </ul>
      </div>
    </div>
  );
};
