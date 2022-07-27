import { Routes, Route, Outlet } from "react-router-dom";
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
import Admin from "./Admin/AdminDashboard";
import OrderDashboard from "./Admin/OrderDashboard";
import UserDashboard from "./Admin/UserDashboard";
import StockDashboard from "./Admin/StockDashboard";
import UserDetail from "./Admin/UserDetail";
import OrderDetail from "./Admin/OrderDetail";
import CategoryDashboard from "./Admin/CategoryDashboard";
import CategoryDetail from "./Admin/CategoryDetail";
export default function Pages(){
    return(
            <Routes>
                <Route
                    element={(
                        <>
                            <HeadAds/>
                            <Header/>
                            <NavBar/>
                            <Outlet/>
                            <Footer/>
                        </>
                    )}
                >
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/gio-hang" element={<Cart/>}/>
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/products" element={<ProductDetail/>}/>
                </Route>
                <Route path="/user/dang-nhap" element={<SignInWindow/>}/>
                <Route path="/user/dang-ky" element={<SignUpWindow/>}/>
                <Route path="/error" element={<ErrorPage/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/order" element={<OrderDashboard/>}/>
                <Route path="/admin/user" element={<UserDashboard/>}/>
                <Route path="/admin/stock" element={<StockDashboard/>}/>
                <Route path="/admin/user/detail" element={<UserDetail/>}/>
                <Route path="/admin/order/detail" element={<OrderDetail/>}/>
                <Route path="/admin/stock/category" element={<CategoryDashboard/>}/>
                <Route path="/admin/category/detail" element={<CategoryDetail/>}/>
            </Routes>
    )
}