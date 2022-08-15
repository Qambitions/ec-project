import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";
const OrdersContext = createContext({});

export const OrdersProvider = ({ children }) =>{
    const [viewDetail,setViewDetail]=useState(false);
    const [orderID,setOrderID]=useState();
    const value ={viewDetail,setViewDetail,orderID,setOrderID}

    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    )
}

export default OrdersContext;