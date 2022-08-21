import { Routes, Route, Outlet } from "react-router-dom";
import { HeadAds } from "../components/Advertise";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Homepage from "../pages/Shop/Homepage";
import SignInWindow from "./SignIn";
import SignUpWindow from "../pages/Shop/SignUp";
import Cart from "../pages/Shop/Cart";
import ErrorPage from "./Error";
import Footer from "../components/Footer";
import { ProductDetail } from "../components/ProductDetail";
import Checkout from "../pages/Shop/Checkout";
import CategoryPage from "../pages/Shop/CategoryPage";
import Catalog from "../components/Catalog";
import CustomerDashboard from "../pages/Shop/CustomerDashboard";
import Dashboard from "./Admin/AdminDashboard";
import OrderDashboard from "./Admin/OrderDashboard";
import UserDashboard from "./Admin/UserDashboard";
import StockDashboard from "./Admin/StockDashboard";
import UserDetail from "./Admin/UserDetail";
import OrderDetail from "./Admin/OrderDetail";
import CategoryDashboard from "./Admin/CategoryDashboard";
import CategoryDetail from "./Admin/CategoryDetail";
import ImportDashboard from "./Admin/ImportDashboard";
import ImportDetail from "./Admin/ImportDetail";
import RequireAuth from "../components/RequireAuth";
import {
  FailTransaction,
  SuccessTransaction,
} from "../components/TransactionPopUp";
const ROLES = {
  User: process.env.REACT_APP_ROLE_USER,
  Admin: process.env.REACT_APP_ROLE_ADMIN,
};

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
        <Route
          element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}
        >
          <Route path="user">
            <Route
              path="/user/myorder"
              element={<CustomerDashboard page={"orders"} />}
            ></Route>
            <Route
              path="/user/account"
              element={<CustomerDashboard page={"account"} />}
            ></Route>
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/checkout" element={<Checkout />} />
          </Route>
          <Route path="/payment/fail" element={<FailTransaction />} />
          <Route path="/payment/success" element={<SuccessTransaction />} />
        </Route>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/view/:categories" element={<CategoryPage />} />
        <Route path="/search/:str" element={<Catalog />} />
      </Route>
      <Route path="/user/dang-nhap" element={<SignInWindow />} />
      <Route path="/user/dang-ky" element={<SignUpWindow />} />
      <Route path="*" element={<ErrorPage />} />
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/order" element={<OrderDashboard />} />
        <Route path="/admin/user" element={<UserDashboard />} />
        <Route path="/admin/stock" element={<StockDashboard />} />
        <Route path="/admin/user/:user_id" element={<UserDetail />} />
        <Route path="/admin/order/:order_id" element={<OrderDetail />} />
        <Route path="/admin/stock/category" element={<CategoryDashboard />} />
        <Route
          path="/admin/category/:category_id"
          element={<CategoryDetail />}
        />
        <Route path="/admin/stock/import" element={<ImportDashboard />} />
        <Route path="/admin/import/:po_id" element={<ImportDetail />} />
        <Route path="/admin/all-products" element={<CategoryDetail />} />
      </Route>
    </Routes>
  );
}
