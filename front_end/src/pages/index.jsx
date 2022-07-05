import { Routes, Route } from "react-router-dom";
import { HeadAds } from "../components/Advertise";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Homepage from './Homepage';
import SignInWindow from "./SignIn";
import SignUpWindow from "./SignUp";
import Cart from "./Cart";
import ErrorPage from "./Error";
import Footer from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";
import Payment from "./Payment";

export default function Pages(){
    return(
        <>
            <HeadAds/>
            <Header/>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/user/dang-nhap" element={<SignInWindow/>}/>
                <Route path="/user/dang-ky" element={<SignUpWindow/>}/>
                <Route path="/gio-hang" element={<Cart/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/product" element={<ProductDetail/>}/>
                <Route path="/payment" element={<Payment/>}/>
            </Routes>
            <Footer/>
        </>
    )
}