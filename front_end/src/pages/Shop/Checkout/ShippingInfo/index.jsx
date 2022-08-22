import { useEffect } from "react";
import axios from "../../../../api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useContext } from "react";
import CheckoutContext from "../../../../context/CheckoutProvider";
import { LoadingOverlay } from "../../../../components/PopUp";
export function ShippingInfo(props) {
  const checkoutContext = useContext(CheckoutContext);
  const [modalShow, setModalShow] = useState(true);
  const [GHN, setGHN] = useState({});
  const [GHTK_fast, setGHTK_fast] = useState({});
  const [GHTK_norm, setGHTK] = useState({});
  const [weight, setWeight] = useState(0);
  const handleShippingMethod = (e) => {
    updateCheckoutShippingMethod(e.target.id.toUpperCase());
    checkoutContext.setShippingPrice(e.target.value);
    switch (e.target.id) {
      case "GHN":
        updateCheckoutMacn(GHN.macn);
        break;
      case "GHTK_norm":
        updateCheckoutMacn(GHTK_norm.macn);
        break;
      case "GHTK_fast":
        updateCheckoutMacn(GHTK_fast.macn);
        break;
    }
  };

  const handlePaymentMethod = (e) => {
    updateCheckoutPaymentMethod(e.target.value);
  };

  const updateCheckoutShippingMethod = (method) => {
    var info = localStorage.getItem("checkoutInfo");
    info = info ? JSON.parse(info) : {};
    info.hinh_thuc_giao_hang = method;
    localStorage.setItem("checkoutInfo", JSON.stringify(info));
  };

  const updateCheckoutPaymentMethod = (method) => {
    var info = localStorage.getItem("checkoutInfo");
    info = info ? JSON.parse(info) : {};
    info.hinh_thuc_thanh_toan = method;
    localStorage.setItem("checkoutInfo", JSON.stringify(info));
  };

  const updateCheckoutMacn = (id) => {
    var info = localStorage.getItem("checkoutInfo");
    info = info ? JSON.parse(info) : {};
    info.macn = id;
    localStorage.setItem("checkoutInfo", JSON.stringify(info));
  };

  const calShippingPrice = async (method, weight) => {
    if (!checkoutContext?.deliveryInfo) {
      checkoutContext.setShippingPrice(0);
      return;
    }
    let token = Cookies.get("token");
    let res = await axios({
      url: process.env.REACT_APP_GET_SHIPPING_PRICE,
      method: "post",
      headers: {
        token: token,
      },
      data: {
        dia_chi: {
          districtid: checkoutContext.deliveryInfo?.districtid,
          quan_tp: checkoutContext.deliveryInfo?.quan_tp,
          tp_tinh: checkoutContext.deliveryInfo?.tp_tinh,
        },
        sum_weight: weight,
        method: method,
      },
    });
    if (res.data.exitcode === 0) {
      switch (method) {
        case "GHN":
          updateCheckoutMacn(res.data.macn);
          setGHN({
            price: res.data.price,
            macn: res.data.macn,
          });
          checkoutContext.setShippingPrice(res.data.price);
          break;
        case "GHTK_norm":
          setGHTK({
            price: res.data.price,
            macn: res.data.macn,
          });
          break;
        case "GHTK_fast":
          setGHTK_fast({
            price: res.data.price,
            macn: res.data.macn,
          });
          setModalShow(false);
          break;
      }
    }
  };

  const calCheckoutInfo = () => {
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    let ttWeight = 0;
    cart.forEach((item) => {
      if (item.isChecked) {
        ttWeight += item.quantity * item.weight;
      }
    });
    setWeight(ttWeight);
  };

  useEffect(() => {
    calCheckoutInfo();
    checkoutContext.setShippingPrice(0);
    updateCheckoutShippingMethod("GHN");
    updateCheckoutPaymentMethod("MOMO");
    setModalShow(true);
  }, []);

  useEffect(() => {
    if (weight > 0) {
      calShippingPrice("GHN", weight);
      calShippingPrice("GHTK_fast", weight);
      calShippingPrice("GHTK_norm", weight);
    }
  }, [checkoutContext.deliveryInfo]);

  return (
    <>
      <LoadingOverlay show={modalShow} onHide={() => setModalShow(false)} />
      <div className="payment__info_container">
        <div className="payment__info_head">
          <h4>Vận chuyển & Thanh toán</h4>
        </div>
        <div className="payment__info_body">
          <h6>Hình thức vận chuyển</h6>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_shipping"
              id="GHN"
              value={GHN.price}
              defaultChecked
              onChange={handleShippingMethod}
            ></input>
            <small class="form-check-small" for="GHN">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"
                }
              ></img>
              <label>Giao hàng nhanh&emsp;&emsp;{GHN.price}</label>
            </small>
            <br></br>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_shipping"
              id="GHTK_norm"
              value={GHTK_norm.price}
              onChange={handleShippingMethod}
            ></input>
            <small class="form-check-small" for="GHTK">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"
                }
              ></img>
              <label>Giao hàng tiết kiệm&emsp;&emsp;{GHTK_norm.price}</label>
            </small>
            <br></br>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_shipping"
              id="GHTK_fast"
              value={GHTK_fast.price}
              onChange={handleShippingMethod}
            ></input>
            <small class="form-check-small" for="GHTK_fast">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"
                }
              ></img>
              <label>
                Giao hàng tiết kiệm siu tốc độ&emsp;&emsp;{GHTK_fast.price}
              </label>
            </small>
            <br></br>
          </div>
          <hr className="line" />
          <h6>Phương thức thanh toán</h6>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_payment"
              id="MoMo"
              value="MoMo"
              onChange={handlePaymentMethod}
              defaultChecked
            ></input>
            <small class="form-check-small" for="MoMo">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773279/icon/icon-payment-method-momo_n8gnbv.svg"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773279/icon/icon-payment-method-momo_n8gnbv.svg"
                }
              ></img>
              Thanh toán bằng ví MoMo
            </small>
            <br></br>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_payment"
              id="VNPAY"
              value="VNPAY"
              onChange={handlePaymentMethod}
            ></input>
            <small class="form-check-small" for="VNPAY">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773206/icon/icon-payment-method-vnpay_zh2dfi.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773206/icon/icon-payment-method-vnpay_zh2dfi.png"
                }
              ></img>
              Thanh toán bằng ví VNPay
            </small>
            <br></br>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_payment"
              id="PAYPAL"
              value="PayPal"
              onChange={handlePaymentMethod}
            ></input>
            <small class="form-check-small" for="PayPal">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/888870_wptg5q.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/888870_wptg5q.png"
                }
              ></img>
              Thanh toán bằng ví PayPal
            </small>
            <br></br>
          </div>
          <div className="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="radio_payment"
              id="COD"
              value="COD"
              onChange={handlePaymentMethod}
            ></input>
            <small class="form-check-small" for="COD">
              <img
                className="payment__icon"
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2543174_viafmp.png"
                }
                alt={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2543174_viafmp.png"
                }
              ></img>
              Thanh toán bằng tiền mặt khi nhận hàng
            </small>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
}
