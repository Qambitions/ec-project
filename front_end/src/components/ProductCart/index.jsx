import { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "../../api/axios";
import { useContext } from "react";
import CartContext from "../../context/CartProvider";
import { ConfirmPopUp } from "../PopUp";
const GET_PRODUCT = "/product/details";

export default function ProductCart(props) {
  const [isOpen, setIsOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const obj = props.obj;
  var [card, setCard] = useState({
    quantity: parseInt(obj.quantity),
    itemID: obj.itemID,
    pdName: "",
    pdBrand: "",
    price: 175000,
    pay: 175000,
    img: "",
    checked: false,
  });

  const getProductInfo = async () => {
    await axios
      .get(GET_PRODUCT, {
        params: { masp: card.itemID },
      })
      .then((res) =>
        setCard((prevState) => {
          return {
            ...prevState,
            img: res.data.item.hinh_anh,
            pdName: res.data.item.tensp,
            pdBrand: res.data.item.ten_npp,
          };
        })
      );
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  useEffect(() => {
    console.log(card);
    setCard((prevState) => {
      return { ...prevState, pay: card.price * card.quantity };
    });
  }, [card.quantity]);

  var increaseQuantity = () => {
    if (card.quantity < 50) {
      setCard((prevState) => {
        return { ...prevState, quantity: card.quantity++ };
      });
    }
  };

  var decreaseQuantity = () => {
    if (card.quantity > 1) {
      setCard((prevState) => {
        return { ...prevState, quantity: card.quantity-- };
      });
    }
    var mycart = localStorage.getItem("cart");
    mycart = JSON.parse(mycart);
    mycart[{ itemdi: "2000001" }] = 2;
  };

  const handleSelect = (event) => {
    if (event.target.checked) {
      setCard((prevState) => {
        return { ...prevState, checked: true };
      });
      props.updateTotal(card.pay);
    } else {
      props.updateTotal(0);
    }
  };

  const handleRemove = () => {
    cartContext.removeItem(card.itemID);
  };

  const toggleRemove = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="checkout-main-row product__cart">
        <div className="checkout-main-col-1">
          <input type="checkbox" onChange={handleSelect}></input>
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
            <label id="product-pay">{card.pay}</label>đ
          </span>
        </div>
        <div className="checkout-main-col-3">
          <IoCloseCircleOutline
            className="checkout__remove_item"
            onClick={toggleRemove}
          />
        </div>
      </div>
      {isOpen && (
        <ConfirmPopUp handleConfirm={handleRemove} handleClose={toggleRemove} />
      )}
    </>
  );
}
