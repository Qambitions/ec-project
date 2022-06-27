import logo from '../../assets/logo.png';
import {Navigate} from 'react-router-dom'
import React from 'react';
import { BsCart2,BsBell,BsHouseDoor,BsPersonFill} from "react-icons/bs";
import SearchBar from '../SearchBar';

export default function Header(){
    const [goToSignIn, setGoToSignIn] = React.useState(false);
    if(goToSignIn){
        return <Navigate to="/user/dang-nhap"/>
    }

    return(
        <div className="container">
            <img className="logo" src={logo} alt={logo}></img>
            <SearchBar/>
            <div className="nav-signin-menu">
                <BsHouseDoor/>
                <BsBell/>
                <BsCart2/>
                <a href="#ptt"onClick={()=>{setGoToSignIn(true);}}><BsPersonFill/>Đăng nhập/ Đăng ký</a>
            </div>
        </div>
    )
}