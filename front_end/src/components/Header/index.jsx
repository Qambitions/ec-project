import logo from '../../assets/logo.png';
import React from 'react';
import { BsCart2,BsBell,BsPersonFill } from "react-icons/bs";
import { AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import SearchBar from '../SearchBar';
import './style.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



export default function Header(){
    const [goToSignIn, setGoToSignIn] = React.useState(false);
    const [logout, setLogout] = useState(false);

    const handleLogout = () =>{
        Cookies.remove('token');
        Cookies.remove('uid');
        Cookies.remove('sdt_kh');
        Cookies.remove('tenkh');
        setLogout(true);
    }

    return(
        <div className="container header">
            <a href='/'><img className="logo" src={logo} alt={logo}></img></a>
            <SearchBar/>
            <div className="head__nav_signin_menu">
                    <a href='/'><AiOutlineQuestionCircle/>Cần giúp đỡ</a>
                    <a href='/'>< AiOutlineHome/>Hệ thống cửa hàng</a>
                    <a href='/'><BsBell/> </a>
                    <a href='/gio-hang'><BsCart2/></a>
            {Cookies.get('token') ? (          
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <div className='container__flex'>
                            <button className='user__dropdown'><BsPersonFill/></button>
                        </div>
                    </>      
                ):(                
                    <div className='container__flex' style={{columnGap:"1rem"}}>
                        <BsPersonFill style={{ fontSize:"1.5rem"}}/>
                        <div className='container__flex_col'>
                            <Link to={'/user/dang-nhap'}>Đăng nhập/</Link>
                            <Link to={'/user/dang-ky'}>Đăng ký</Link>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}