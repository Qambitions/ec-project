import "./style.css";
import ProductCard from "../../../components/ProductCard";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useLocation, useParams } from "react-router-dom";
const GETVIEW_URL = "/product/view";
export default function CategoryPage(props) {
  let { categories } = useParams();
  const [productCards, setProductCards] = useState([]);
  const location = useLocation();
  const fetchDetail = async () => {
    await axios(GETVIEW_URL, {
      method: "GET",
      params: { malh: categories, limit: 15, offset: 0 },
    }).then((res) => {
      setProductCards(res.data.items);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, [location.state.from]);

  return (
    <div className="body">
      <div className="container categorypage">
        <div className="homepage_section_head_title">
          <h1>{location.state.from}</h1>
          <img
            src={
              "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/1312091_qharxb.png"
            }
          ></img>
        </div>

        <DropdownButton
          align="end"
          title="Sắp xếp"
          id="dropdown-menu-align-end"
          style={{
            backgroundColor: "#F9F8F8",
            textAlign: "right",
          }}
        >
          <Dropdown.Item eventKey="1">Phổ biến nhất</Dropdown.Item>
          <Dropdown.Item eventKey="2">A - Z</Dropdown.Item>
          <Dropdown.Item eventKey="3">Z - A</Dropdown.Item>
          <Dropdown.Item eventKey="4">Giá tăng dần</Dropdown.Item>
          <Dropdown.Item eventKey="5">Giá giảm dần</Dropdown.Item>
        </DropdownButton>
        <div className="homepage_section_head_title">
          <br />
        </div>
        <div className="homepage_section_container">
          {productCards.map((item) => (
            <ProductCard key={item.masp} obj={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
