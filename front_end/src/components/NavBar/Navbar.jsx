import "./navbar.css";
import {
  Card,
} from "react-bootstrap";
import { BsSearch } from 'react-icons/bs'
import { AiOutlineBell} from "react-icons/ai";

export default function AdminNavbar (props) { 

  return (
    <>
    <Card className="card-plain table-plain-bg">
              <Card.Body className="navbar">
                <h3 className="text-danger">{props.title}</h3>
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

              </Card.Body>
              {props.text ? <>
                <Card.Body>
                <div className="text">
                  <div className="total-text">
                  <h5> {props.text}: &nbsp;&nbsp;&nbsp;&nbsp;</h5>
                  <h1 className="text-custom"> {props.count}</h1>
                    </div>  
                    <div className='search-bar'>
            <input className="search-bar-search-field"placeholder='Tìm kiếm'></input>
            <div className='search-icon'><BsSearch/></div>
        </div>
                </div>
              </Card.Body>
              </>: <></>}
              </Card>
    </>
  );
};

