import "./list.css"

import Datatable from "../../components/datatable/Datatable"
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";

export default function List() {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <AdminNavbar/>
        <Datatable/>
      </div>
    </div>
  )
}
