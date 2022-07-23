import "./style.css";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import AdminNavbar from "../../../components/NavBar/Navbar";
export default function UserDashboard  () {
  // const [data, setData] = useState(userRows);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const data = [
    {
      id: '001',
      email: 'ND001@gmail.com',
      level: 'Norrmal',
      status: 'active'
    },
    {
      id: '002',
      email: 'ND002@gmail.com',
      level: 'Normal',
      status: 'active'
    },
    {
      id: '003',
      email: 'ND003@gmail.com',
      level: 'Gold',
      status: 'blocked'
    },
    {
      id: '004',
      email: 'ND004@gmail.com',
      level: 'Silver',
      status: 'active'
    },
    {
      id: '005',
      email: 'ND005@gmail.com',
      level: 'Normal',
      status: 'active'
    },
    {
      id: '006',
      email: 'ND006@gmail.com',
      level: 'Normal',
      status: 'blocked'
    },

  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              //onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
    <div className="row">
     <div className="col-2"><Sidebar/></div>  
     <div className="col-10">
     <div>
        {/* <Link to="/users/new" className="link">
          <button type="button" className="btn-sm btn-primary">
                    Add new
          </button>
        </Link> */}
      </div>
     <AdminNavbar title ="Quản lý user"
     text = "Tổng số user"
     count = "234"/>

      <table class="table align-middle mb-0">
        <thead class="bg-light">
          <tr>
            <th>Mã khách hàng</th>
            <th>Email</th>
            <th>Cấp bậc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
              return (
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="ms-3">
                        <p class="fw-bold mb-1">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="fw-normal mb-1">{item.email}</p>
                    {/* <p class="text-muted mb-0">IT department</p> */}
                  </td>
                  <td>{item.level}</td>
                  <td>
                  {item.status == "active" ? <span className="badge badge-active">{item.status}</span> : 
                  <span className="badge badge-block">{item.status}</span> }
                    
                  </td>
                  
                  <td>
                    <button type="button" className="btn-sm btn-primary">
                      {item.status == "active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              )
          })}

          
        </tbody>
      </table>

     </div>
     </div>
      
      
    </>
  );
};


