import "./style.css";
import { FiThumbsUp } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";
export function CommentCard(props) {
  const obj = props.obj;
  return (
    <>
      <div className="container__flex comment__card">
        <img
          src={
            "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2423830_yxc5kd.png"
          }
          style={{ height: "50px" }}
        ></img>
        <div>
          <h5>{obj.tenkh}</h5>
          <div className="container__flex" style={{ color: "grey" }}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            |<label style={{ color: "grey" }}>{obj.ngay_dang}</label>
          </div>
          <p>{obj.noi_dung}</p>
          <FiThumbsUp
            className="comment__card_thumbsup"
            style={{ color: "#A4B4C9" }}
          />
          <label style={{ color: "#A4B4C9" }}>5</label>
        </div>
      </div>
      <hr></hr>
    </>
  );
}
