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

    const toggleLoggin =async(username, password) =>{
        if (username && password) {
            try {
              const res = await axios.post(process.env.REACT_APP_LOGIN_URL, {
                username: username,
                password: password,
              });
    
              if (res.data.exitcode === 0) {
                Cookies.set("token", res.data.token, {
                  expires: 1,
                  path: "/",
                  sameSite: "strict",
                  secure: true,
                });
                localStorage.setItem(
                  "account_info",
                  JSON.stringify(res.data.account_info)
                );
                let info = { user: 'username', roles: [1] }
                // console.log(info)
                // setAuth(info)
                // setAuth({ user: username, roles: [1] });
                return res.data.exitcode;


              } else if (res.data.exitcode === 104) {
                console.log("sai roi");
                return res.data.exitcode
              }
            } catch (error) {}
          }
    } 

    const value ={auth,toggleLogout,setDeliveryAddress,handleLogin,info,deliveryAddress}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;