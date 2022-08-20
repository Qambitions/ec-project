import "./style.css";
import { useState } from "react";
import ProductCart from "../../../components/ProductCart";
import { IoTrashBin } from "react-icons/io5";
import VoucherPopUp from "../../../components/ProductCart/VoucherPopUp";
import { VoucherPicker } from "../../../components/ProductCart/VoucherPicker";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../../context/CartProvider";

export default function Cart() {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const [selectAll, setSelectAll] = useState();
  const [items, setItems] = useState([]);
  var paymentType = "";
  const handleSubmit = (event) => {
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    if (!cart.some((item) => item?.isChecked === true)) {
    } else {
      navigate("/user/checkout", {
        state: {
          totalWeight: cartContext.cartInfo.totalWeight,
          tempPay: cartContext.cartInfo.tempPay,
        },
      });
    }
  };

  const handleSelect = (e) => {
    const { id, value } = e.target;

    if (id === "selectAll") {
      var cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
      for (var i in cart) {
        let tmp = cart[i].isChecked;

        let checked = document.getElementById("selectAll").checked;
        if (checked === true) {
          if (tmp === false) {
            document.getElementById(cart[i].itemID).click();
            cart[i].isChecked = !tmp;
          }
        } else {
          if (tmp === true) {
            cart[i].isChecked = !tmp;
            document.getElementById(cart[i].itemID).click();
          }
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    setItems(JSON.parse(localStorage.getItem("cart")));
    let isChecked = !JSON.parse(localStorage.getItem("cart")).some(
      (item) => item?.isChecked !== true
    );
    setSelectAll(isChecked);
  };

  useEffect(() => {
    if(!localStorage?.getItem("cart")){
      localStorage.setItem("cart",JSON.stringify([]));
    }
    var cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    setItems(cart);
  }, [cartContext.cartInfo.totalQuantity]);

  useEffect(() => {
    let isChecked = !JSON.parse(localStorage.getItem("cart")).some(
      (item) => item?.isChecked !== true
    );
    setSelectAll(isChecked);
  }, [items]);

  const handleRemoveAll = () => {
    setItems([]);
    cartContext.removeAllItems();
  };

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
                  checked={selectAll}
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
            {items.length === 0 ? (
              <label>Mua hàng đi</label>
            ) : (
              <>
                {" "}
                {items.map((item) => (
                  <ProductCart
                    key={item.itemID}
                    obj={item}
                    handleSelect={handleSelect}
                    isChecked={item.isChecked}
                  />
                ))}
              </>
            )}
          </div>
          <div className="checkout-aside">
            <div className="checkout-product-invoice">
              <h4>Hóa đơn của bạn</h4>
              <label>{cartContext.cartInfo.totalQuantity}</label>
              <hr />
              <div className="container__flex">
                <label>Tạm tính:</label>
                <span>
                  {cartContext.cartInfo.tempPay}
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
                  {cartContext.cartInfo.totalPay} <text>đ</text>
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
