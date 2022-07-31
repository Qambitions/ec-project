import ProductCard from "../../components/ProductCard";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
const SEARCH_URL = "/product/search";
export default function Catalog(props) {
  let { str } = useParams();
  const [productCards, setProductCards] = useState([]);
  useEffect(() => {
    fetchDetail();
  }, [str]);

  const fetchDetail = async () => {
    await axios(SEARCH_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: { search_str: str },
    }).then((res) => {
      console.log(res.data.item);
      setProductCards(res.data.item);
    });
  };

  return (
    <div className="body">
      <div className="container categorypage">
        <div className="homepage_section_head_title">
          <img
            src={
              "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832641/icon/3031293_idppe3.png"
            }
          ></img>
          <h1>Tìm kiếm: {str}</h1>
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
