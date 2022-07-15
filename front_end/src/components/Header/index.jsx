import logo from '../../assets/logo.png';
import {Navigate, Link} from 'react-router-dom'
import React from 'react';
import { BsCart2,BsBell,BsHouseDoor,BsPersonFill,BsQuestionCircle} from "react-icons/bs";
import SearchBar from '../SearchBar';
import './style.css'



export default function Header(){
    const [goToSignIn, setGoToSignIn] = React.useState(false);
    if(goToSignIn){
        return <Navigate to="/user/dang-nhap"/>
    }

    return(
        <div className="container">
            <img className="logo" src={logo} alt={logo}></img>
            <SearchBar/>
            <div className="head__nav_signin_menu">
                <a href='/'><BsQuestionCircle/>Cần giúp đỡ</a>
                <a href='/'><BsHouseDoor/>Hệ thống cửa hàng</a>
                <div><BsBell/></div>
                <a href='/gio-hang'><BsCart2/></a>
                <a href="#ptt"onClick={()=>{setGoToSignIn(true);}}>
                    <div className='container__flex'>
                        <BsPersonFill/>
                        <div className='container__flex_col'>
                            <label>Đăng nhập/</label>
                            <label>Đăng ký</label>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}