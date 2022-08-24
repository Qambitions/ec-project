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
import {
  LoadingOverlay,
  MyVerticallyCenteredModal,
} from "../../../components/PopUp";
export default function Checkout(props) {
  const [loadingShow, setLoadingShow] = useState(false);
  const [errorMess, setErrorMess] = useState("");
  const checkoutContext = useContext(CheckoutContext);
  const [items, setItems] = useState([]);
  const [modalShow, setModalShow] = useState(false);
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
    try {
      await axios({
        method: "post",
        url: process.env.REACT_APP_CREATE_ORDER,
        headers: { token: Cookies.get("token") },
        data: dataOrder,
      }).then((res) => {
        console.log(dataOrder);
        console.log(res.data);
        setErrorMess(res.data.message);
        if (res.data.exitcode === 1) {
          setErrorMess(res.data.warning);
          setModalShow(true);
        } else if (res.data.exitcode === 106) {
          console.log("token k ton tai");
          setModalShow(true);
        } else if (res.data.exitcode === 101) {
          console.log("tao don hang that bai");
          setModalShow(true);
        } else if (res.data.exitcode === 107) {
          console.log("Tồn tại đơn hàng đang chờ thanh toán");
          setModalShow(true);
        } else if (res.data.exitcode === 0) {
          setTimeout(window.location.replace(res.data.paymentURL), 1000);
          localStorage.removeItem("cart");
          localStorage.removeItem("checkoutInfo");
        }
      });
    } catch (error) {}
  };

  return (
    <CheckoutProvider>
      <LoadingOverlay show={loadingShow} onHide={() => setLoadingShow(false)} />
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
      <MyVerticallyCenteredModal
        title={"Xảy ra lỗi trong quá trình thanh toán"}
        body={errorMess}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </CheckoutProvider>
  );
}
