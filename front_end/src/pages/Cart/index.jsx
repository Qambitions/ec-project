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
import CartContext from "../../context/CartProvider";

export default function Cart() {
  const cartContext = useContext(CartContext);
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

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    paymentType = value;
  };

  const handleSelect = (e) => {
    const { id, checked } = e.target;
    if (id === "selectAll") {
      let tmpSelection = items.map((item) => {
        return { ...item, isChecked: checked };
      });
      cartContext.setSelectAllChecked(true);
      console.log(tmpSelection);
      setItems(tmpSelection);
    } else {
      let tmpSelection = items.map((item) =>
        item.itemID === id ? { ...item, isChecked: checked } : item
      );
      console.log(tmpSelection);
      setItems(tmpSelection);
    }
  };

  const handleRemoveAll = () => {
    setItems([]);
    cartContext.removeAllItems();
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
                <input
                  type="checkbox"
                  id="selectAll"
                  checked={!items.some((item) => item?.isChecked !== true)}
                  onChange={handleSelect}
                ></input>
              </div>
              <div className="checkout-main-col-2">Sản phẩm</div>
              <div className="checkout-main-col-3">Đơn giá</div>
              <div className="checkout-main-col-3">Số lượng</div>
              <div className="checkout-main-col-3">Thành tiền</div>
              <div className="checkout-main-col-3">
                <IoTrashBin onClick={handleRemoveAll} />
              </div>
            </div>
            {items.map((item) => (
              <ProductCart
                key={item.itemID}
                obj={item}
                handleSelect={handleSelect}
                isChecked={item.isChecked}
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
                  {cartContext.getTempPay()}
                  <text>đ</text>
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
