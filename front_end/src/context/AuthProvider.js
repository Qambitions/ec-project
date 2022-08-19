import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../../src/api/axios";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{

    const [auth, setAuth] = useState({user:'test'});
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
      localStorage.removeItem("account_info")
        localStorage.removeItem("checkoutInfo")
        Cookies.remove("token");
        Cookies.remove("token_u")
        Cookies.remove("login_time");
        setAuth({});
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
                  secure: false,
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