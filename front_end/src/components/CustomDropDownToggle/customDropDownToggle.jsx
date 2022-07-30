import { BsPersonFill } from "react-icons/bs";
import React from "react";
import './style.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="a"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <div className="user__dropdown">
      <BsPersonFill/>
    </div>
  </a>
));
export default CustomToggle;
