import "./style.css";
import { useState } from "react";
import ProductCart from "../../components/ProductCart";
import { IoTrashBin } from "react-icons/io5";
import VoucherPopUp from "../../components/ProductCart/VoucherPopUp";
import { VoucherPicker } from "../../components/ProductCart/VoucherPicker";
import {
  SuccessTransaction,
  FailTransaction,
} from "../../components/TransactionPopUp";
import { useEffect } from "react";
import { useContext } from "react";

export default function Cart() {
  const [total, setInvoice] = useState(0);
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("cart")));
  var paymentType = "";
  const handleSubmit = (event) => {
    if (paymentType === "MoMo") {
      // momoCall();
      console.log("Call momo api");
    }
    if (paymentType === "ZaloPay") {
      console.log("Call zalo api");
    }
    if (paymentType === "VNPay") {
      console.log("Call vnpay api");
    }
    if (paymentType === "PayPal") {
      console.log("Call paypal api");
    }
  };

  const getCartInfo = () => {
    let itemsList = localStorage.getItem("cart");
    itemsList = JSON.parse(itemsList);
    setItems(itemsList);
    console.log(items);
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    paymentType = value;
  };

  useEffect(() => {
    // console.log(items);
  }, []);

  return (
    <>
      <div className="body cart">
        <h3 className="container">Giỏ hàng</h3>
        <div className="container cart-body">
          <div className="checkout-main">
            <div className="checkout-main-row checkout__product_header">
              <div className="checkout-main-col-1">
                <input type="checkbox"></input>
              </div>
              <div className="checkout-main-col-2">Sản phẩm</div>
              <div className="checkout-main-col-3">Đơn giá</div>
              <div className="checkout-main-col-3">Số lượng</div>
              <div className="checkout-main-col-3">Thành tiền</div>
              <div className="checkout-main-col-3">
                <IoTrashBin />
              </div>
            </div>
            {items.map((item) => (
              <ProductCart
                key={item.itemID}
                // updateTotal={(total) => setInvoice(total)}
                obj={item}
              />
            ))}
            <VoucherPopUp />
          </div>
          <div className="checkout-aside">
            <div className="checkout-product-invoice">
              <h4>Hóa đơn của bạn</h4>
              <hr />
              <div className="container__flex">
                <label>Tạm tính:</label>
                <span>
                  1 <text>đ</text>
                </span>
              </div>
              <div className="container__flex">
                <label>Giảm giá: </label>
                <span>
                  -1 <text>đ</text>
                </span>
              </div>
              <hr />
              <div className="container__flex">
                <label>Tổng cộng: </label>
                <span>
                  123231 <text>đ</text>
                </span>
              </div>
              <p>(đã bao gồm VAT)</p>
            </div>
            <div className="checkout-aside-coupon-container">
              <VoucherPicker />
            </div>
            <button onClick={handleSubmit} className="button_pink">
              Mua hàng
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
