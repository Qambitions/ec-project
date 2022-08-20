import { useContext, useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { decrypt10 } from "../../utils/crypto";
import { callAutoLoginAPI } from "../../utils/auth";
import axios from "../../api/axios";


const RequireAuth = ({ allowedRoles }) => {
  const authContext = useContext(AuthContext);
  const [isAuthenticated, setisAuthenticated] = useState()
  const location = useLocation();
  let time = Cookies.get("login_time")
  let token_u = Cookies.get("token_u")
  let decrypted = decrypt10(token_u,time);
  let roles =[];
  var user=null;

  const autoLogin= ()=>{
    axios({})
  }

  let user_info = localStorage.getItem("account_info")
  if(localStorage?.getItem("account_info")){
    user = 'authenticated'
  }

  if (decrypted===process.env.REACT_APP_ADMIN_KEY) {
      roles.push(process.env.REACT_APP_ROLE_ADMIN)
  } else if (decrypted===process.env.REACT_APP_USER_KEY){
      roles.push(process.env.REACT_APP_ROLE_USER)
  }
  
  return roles?.find((role) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} />
  ) : (
    <Navigate to="/user/dang-nhap" state={{ from: location }}/>
  );
};

export default RequireAuth;
