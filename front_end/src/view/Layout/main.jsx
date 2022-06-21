import logo from '../../assets/logo.png';
import {Link, Navigate} from 'react-router-dom'
import React from 'react';
import { BsCart2,BsBell,BsHouseDoor,BsPersonFill } from "react-icons/bs";

export default function Header(){
    const [goToSignIn, setGoToSignIn] = React.useState(false);
    if(goToSignIn){
        return <Navigate to="/user/dang-nhap"/>
    }

    return(
        <div className="container signin-head">
            <a href="#"><img className="logo" src={logo} alt={logo}></img></a>
            <div className="nav-signin-menu">
                <a><BsHouseDoor/></a>
                <a><BsBell/></a>
                <a><BsCart2/></a>
                <a onClick={()=>{setGoToSignIn(true);}}><BsPersonFill/>Đăng nhập/ Đăng ký</a>
            </div>
        </div>
    )
}