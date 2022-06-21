import logo from '../../assets/logo.png';
import './style.css'

export default function SignHeader(){
    return(
        <div className="container signin-head">
            <a href="#"><img className="logo" src={logo} alt={logo}></img></a>
            <div className="nav-signin-menu">
                <a href="#"><i class="fa-regular fa-circle-question"></i> Cần giúp đỡ</a>
                <a href="#"><i class="fa-solid fa-house"></i> Hệ thống cửa hàng</a>
            </div>
        </div>
    )
}