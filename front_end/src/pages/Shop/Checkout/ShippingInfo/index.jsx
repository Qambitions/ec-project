import { useEffect } from "react";
import axios from "../../../../api/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useContext } from "react";
import CheckoutContext from "../../../../context/CheckoutProvider";
export function ShippingInfo(props) {
  const checkoutContext = useContext(CheckoutContext);
  const [GHN, setGHN] = useState();
  const [GHTK_fast, setGHTK_fast] = useState();
  const [GHTK_norm, setGHTK] = useState();
  const handleShippingMethod = (e) => {
    checkoutContext.setShippingPrice(e.target.value);
  };

  const calShippingPrice = async (method, weight) => {
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
          setGHN(res.data.price);
          checkoutContext.setShippingPrice(res.data.price);
          break;
        case "GHTK_norm":
          setGHTK(res.data.price);
          break;
        case "GHTK_fast":
          setGHTK_fast(res.data.price);
          break;
      }
    }
  };

  useEffect(() => {
    let weight = props.weight;
    calShippingPrice("GHN", weight);
    calShippingPrice("GHTK_fast", weight);
    calShippingPrice("GHTK_norm", weight);
  }, [checkoutContext.deliveryInfo]);

  useEffect(() => {
    checkoutContext.setShippingPrice(GHN);
  }, []);

  return (
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
            value={GHN}
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
            <label>Giao hàng nhanh&emsp;&emsp;{GHN}</label>
          </small>
          <br></br>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radio_shipping"
            id="GHTK_norm"
            value={GHTK_norm}
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
            <label>Giao hàng tiết kiệm&emsp;&emsp;{GHTK_norm}</label>
          </small>
          <br></br>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radio_shipping"
            id="ViettelPost"
            value={GHTK_fast}
            onChange={handleShippingMethod}
          ></input>
          <small class="form-check-small" for="ViettelPost">
            <img
              className="payment__icon"
              src={
                "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656573798/icon/Logo-Viettel-Post-Transparent_zw5rmz.webp"
              }
              alt={
                "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656573798/icon/Logo-Viettel-Post-Transparent_zw5rmz.webp"
              }
            ></img>
            <label>Giao hàng tiết kiệm siu tốc độ&emsp;&emsp;{GHTK_fast}</label>
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
            onChange={""}
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
            id="ZaloPay"
            value="ZaloPay"
            onChange={""}
          ></input>
          <small class="form-check-small" for="ZaloPay">
            <img
              className="payment__icon"
              src={
                "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773094/icon/icon-payment-method-zalo-pay_fzqlod.svg"
              }
              alt={
                "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773094/icon/icon-payment-method-zalo-pay_fzqlod.svg"
              }
            ></img>
            Thanh toán bằng ví ZaloPay
          </small>
          <br></br>
        </div>
        <div className="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radio_payment"
            id="VNPay"
            value="VNPay"
            onChange={"handleChange"}
          ></input>
          <small class="form-check-small" for="VNPay">
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
            id="PayPal"
            value="PayPal"
            onChange={"handleChange"}
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
            onChange={"handleChange"}
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
  );
}
