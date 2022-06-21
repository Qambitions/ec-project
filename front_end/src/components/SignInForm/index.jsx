import './style.css'
import {Link} from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
import {Button} from 'react-bootstrap'

export default function SignInForm(){

    return(
        <div className="container signin-body">
            <div className="signin-form">
            <h2>Đăng nhập</h2>
            <input placeholder="Email/ Số điện thoại"></input>
            <input placeholder="Mật khẩu"></input>
            <div className="signin-form-else">
                <Link to="/user/quen-mat-khau">Quên mật khẩu?</Link>
                <Link to="/user/dang-ky"><span>Chưa có tài khoản? </span>Đăng ký</Link>
            </div>
            <button className="btn signin-form-signbutton">Đăng nhập</button>
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