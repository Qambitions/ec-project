import './style.css'
import { Link } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc";
import Selector from "../../components/Selector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'

import React from 'react';
import { useState } from 'react';

export default function SignUpForm(){
    const [inputType, setInputType]=useState('password');
    const [iconType, setIconType]=useState(faEye);
    const handleToggle=()=>{
        if(inputType==='password'){
            setIconType(faEye);
            setInputType('text');
        }
        else{
            setIconType(faEyeSlash);
            setInputType('password');
        }
    }

    const [inputTypeCf, setInputTypeCf]=useState('password');
    const [iconTypeCf, setIconTypeCf]=useState(faEye);
    const handleToggleCf=()=>{
        if(inputType==='password'){
            setIconTypeCf(faEye);
            setInputTypeCf('text');
        }
        else{
            setIconTypeCf(faEyeSlash);
            setInputTypeCf('password');
        }
    }

    const provinces=[
        {
            id: 1, 
            name: 'Hồ Chí Minh',
        },
        {
            id: 2, 
            name: 'Hà Nội',
        }
    ];
    return(
        <div className="container signin-body">
            <div className="signup-form">
                <h2>Đăng ký</h2>
                <div className='signup-section-1'>
                    <input placeholder="Họ và tên"></input>
                </div>
                <div className='signup-section-1'>
                    <input placeholder="Số điện thoại"></input>
                </div>
                <div className='signup-section-1'>
                    <input placeholder="Email"></input>
                </div>
                <div className='signup-section-2'>
                    <div className='signup-input-container'>
                    <select className='signup-form-input-2'>
                        <option value="" disabled selected hidden>Tỉnh/ Thành phố</option>                     
                        {
                            provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                        }
                    </select>
                    </div>
                    <div className='signup-input-container'>
                        <select className='signup-form-input-2'>
                        <option value="" disabled selected hidden>Phường/ Xã</option>                     
                        {
                            provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                        }
                        </select>
                    </div>
                    <div className='signup-input-container'>
                        <input placeholder="Mật khẩu" type={inputTypeCf}></input>
                        <FontAwesomeIcon className='eye' icon={iconTypeCf} onClick={handleToggleCf}/>
                    </div>
                    <div className='signup-input-container'>                    
                    <select className='signup-form-input-2'>
                        <option defaultValue="" disabled selected hidden>Quận/ Huyện</option>                     
                        {
                            provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                        }
                    </select></div>
                    <div className='signup-input-container'><input placeholder="Địa chỉ cụ thể"></input></div>
                    <div className='signup-input-container'>
                        <input placeholder="Nhập lại mật khẩu" type={inputType}></input>
                        <FontAwesomeIcon className='eye' icon={iconType} onClick={handleToggle}/>
                    </div>               
                </div>
                <div className="signup-form-else">
                    <Link to="/user/dang-nhap"><span>Đã có tài khoản? </span>Đăng nhập</Link>
                </div>
                <button className="btn signin-form-signbutton">Đăng ký</button>
                <div className='divider'>
                <hr className='line'></hr>
                <p>Hoặc</p>
                <hr className='line'></hr>
                </div>
                <button className="btn sign-form-continue-google"><FcGoogle/>Tiếp tục với Google</button>
            </div>
        </div>
    )
}