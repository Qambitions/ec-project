import dino from '../../assets/404.png'
import './style.css'
import {Link} from 'react-router-dom'

export default function ErrorPage(){
    return(
        <div className='errorpage'>
            <div>
                <img src={dino} alt={dino}></img>
                <label>Oops!</label>
            </div>
            <h3>404</h3>
            <h2>rất tiếc, trang bạn tìm kiếm không tồn tại</h2>
            <h4>Trở về <Link className="error-to-homepage" to="/">Trang chủ</Link></h4>
        </div>
    )
}