import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({roles:[1,2],user:'ntnd1'});
    const [info,setInfo]=useState({});
    const [deliveryAddress,setDeliveryAddress] = useState([]);
    useEffect(()=>{
        getInfo();
        getDelivery();
    },[])

    const getDelivery = async() =>{
        await axios(process.env.REACT_APP_GET_DELIVERY_INFO, {
            method: "GET",
            headers: {
                token: Cookies.get("token"),
            },
          }).then((res) => {
            setDeliveryAddress(res.data.list_address)
          });
    }

    const getInfo = () =>{
        var info = JSON.parse(localStorage.getItem("account_info"));
        setInfo(info);
    }

    const handleLogin= () =>{
        console.log("chay vo day")
    }

    const toggleLogout = () =>{
        Cookies.remove("token");
    }

    const toggleLoggin = () =>{
        setAuth(prevState=>{return{...prevState, valid:true}});
    }   

    const value ={auth,toggleLogout, toggleLoggin ,setDeliveryAddress,handleLogin,setAuth,info,deliveryAddress}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;