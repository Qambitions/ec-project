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
      </Route>
      <Route path="/user/dang-nhap" element={<SignInWindow />} />
      <Route path="/user/dang-ky" element={<SignUpWindow />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
