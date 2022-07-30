import { createContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [auth, setAuth] = useState({
        uid: '',
        uname: '',
        uemail: '',
        uphone: '',
        valid: false,
    });

    const toggleLogout = () =>{
        Cookies.remove("token");
    }

    const toggleLoggin = () =>{
        setAuth(auth.valid=true);
    }   

    return (
        <AuthContext.Provider value={{ auth, setAuth, toggleLogout, toggleLoggin  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;