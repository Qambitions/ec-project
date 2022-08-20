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
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Checkout(props) {
  const location = useLocation();
  const checkoutContext = useContext(CheckoutContext);
  const [items, setItems] = useState([]);

  const fetchDetail = async () => {
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    let itemsLoad = [];
    for (var i in cart) {
      if (cart[i].isChecked) {
        let item = {};
        await axios({
          method: "get",
          url: process.env.REACT_APP_GET_PRODUCT_DETAIL,
          params: { masp: cart[i].itemID },
        }).then((res) => (item = res.data.item));
        item.so_luong_mua = cart[i].quantity;
        itemsLoad.push(item);
      }
    }
    setItems(itemsLoad);
  };
  useEffect(() => {
    fetchDetail();
  }, []);

  async function callCreateOrderAPI(
    items,
    ckInfo,
    discount,
    shipprice,
    tempPay
  ) {
    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_CREATE_ORDER,
        headers: { token: Cookies.get("token") },
        data: {
          ckInfo,
          phi_van_chuyen: shipprice,
          phi_giam: discount,
          phi_san_pham: tempPay,
          items: items,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.exitcode === 106) {
          console.log("token k ton tai");
        } else if (res.data.exitcode === 101) {
          console.log("tao don hang that bai");
        } else {
          console.log("tao thanh cong", res.data.paymentURL);
          window.location.href(res.data.paymentURL);
        }
      });
    } catch (error) {}
  }

  const handleOrder = async () => {
    var checkoutInfo = localStorage.getItem("checkoutInfo");
    checkoutInfo = checkoutInfo ? JSON.parse(checkoutInfo) : {};
    let itemsBuy = [];
    let tempPay = 0;
    items.forEach((element) => {
      let item = {};
      tempPay +=
        parseInt(element.so_luong_mua) * parseInt(element.gia_ban_giam);
      item.so_luong_mua = element.so_luong_mua;
      item.masp = element.masp;
      item.gia_phai_tra = element.gia_ban_giam;
      itemsBuy.push(item);
    });
    var hinh_thuc_giao_hang = checkoutInfo.hinh_thuc_giao_hang;
    var hinh_thuc_thanh_toan = checkoutInfo.hinh_thuc_thanh_toan;
    let dataOrder = {
      id_dia_chi_giao: checkoutInfo.id_dia_chi_giao,
      hinh_thuc_thanh_toan: hinh_thuc_thanh_toan,
      macn: checkoutInfo.macn,
      hinh_thuc_giao_hang: hinh_thuc_giao_hang,
      phi_van_chuyen: Number(
        document.getElementById("checkoutShippingCost").textContent
      ),
      phi_giam: Number(document.getElementById("checkoutDiscount").textContent),
      phi_san_pham: Number(
        document.getElementById("checkoutTempPay").textContent
      ),
      items: itemsBuy,
    };
    console.log("orderInfo", dataOrder);
    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_CREATE_ORDER,
        headers: { token: Cookies.get("token") },
        data: dataOrder,
      }).then((res) => {
        console.log(res.data);
        if (res.data.exitcode === 106) {
          console.log("token k ton tai");
        } else if (res.data.exitcode === 101) {
          console.log("tao don hang that bai");
        } else {
          setTimeout(500);
          console.log("tao thanh cong", res.data.paymentURL);
          window.location.replace(res.data.paymentURL);
          localStorage.removeItem("cart");
          localStorage.removeItem("checkoutInfo");
        }
      });
    } catch (error) {}
  };

  return (
    <CheckoutProvider>
      <div className="body">
        <div className="container container__flex_col">
          <h1>Thanh toán</h1>
          <div className="payment__body">
            <div className="container__flex_col payment__body_left">
              <DeliveryInfo />
              <ShippingInfo />
            </div>
            <div className="container__flex_col payment__body_right">
              <OrderInfo itemsList={items} />
              <VoucherInfo />
              <TotalCard />
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
