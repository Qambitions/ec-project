import ProductCard from "../../components/ProductCard";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
const SEARCH_URL = "/product/search";
export default function Catalog(props) {
  let { str } = useParams();
  const [productCards, setProductCards] = useState([]);
  const [filter, setFilter] = useState("Săp xếp");
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
  const popularSort = () => {
    var arr = productCards;
    arr.sort((a, b) => b.tong_da_ban - a.tong_da_ban);
    setProductCards(arr);
  };

  const alphabetSort = () => {
    var arr = productCards;
    arr.sort((a, b) => {
      let cur = a.ten_npp.toUpperCase();
      let next = b.ten_npp.toUpperCase();
      if (cur < next) {
        return -1;
      }
      if (cur > next) {
        return 1;
      }
      return 0;
    });
    console.log(arr);
    setProductCards(arr);
  };

  const inAlphabetSort = () => {
    var arr = productCards;
    arr.sort((a, b) => {
      let cur = a.ten_npp.toUpperCase();
      let next = b.ten_npp.toUpperCase();
      if (cur < next) {
        return 1;
      }
      if (cur > next) {
        return -1;
      }
      return 0;
    });
    console.log(arr);
    setProductCards(arr);
  };

  const priceIncreaseSort = () => {
    var arr = productCards;
    arr.sort((a, b) => a.gia_ban_giam - b.gia_ban_giam);
    setProductCards(arr);
  };

  const priceDecreaseSort = () => {
    var arr = productCards;
    arr.sort((a, b) => b.gia_ban_giam - a.gia_ban_giam);
    setProductCards(arr);
  };
  const handleFilter = (type) => {
    setFilter(type);
    switch (type) {
      case "Phổ biến nhất": {
        popularSort();
        console.log(productCards);
        break;
      }

      case "A-Z": {
        alphabetSort();
        break;
      }

      case "Z-A": {
        inAlphabetSort();
        break;
      }

      case "Giá tăng dần": {
        priceIncreaseSort();
        break;
      }

      case "Giá giảm dần": {
        priceDecreaseSort();
        break;
      }

      default:
        break;
    }
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
          title={filter}
          id="dropdown-menu-align-end"
          style={{
            backgroundColor: "#F9F8F8",
            textAlign: "right",
          }}
        >
          <Dropdown.Item
            eventKey="1"
            onClick={() => handleFilter("Phổ biến nhất")}
          >
            Phổ biến nhất
          </Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => handleFilter("A-Z")}>
            A - Z
          </Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => handleFilter("Z-A")}>
            Z - A
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="4"
            onClick={() => handleFilter("Giá tăng dần")}
          >
            Giá tăng dần
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="5"
            onClick={() => handleFilter("Giá giảm dần")}
          >
            Giá giảm dần
          </Dropdown.Item>
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
