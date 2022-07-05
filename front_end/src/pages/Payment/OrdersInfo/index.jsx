import { OrderCard } from "./OrderCard";

export function OrderInfo(props){
    return(
        <div className="payment__info_container">
            <div className="container__flex payment__info_head">
                <h4>Đơn hàng</h4>
                <a>Thay đổi</a>
            </div>
            <div className="payment__info_body">
                <OrderCard/>
            </div>
        </div>
    )
}