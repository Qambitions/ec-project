import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";
import { decrypt10 } from "../utils/crypto";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({});
    const [info,setInfo]=useState({});
    const [deliveryAddress,setDeliveryAddress] = useState([]);

    

    useEffect(()=>{

        getInfo();
        getDelivery();
        let time = Cookies.get("login_time")
        let token = Cookies.get("token_u")
        let decrypted = decrypt10(token,time);
        if (decrypted==="30") {
            let info = {roles:[2],user:'test'}
            setAuth(info)
        } else if (decrypted==="31"){
            let info = {roles:[1],user:'test'}
            setAuth(info)
        }
        
        console.log("decrypted",decrypted)
        console.log("time",Cookies.get("login_time"))
        console.log("token",Cookies.get("token_u"))
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

    const value ={auth,toggleLogout,setDeliveryAddress,handleLogin,info,deliveryAddress}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;