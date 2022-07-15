import './style.css'
import { Link } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc";
import Selector from "../../components/Selector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { useState, useEffect, useRef  } from 'react';
import axios from '../../api/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const MAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const REGISTER_URL = '/account/signup'


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
    const [formValues, setFormValues]=useState({
        fullname:"",phone:"",email:"",city:"",
        district:"",ward:"",address:"",pass:"",confirm:""
    });

    const [formErrors, setFormErrors]= useState({});
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setFormErrors(validate(formValues));
    }, [formValues])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        if(formErrors.validate){
            try {
                const res = await axios.post(REGISTER_URL,{
                    tenkh: formValues.fullname,
                    email_kh : formValues.email,
                    sdt_kh : formValues.phone,
                    mat_khau : formValues.pass,
                    so_nha_duong : formValues.address,
                    phuong_xa : formValues.ward,
                    quan_tp : formValues.district,
                    tp_tinh : formValues.city
                }
                );
                console.log(JSON.stringify(res?.data));
            } catch (error) {
                
            }
        }
    };

    const validate = (values)=>{
        const errors={};
        errors.validate = true;
        if(!values.fullname){
            errors.fullname = "Không được để trống";
            errors.validate = false;
        }
        if(!values.phone){
            errors.phone = "Không được để trống";
            errors.validate = false;
        }
        else if(!PHONE_REGEX.test(values.phone)){
            errors.phone = "Số điện thoại không hợp lệ";
            errors.validate = false;
        }
        if(!values.email){
            errors.email = "Không được để trống";
            errors.validate = false;
        }
        else if (!MAIL_REGEX.test(values.email)){
            errors.email = "Email không hợp lệ!";
            errors.validate = false;
        }
        if(!values.city){
            errors.city = "Không được để trống";
            errors.validate = false;
        }
        if(!values.district){
            errors.district = "Không được để trống";
            errors.validate = false;
        }
        if(!values.ward){
            errors.ward = "Không được để trống";
            errors.validate = false;
        }
        if(!values.address){
            errors.address = "Không được để trống";
            errors.validate = false;
        }
        if(!values.pass){
            errors.pass = "Không được để trống";
            errors.validate = false;
        }
        else if (!PWD_REGEX.test(values.pass)){
            errors.pass = "8-24 ký tự. Chứa ký tự thường và hoa. Số và ký tự đặc biệt";
            errors.validate = false;
        }
        if(!values.confirm){
            errors.confirm = "Không được để trống";
            errors.validate = false;
        }
        if(values.confirm!==values.pass){
            errors.confirm = "Mật khẩu không khớp";
            errors.validate = false;
        }
        return errors;
    };

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
            <form className="signup-form"  onSubmit={handleSubmit}>
                <h2>Đăng ký</h2>
                <div className='signup__section_1'>
                    <div className='signup-input-container'>
                        <input placeholder="Họ và tên" name="fullname" value={formValues.fullname} onChange={handleChange}></input>
                    </div>
                    <div className='error_message_container'>
                        <small>{formErrors.fullname}</small>
                    </div>
                    <div className='signup-input-container'>
                        <input placeholder="Số điện thoại" name="phone" value={formValues.phone} onChange={handleChange}></input>
                    </div>
                    <div className='error_message_container'>
                        <small>{formErrors.phone}</small>
                    </div>
                    <div className='signup-input-container'>
                        <input placeholder="Email" name="email" value={formValues.email} onChange={handleChange}></input>
                    </div>
                    <div className='error_message_container'>
                        <small>{formErrors.email}</small>
                    </div>  
                </div>
                <div className='signup__section_2 container__flex'>
                    <div className='signup__section_2_col'>
                        <div className='signup-input-container'>
                            <select className='signup-form-input-2' name="city" value={formValues.city} onChange={handleChange}>
                                <option value="" disabled selected hidden>Tỉnh/ Thành phố</option>                     
                                {
                                    provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                                }
                            </select>
                        </div>
                        <div className='error_message_container'>
                            <small>{formErrors.city}</small>
                        </div>
                        <div className='signup-input-container'>
                            <select className='signup-form-input-2' name="ward" value={formValues.ward} onChange={handleChange}>
                            <option value="" disabled selected hidden>Phường/ Xã</option>                     
                            {
                                provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                            }
                            </select>
                        </div>
                        <div className='error_message_container'>
                            <small>{formErrors.ward}</small>
                        </div>
                        <div className='signup-input-container'>
                            <input placeholder="Mật khẩu" name="pass" type={inputType} value={formValues.pass} onChange={handleChange}></input>
                        </div>
                        <div className='error_message_container'>
                            <small>{formErrors.pass}</small>
                        </div>
                    </div>
                    <div className='signup__section_2_col'>
                        <div className='signup-input-container'>                    
                            <select className='signup-form-input-2' name="district" value={formValues.district} onChange={handleChange}>
                                <option value="" disabled selected hidden>Quận/ Huyện</option>                     
                                {
                                    provinces.map((item,index)=><Selector key={index} obj = {item}/>)
                                }
                            </select>
                        </div>
                        <div className='error_message_container'>
                            <small>{formErrors.district}</small>
                        </div>
                        <div className='signup-input-container'>
                            <input placeholder="Địa chỉ cụ thể" name="address" value={formValues.address} onChange={handleChange}></input>
                        </div>
                        <div className='error_message_container'>
                            <small>{formErrors.address}</small>
                        </div>
                        <div className='signup-input-container'>
                            <input placeholder="Nhập lại mật khẩu" name="confirm" type={inputType} value={formValues.confirm} onChange={handleChange}></input>
                            <FontAwesomeIcon className='eye' icon={iconType} onClick={handleToggle}/>
                        </div>  
                        <div className='error_message_container'>
                            <small>{formErrors.confirm}</small>
                        </div>  
                    </div>         
                </div>
                <div className="signup-form-else">
                    <Link to="/user/dang-nhap"><span>Đã có tài khoản? </span>Đăng nhập</Link>
                </div>
                <button className="btn signin-form-signbutton" ref={userRef}> Đăng ký</button>
                <div className='divider'>
                    <hr className='line'></hr>
                    <p>Hoặc</p>
                    <hr className='line'></hr>
                </div>
                <button className="btn sign-form-continue-google"><FcGoogle/>Tiếp tục với Google</button>
            </form>
        </div>
    )
}