import './style.css'
import {Link} from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
import { SignInErrorMessageBox } from './SignInErrorMessageBox';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import Cookies from 'js-cookie';

const LOGIN_URL = '/account/login';

export default function SignInForm(){
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [exitCode, setExitCode] = useState(2);
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setFormErrors({});
        setExitCode(0);
    }, [username, password])

    const [formErrors, setFormErrors]= useState({});
    const validate = (values)=>{
        const errors={};
        if(!values.username){
            errors.username="Không được để trống"
        }
        if(!values.password){
            errors.password="Không được để trống"
        }
        return errors;
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setFormErrors(validate({username,password}));
        if(username && password){
            try {
                const res = await axios.post(LOGIN_URL,{
                    username: username,
                    password: password
                }
                );
                console.log(JSON.stringify(res?.data));
                const accessToken = res?.data.token;
                Cookies.set('uid',(res.data.account_info.makh), { expires: 1, path: '/', sameSite:'strict', secure:true })
                Cookies.set('token',(res.data.token), { expires: 1, path: '/', sameSite:'strict', secure:true })
                Cookies.set('tenkh',(res.data.account_info.tenkh), { expires: 1, path: '/', sameSite:'strict', secure:true })
                Cookies.set('email_kh',(res.data.account_info.email_kh), { expires: 1, path: '/', sameSite:'strict', secure:true })
                Cookies.set('sdt_kh',(res.data.account_info.sdt_kh), { expires: 1, path: '/', sameSite:'strict', secure:true })
                if(res?.data.exitcode===0){
                    setExitCode(res?.data.exitcode);
                    setUsername('');
                    setPassword('');
                    setSuccess(true);
                }
                else{
                    setExitCode(res?.data.exitcode);
                    errRef.current.focus();
                }
            } catch (error) {
                
            }
        }
    }

    return(
        <div className="container signin-body">
            <div className="signin-container">
                <h2>Đăng nhập</h2>
                {exitCode===1 &&
                    <SignInErrorMessageBox/>
                }
                <form className='signin-form' onSubmit={handleSubmit}>
                    <input placeholder="Email/ Số điện thoại" ref={userRef} value={username} 
                            onChange={(e) => setUsername(e.target.value)}>
                    </input>
                    <div className='error_message_container'><small>{formErrors.username}</small></div>
                    <input placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} type="password"></input>
                    <div className='error_message_container'><small>{formErrors.password}</small></div>
                    <div className="signin-form-else">
                        <Link to="/user/quen-mat-khau">Quên mật khẩu?</Link>
                        <Link to="/user/dang-ky"><span>Chưa có tài khoản? </span>Đăng ký</Link>
                    </div>
                    <button className="btn signin-form-signbutton">Đăng nhập</button>
                </form>
                <div className='divider'>
                    <hr className='line'></hr>
                    <p>Hoặc</p>
                    <hr className='line'></hr>
                    </div>
                <button className="btn sign-form-continue-google"><FcGoogle className='google-icon'/>Tiếp tục với Google</button>
            </div>
        </div>
    )
}