import ProductCard from "../ProductCard";
import "./style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
const GETVIEW_URL = "/product/view";

export default function HomepageSection(props) {
  const [productCards, setProductCards] = useState([]);
  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    await axios(GETVIEW_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: { malh: props.malh, limit: props.limit, offset: props.offset },
    }).then((res) => {
      console.log(res.data.item);
      setProductCards(res.data.item);
    });
  };

  return (
    <div className="container homepage_section">
      <div className="homepage_section_head">
        <div className="homepage_section_head_title">
          <h1>{props.header}</h1>
          <img src={props.icon}></img>
        </div>
        <Link to={`/${props.malh}`}>
          Xem tất cả
          <img
            style={{ height: "20px" }}
            src={
              "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832641/icon/3272665_gztrje.png"
            }
          ></img>
        </Link>
      </div>
      <hr />
      <div className="homepage_section_container">
        {productCards.map((item) => (
          <ProductCard key={item.masp} obj={item} />
        ))}
      </div>
    </div>
  );
}
