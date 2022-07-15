import logo from '../../assets/logo.png';
import './style.css'
import React from 'react';
import { Navigate } from 'react-router-dom';



export default function SignHeader(){
    const [goToHomepage, setGoToHomepage] = React.useState(false);
    if(goToHomepage){
        return <Navigate to="/"/>
    }

    return(
        <div className="container">
            <img className="logo" src={logo} alt={logo} onClick={()=>{setGoToHomepage(true);}}></img>
            <div className="nav-signin-menu">
                <a href="#"><i class="fa-regular fa-circle-question"></i> Cần giúp đỡ</a>
                <a href="#"><i class="fa-solid fa-house"></i> Hệ thống cửa hàng</a>
            </div>
        </div>
    )
}