import {DeliveryCard} from './DeliveryCard'

export function DeliveryInfo(props){
    return(
        <div className='payment__info_container'>
            <div className='container__flex payment__info_head'>
                <h4>Thông tin nhận hàng</h4>
                <a>Tùy chỉnh</a>
            </div>
            <div className="payment__info_body">
                <DeliveryCard/>
                <DeliveryCard/>
                <a>+ Thêm địa chỉ mới</a>
            </div>
        </div>
    )
}