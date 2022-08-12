import { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "../../api/axios";
import { useContext } from "react";
import CartContext from "../../context/CartProvider";
import { ConfirmRemoveItemPopUp } from "../PopUp";
const GET_PRODUCT = "/product/details";

export default function ProductCart(props) {
  const [isRemove, setIsRemove] = useState(false);
  const [card, setCard] = useState({});
  const cartContext = useContext(CartContext);
  const obj = props.obj;
  const getProductInfo = async () => {
    await axios
      .get(GET_PRODUCT, {
        params: { masp: obj.itemID },
      })
      .then((res) => {
        setCard({
          quantity: parseInt(obj.quantity),
          itemID: obj.itemID,
          img: res.data.item.hinh_anh,
          pdName: res.data.item.tensp,
          pdBrand: res.data.item.ten_npp,
          price: res.data.item.gia_ban_giam,
          weight: res.data.item.khoi_luong,
          pay: res.data.item.gia_ban_giam * parseInt(obj.quantity),
        });
      });
  };
  useEffect(() => {
    getProductInfo();
    if (document.getElementById(obj.itemID) !== null) {
      var cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
      for (var i in cart) {
        if (cart[i].itemID === obj.itemID) {
          document.getElementById(obj.itemID).checked = cart[i].isChecked;
          if (cart[i].isChecked === true) {
            if (!isNaN(card.pay)) {
              cartContext.calTempPay(card.pay);
              cartContext.calWeight(card.weight);
              console.log(card.pay);
              console.log(card.weight);
            } else {
              cartContext.calTempPay(0);
              cartContext.calWeight(0);
            }
          }
        }
      }
    }
  }, [card.itemID]);

  const handleUpdateAmount = (isIncrease) => {
    setCard((prevState) => {
      return { ...prevState, pay: prevState.price * prevState.quantity };
    });
    if (document.getElementById(card.itemID).checked) {
      if (isIncrease) {
        cartContext.calTempPay(card.price);
        cartContext.calWeight(card.weight);
      } else {
        cartContext.calTempPay(card.price * -1);
        cartContext.calWeight(card.weight * -1);
      }
    }
  };

  const handleQuantity = () => {
    cartContext.upDateQuantity(card.itemID, card.quantity);
  };

  var increaseQuantity = () => {
    if (card.quantity < 50) {
      setCard((prevState) => {
        return { ...prevState, quantity: prevState.quantity++ };
      });
      handleUpdateAmount(true);
    }
  };

  var decreaseQuantity = () => {
    if (card.quantity > 1) {
      setCard((prevState) => {
        return { ...prevState, quantity: prevState.quantity-- };
      });
      handleUpdateAmount(false);
    }
  };

  const handleRemove = () => {
    cartContext.removeItem(card.itemID);
    cartContext.calTempPay(card.pay * -1);
    cartContext.calWeight(card.weight * -1);
  };

  const toggleRemove = () => {
    setIsRemove(!isRemove);
  };

  function handleSelect(e) {
    props.handleSelect(e);
    cartContext.updateItemCheck(card.itemID);
    if (!isNaN(card.pay)) {
      if (document.getElementById(card.itemID).checked === true) {
        cartContext.calTempPay(card.pay);
        cartContext.calWeight(card.weight);
      } else {
        cartContext.calTempPay(card.pay * -1);
        cartContext.calWeight(card.weight * -1);
      }
    }
  }

  return (
    <>
      <div className="checkout-main-row product__cart">
        <div className="checkout-main-col-1">
          <input
            value={0}
            type="checkbox"
            id={obj.itemID}
            onChange={handleSelect}
          ></input>
        </div>
        <div className="checkout-main-col-2">
          <div className="checkout__product_card">
            <a href="https://www.petmart.vn/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito">
              <img
                className="checkout__cart_product_img"
                src={card.img}
                alt={card.img}
              ></img>
            </a>
            <div>
              <h5>{card.pdBrand}</h5>
              <label>{card.pdName}</label>
            </div>
          </div>
        </div>
        <div className="checkout-main-col-3 checkout__product_info">
          <span>
            <label id="product-price">{card.price}</label>đ
          </span>
        </div>
        <div className="checkout-main-col-3">
          <div className="checkout__product_quantity_indicator">
            <button
              className="checkout__product_decrease"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input
              className="checkout__product_input_quantity"
              type="number"
              value={card.quantity}
              onChange={handleQuantity}
            ></input>
            <button
              className="checkout__product_increase"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </div>
        <div className="checkout-main-col-3 checkout__product_info">
          <span>
            <label id="product-pay">{card.price * card.quantity}</label>đ
          </span>
        </div>
        <div className="checkout-main-col-3">
          <IoCloseCircleOutline
            className="checkout__remove_item"
            onClick={toggleRemove}
          />
        </div>
      </div>
      {isRemove && (
        <ConfirmRemoveItemPopUp
          handleConfirm={handleRemove}
          handleClose={toggleRemove}
        />
      )}
    </>
  );
}
