import './style.css'
import { useState } from 'react';
import ProductCart from '../../components/ProductCart';
import { IoTrashBin } from "react-icons/io5";
import VoucherPopUp from '../../components/ProductCart/VoucherPopUp'
import { VoucherPicker } from '../../components/VoucherPicker';

export default function Cart(){

    const [total,setInvoice]=useState(0);
    var paymentType="";
    const handleSubmit = event =>{
        if(paymentType==="MoMo"){
            // momoCall();
            console.log("Call momo api")
        }
        if(paymentType==="ZaloPay"){
            console.log("Call zalo api")
        }
        if(paymentType==="VNPay"){
            console.log("Call vnpay api")
        }
        if(paymentType==="PayPal"){
            console.log("Call paypal api")
        }
    }

    const handleChange = event =>{
        const target = event.target
        const value = target.value
        paymentType = value;
    }

    return(
        <>
            <div className="body">
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
                            <div className="checkout-main-col-3"><IoTrashBin/></div>
                        </div>
                        <ProductCart updateTotal={total => setInvoice(total)}/>
                        <ProductCart updateTotal={total => setInvoice(total)}/>
                    </div>
                    <div className="checkout-aside">
                        <div className="checkout-product-invoice">
                            <h4>Hóa đơn của bạn</h4>
                            <hr/>
                            <div>
                                <label>Tạm tính:</label>
                                <text>đ</text>
                            </div>
                            <div>
                                <label>Giảm giá: </label>
                                <text>đ</text>
                            </div>
                            <hr/>
                            <label>Tổng cộng: </label>
                            <p>(đã bao gồm VAT)</p>
                        </div>
                        <div className="checkout-aside-coupon-container">
                            <VoucherPicker/>
                        </div>
                        <button onClick={handleSubmit} className="btn-buy-confirm">Mua hàng</button>
                        <div>
                        <VoucherPopUp/>
                </div>
                    </div>
                </div>
            </div>
        </>
    )
}