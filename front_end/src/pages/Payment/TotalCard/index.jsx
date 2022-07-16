import { useState } from 'react'
import './style.css'

export default function TotalCard(props){
    const [discount, setDiscount] = useState(1);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [tmpPay, setTmpPay] = useState(0);

    return(
        <div className='container__flex_col total__card'>
            <div className="container__flex">
                <label>Tạm tính:</label>
                <span>{tmpPay}<label className='currency'>đ</label></span>
            </div>
            <div className="container__flex">
                <label>Phí vận chuyển:</label>
                <span>{deliveryFee}<label className='currency'>đ</label></span>
            </div>
            <div className="container__flex">
                <label>Giảm giá:</label>
                <span>{discount}<label className='currency'>đ</label></span>
            </div>
            <hr/>
            <div className="container__flex">
                <label>Tổng cộng:</label>
                <span style={{fontSize:"1.2rem", color:"#E04A4A"}}>sds<label className='currency'>đ</label></span>
            </div>
            <small className='grey_text'>(Đã bao gồm VAT)</small>
        </div>
    )
}