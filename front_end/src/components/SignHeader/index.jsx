import logo from '../../assets/logo.png';
import './style.css'
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";

export default function SignHeader(){
    const [goToHomepage, setGoToHomepage] = React.useState(false);
    if(goToHomepage){
        return <Navigate to="/"/>
    }

    return(
        <div className="container">
            <img className="logo" src={logo} alt={logo} onClick={()=>{setGoToHomepage(true);}}></img>
            <div className="nav-signin-menu">
                <a href="#"><AiOutlineQuestionCircle/> Cần giúp đỡ</a>
                <a href="#"><AiOutlineHome/> Hệ thống cửa hàng</a>
            </div>
        </div>
    )
}