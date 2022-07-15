import { DeliveryInfo } from './DeliveryInfo'
import { ShippingInfo } from './ShippingInfo'
import { OrderInfo } from './OrdersInfo'
import  VoucherInfo  from './VoucherInfo'
import './style.css'
import TotalCard from './TotalCard'


export default function Payment(props){
    return(
        <div className='body'>
                    <div className="container container__flex_col">
            <h1>Thanh toán</h1>
            <div className='payment__body'>
                <div className='container__flex_col payment__body_left'>
                    <DeliveryInfo/>
                    <ShippingInfo/>
                </div>
                <div className='container__flex_col payment__body_right'>
                    <OrderInfo/>
                    <VoucherInfo/>
                    <TotalCard/>
                    <button className='button_pink'>Đặt hàng</button>
                </div>
            </div>
        </div> 
        </div>
    )
}