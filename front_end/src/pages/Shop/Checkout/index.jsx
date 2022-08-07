import { DeliveryInfo } from "./DeliveryInfo";
import { ShippingInfo } from "./ShippingInfo";
import { OrderInfo } from "./OrdersInfo";
import { useLocation } from "react-router-dom";
import VoucherInfo from "./VoucherInfo";
import "./style.css";
import TotalCard from "./TotalCard";
import { CheckoutProvider } from "../../../context/CheckoutProvider";
export default function Checkout(props) {
  const location = useLocation();
  return (
    <CheckoutProvider>
      <div className="body">
        <div className="container container__flex_col">
          <h1>Thanh toán</h1>
          <div className="payment__body">
            <div className="container__flex_col payment__body_left">
              <DeliveryInfo />
              <ShippingInfo weight={location.state.totalWeight} />
            </div>
            <div className="container__flex_col payment__body_right">
              <OrderInfo />
              <VoucherInfo />
              <TotalCard info={location.state.tempPay} />
              <button className="button_pink">Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
