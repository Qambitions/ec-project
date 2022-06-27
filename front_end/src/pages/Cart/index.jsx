import './style.css'


export default function Cart(){
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
        <div>
            {/* <Header/> */}
            <div className="body">
            <h3 className="container">giỏ hàng</h3>
                <div className="container cart-body">
                    <div className="checkout-product-card">
                        <div className="checkout-main-header">
                            <label>Mã sản phẩm</label>
                            <label>Tên sản phẩm</label>
                            <label>Giá tiền</label>
                            <label>Số lượng </label>
                        </div>
                        <div className="checkout-product-info">
                            <input placeholder="Mã sản phẩm"></input>
                        </div>
                        <div className="checkout-product-info">
                            <input placeholder="Tên sản phẩm"></input>
                        </div>
                        <div className="checkout-product-info">
                            <input placeholder="Giá tiền" type="number"></input>
                        </div>
                        <div className="checkout-product-info">
                        <input type="number" value ="1" min="0" oninput="this.value = Math.abs(this.value)"></input>
                        </div>
                        <div className="checkout-product-info">
                        {/* <IoCloseCircleOutline /> */}
                        </div>
                    </div>
                    <div className="checkout-aside">
                        <div className="checkout-product-invoice">
                            <h3>Hóa đơn của bạn</h3>
                            <div>
                                <label>Tạm tính:</label>
                                <text>đ</text>
                            </div>
                            <div>
                                <label>Tổng cộng:</label>
                                <text>đ</text>
                            </div>
                        </div>
                        <div className="checkout-aside-coupon">
                            <input placeholder="Nhập voucher"></input>
                        </div>
                        <button onClick={handleSubmit} className="btn-buy-confirm">Thanh toán</button>
                        <div>
                    <p>Chọn hình thức thanh toán</p>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" 
                        name="fav_language" id="MoMo" value="MoMo"
                        onChange={handleChange}></input>
                        <label class="form-check-label" for="MoMo">Thanh toán bằng ví MoMo</label><br></br>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" 
                        name="fav_language" id="ZaloPay" value="ZaloPay"
                        onChange={handleChange} ></input>
                        <label class="form-check-label" for="ZaloPay">Thanh toán bằng ví ZaloPay</label><br></br>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" 
                        name="fav_language" id="VNPay" value="VNPay"
                        onChange={handleChange} ></input>
                        <label class="form-check-label" for="VNPay">Thanh toán bằng ví VNPay</label><br></br>
                    </div>
                    <div className="form-check">
                        <input class="form-check-input" type="radio" 
                        name="fav_language" id="PayPal" value="PayPal"
                        onChange={handleChange}></input>
                        <label class="form-check-label" for="PayPal">Thanh toán bằng ví PayPal</label><br></br>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}