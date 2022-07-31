import { Routes, Route, Outlet } from "react-router-dom";
import { HeadAds } from "../components/Advertise";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Homepage from "./Homepage";
import SignInWindow from "./SignIn";
import SignUpWindow from "./SignUp";
import Cart from "./Cart";
import ErrorPage from "./Error";
import Footer from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";
import Payment from "./Payment";
import CategoryPage from "./CategoryPage";
import Catalog from "../components/Catalog";
import CustomerDashboard from "./CustomerDashboard";
import Orders from "./CustomerDashboard/Orders";

export default function Pages() {
  return (
    <Routes>
      <Route
        element={
          <>
            <HeadAds />
            <Header />
            <NavBar />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route path="/" element={<Homepage />} />
        <Route path="/gio-hang" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/view/:categories" element={<CategoryPage />} />
        <Route path="/search/:str" element={<Catalog />} />
        <Route path="user">
          <Route path="/user/myorder" element={<Orders />}></Route>
          <Route path="/user/account" element={<CustomerDashboard />}></Route>
        </Route>
      </Route>
      <Route path="/user/dang-nhap" element={<SignInWindow />} />
      <Route path="/user/dang-ky" element={<SignUpWindow />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/admin" element={<Dashboard/>}/>
      <Route path="/admin/order" element={<OrderDashboard/>}/>
      <Route path="/admin/user" element={<UserDashboard/>}/>
      <Route path="/admin/stock" element={<StockDashboard/>}/>
      <Route path="/admin/user/detail" element={<UserDetail/>}/>
      <Route path="/admin/order/:order_id" element={<OrderDetail/>}/>
      <Route path="/admin/stock/category" element={<CategoryDashboard/>}/>
      <Route path="/admin/category/detail" element={<CategoryDetail/>}/>
      <Route path="/admin/stock/import" element={<ImportDashboard/>}/>
      <Route path="/admin/import/detail" element={<ImportDetail/>}/>
    </Routes>
  );
}
