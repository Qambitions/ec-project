import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";
const CheckoutContext = createContext({});

export const CheckoutProvider = ({ children }) =>{
    const [shippingMethod, setShippingMethod]= useState();
    const [shippingPrice, setShippingPrice]=useState();
    const [deliveryInfo, setDeliveryInfo]=useState();
    const value ={deliveryInfo, setDeliveryInfo,shippingPrice, setShippingPrice,shippingMethod, setShippingMethod}

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export default CheckoutContext;