import { DeliveryInfo } from "./DeliveryInfo";
import { ShippingInfo } from "./ShippingInfo";
import { OrderInfo } from "./OrdersInfo";
import { useLocation } from "react-router-dom";
import VoucherInfo from "./VoucherInfo";
import "./style.css";
import TotalCard from "./TotalCard";
import { CheckoutProvider } from "../../../context/CheckoutProvider";
import CheckoutContext from "../../../context/CheckoutProvider";
import axios from "../../../api/axios";
import { useContext } from "react";
import Cookies from "js-cookie";

export default function Checkout(props) {
  const location = useLocation();
  const checkoutContext = useContext(CheckoutContext);
  const handleOrder = () => {
    var cartInfo = localStorage.getItem("cart");
    cartInfo = cartInfo ? JSON.parse(cartInfo) : {};
    var checkoutInfo = localStorage.getItem("checkoutInfo");
    checkoutInfo = checkoutInfo ? JSON.parse(checkoutInfo) : {};
    console.log("CART", cartInfo);
    console.log("CHECKOUTINFO", checkoutInfo);
    // try {
    //   axios({
    //     method: "post",
    //     url: process.env.REACT_APP_CREATE_ORDER,
    //     headers: { token: Cookies.get("token") },
    //     data: {
    //       id_dia_chi_giao: 1,
    //       hinh_thuc_thanh_toan: "COD",
    //       macn: 200,
    //       hinh_thuc_giao_hang: checkoutContext.shippingMethod,
    //       phi_van_chuyen: checkoutContext.shippingPrice,
    //       phi_giam: 0,
    //       phi_san_pham: 475000,
    //       items: [
    //         {
    //           masp: 200000,
    //           so_luong_mua: 2,
    //           gia_phai_tra: 10000,
    //         },
    //         {
    //           masp: 200001,
    //           so_luong_mua: 2,
    //           gia_phai_tra: 10000,
    //         },
    //       ],
    //     },
    //   });
    // } catch (error) {}
  };

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
              <button className="button_pink" onClick={handleOrder}>
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}
