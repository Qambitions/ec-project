import "./navbar.css";


import {AiOutlineOrderedList, AiOutlineSearch, AiOutlineBell} from "react-icons/ai";

export default function AdminNavbar (props) { 
  return (
    <>
    <div className="navbar">
      <div className="wrapper">
        <h4 className="title">{props.title}</h4>
        <div className="items">
          
          <div className="item">
            <AiOutlineBell className="icon"/>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
    {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <AiOutlineSearch />
        </div> */}
      <div className="text">
        <div className="total-text">
        <h5> {props.text} :  </h5>
        <h5 className="text-custom"> {props.count}</h5>
          </div>
        <div className="input-search">
          <div class="form-outline">
            <input type="search" id="form1" class="form-control" />
          </div>
          <button type="button" class="btn-sm btn-custom">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

    </>
  );
};
