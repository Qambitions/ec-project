// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";

// import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Table from "../../components/table/Table";

import List from "../../../components/table/Table";
import Table from "../../../components/table/Table";
import Featured from "../../../components/featured/Featured";
import Widget from "../../../components/widget/Widget";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./home.css";
import AdminNavbar from "../../../components/NavBar/Navbar";

export default function Home() {
  return (
    <div className="home">
      <Sidebar />
      <div>
        <AdminNavbar />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    
  );
};

