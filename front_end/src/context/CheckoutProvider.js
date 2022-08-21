import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";
const CheckoutContext = createContext({});

export const CheckoutProvider = ({ children }) =>{
    const [shippingMethod, setShippingMethod]= useState();
    const [shippingPrice, setShippingPrice]=useState();
    const [deliveryInfo, setDeliveryInfo]=useState();
    const [tempPay, setTempPay] = useState(10);
    const [discount, setDiscount] = useState(0);
    const value ={deliveryInfo, setDeliveryInfo,shippingPrice, setShippingPrice,shippingMethod, setShippingMethod,tempPay, setTempPay,discount, setDiscount}

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutContext;