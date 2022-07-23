// import List from "../list/List";
// import Single from "../single/Single";
// import New from "../new/New";
// import Home from "../home/Home";
// import {productInputs, userInputs}  from "../formSource";
import {Layout} from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderDashboard from "../OrderDashboard";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
import Widget from "../../../components/widget/Widget";
// import "./style.css";


const { Header, Content, Footer, Sider } = Layout;

export default function Admin() {
  return (
    <>
    <Layout >
    <div className="row">
      <div className="col-2"><Sidebar/></div>
     <div className="col-10">
     <AdminNavbar 
     title="THỐNG KÊ"/>
       <div className="row">
         <div className="col-5">
            <div class="card text-white bg-primary mb-3">
                <div class="card-header">USERS</div>
                <div class="card-body">
                  <h5 class="card-title">1234</h5>
                </div>
            </div>
         </div>

         <div className="col-5">
            <div class="card text-white bg-info mb-3">
                <div class="card-header">ORDERS</div>
                <div class="card-body">
                  <h5 class="card-title">1234</h5>
                </div>
            </div>
         </div>

       </div>

       

      {/* <div className="widgets">
        <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
          </div> */}

    </div>
    </div>
    </Layout>
   
      
     {/* <div className="col-10"><AdminNavbar /></div> */}
     {/* <div className="col-10"><OrderDashboard/></div> */}
    

    </>
    
  );
}
