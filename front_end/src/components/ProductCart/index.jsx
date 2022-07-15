import { useEffect } from "react";
import { useState } from "react"
import './style.css'
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ProductCart(props){
    var [card,setCard]=useState({
        quantity:1,
        price:175000,
        pay:175000
    });


    useEffect(()=>{
        setCard(prevState =>{
            return {...prevState, pay: card.price * card.quantity}
        });
    },[card.quantity])

    var updateQuantity = event =>{
        var target = event.target
        var value = target.value
        setCard(prevState=>{
            return{...prevState, quantity:value}
        });
    }

    const handlePick = event=>{
        if(event.target.checked){
            props.updateTotal(card.pay)
        }
        else{
            props.updateTotal(0)
        }
    }

    return(
        <div  className="checkout-main-row">
            <div className="checkout-main-col-1">
                <input type="checkbox" onChange={handlePick}></input>
            </div>
            <div className="checkout-main-col-2">
                <div className="checkout__product-card">
                    <a href="https://www.petmart.vn/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito">
                    <img className="checkout__cart_product_img" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065284/food/sup-thuong-cho-meo-vi-ca-ngu-ca-chep-ciao-tuna-bonito_h9a9du.webp"}></img>
                    </a>
                    <p>Súp thưởng cho mèo vị cá ngừ cá chép CIAO Tuna & Bonito</p>
                </div>
            </div>
            <div className="checkout-main-col-3">
                <div className="checkout-product-info">
                    <label id='product-price'>{card.price}</label>
                </div>
            </div>
            <div className="checkout-main-col-3">
                <div className="checkout__product_quantity_indicator">
                    <button className="checkout__product_decrease">-</button>
                    <input className="checkout__product_input_quantity" type="number"></input>
                    <button  className="checkout__product_increase">+</button>
                </div>
            </div>
            <div className="checkout-main-col-3">{card.pay}</div>
            <div className="checkout-main-col-3"><IoCloseCircleOutline className="checkout__remove_item"/></div>
        </div>
    )
}