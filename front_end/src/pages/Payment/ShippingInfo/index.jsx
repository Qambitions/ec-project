
export function ShippingInfo(props){
    return(
        <div className='payment__info_container'>
            <div className="payment__info_head">
                <h4>Vận chuyển & Thanh toán</h4>
            </div>
            <div className="payment__info_body">
            <h6>Hình thức vận chuyển</h6>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_shipping" id="GHN" value="GHN"
                onChange={""}></input>
                <small class="form-check-small" for="GHN"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"}></img>Giao hàng nhanh</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_shipping" id="GHTK" value="GHTK"
                onChange={""} ></input>
                <small class="form-check-small" for="GHTK"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"}></img>Giao hàng tiết kiệm</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_shipping" id="ViettelPost" value="ViettelPost"
                onChange={"handleChange"} ></input>
                <small class="form-check-small" for="ViettelPost"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656573798/icon/Logo-Viettel-Post-Transparent_zw5rmz.webp"}></img>Viettel post</small><br></br>
            </div>
            <hr className="line"/>
            <h6>Phương thức thanh toán</h6>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_payment" id="MoMo" value="MoMo"
                onChange={""}></input>
                <small class="form-check-small" for="MoMo"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773279/icon/icon-payment-method-momo_n8gnbv.svg"}></img>Thanh toán bằng ví MoMo</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_payment" id="ZaloPay" value="ZaloPay"
                onChange={""} ></input>
                <small class="form-check-small" for="ZaloPay"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773094/icon/icon-payment-method-zalo-pay_fzqlod.svg"}></img>Thanh toán bằng ví ZaloPay</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_payment" id="VNPay" value="VNPay"
                onChange={"handleChange"} ></input>
                <small class="form-check-small" for="VNPay"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656773206/icon/icon-payment-method-vnpay_zh2dfi.png"}></img>Thanh toán bằng ví VNPay</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_payment" id="PayPal" value="PayPal"
                onChange={"handleChange"} ></input>
                <small class="form-check-small" for="PayPal"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/888870_wptg5q.png"}></img>Thanh toán bằng ví PayPal</small><br></br>
            </div>
            <div className="form-check">
                <input class="form-check-input" type="radio" 
                name="radio_payment" id="COD" value="COD"
                onChange={"handleChange"}></input>
                <small class="form-check-small" for="COD"><img className="payment__icon" src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2543174_viafmp.png"}></img>Thanh toán bằng tiền mặt khi nhận hàng</small><br></br>
            </div>
            </div>
        </div>
    )
}