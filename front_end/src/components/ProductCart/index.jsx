import { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "../../api/axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartProvider";
import { ConfirmRemoveItemPopUp, LoadingOverlay } from "../PopUp";
const GET_PRODUCT = "/product/details";

export default function ProductCart(props) {
  const [modalShow, setModalShow] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [card, setCard] = useState({});
  const cartContext = useContext(CartContext);
  const obj = props.obj;
  const getProductInfo = async () => {
    setModalShow(true);
    if (obj?.itemID) {
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
            pay: res.data.item.gia_ban_giam * parseInt(obj.quantity),
          });
        });
    }

    setModalShow(false);
  };
  useEffect(() => {
    getProductInfo();
    if (document.getElementById(obj.itemID) !== null) {
      var cart = localStorage.getItem("cart");
      cart = cart ? JSON.parse(cart) : [];
      if (cart.length > 0) {
        for (var i in cart) {
          if (cart[i].itemID === obj.itemID) {
            document.getElementById(obj.itemID).checked = cart[i].isChecked;
            if (cart[i].isChecked === true) {
              if (!isNaN(card.pay)) {
                cartContext.calTempPay(card.pay);
              } else {
                cartContext.calTempPay(0);
              }
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
      } else {
        cartContext.calTempPay(card.price * -1);
      }
    }
  };

  var increaseQuantity = () => {
    if (card.quantity < 50) {
      cartContext.upDateQuantity(card.itemID, card.quantity + 1);
      setCard((prevState) => {
        return { ...prevState, quantity: prevState.quantity + 1 };
      });
      handleUpdateAmount(true);
    }
  };

  var decreaseQuantity = () => {
    console.log("quantity-de", card.itemID, card.quantity);
    if (card.quantity > 1) {
      cartContext.upDateQuantity(card.itemID, card.quantity - 1);
      setCard((prevState) => {
        return { ...prevState, quantity: prevState.quantity - 1 };
      });
      handleUpdateAmount(false);
    }
  };

  const handleRemove = () => {
    cartContext.removeItem(card.itemID);
    cartContext.calTempPay(card.pay * -1);
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
      } else {
        cartContext.calTempPay(card.pay * -1);
      }
    }
  }

  return (
    <>
      <div className="checkout-main-row product__cart">
        <LoadingOverlay show={modalShow} onHide={() => setModalShow(false)} />
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
            <Link to={`/product/${card.itemID}`}>
              <img
                className="checkout__cart_product_img"
                src={card.img}
                alt={card.img}
              ></img>
            </Link>
            <div>
              <h5>{card.pdBrand}</h5>
              <label>{card.pdName}</label>
            </div>
          </div>
        </div>
        <div className="checkout-main-col-3 checkout__product_info">
          <span>
            <label id="product-price">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(card.price)}
            </label>
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
              // onChange={handleQuantity}
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
            <label id="product-pay">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(card.price * card.quantity)}
            </label>
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
