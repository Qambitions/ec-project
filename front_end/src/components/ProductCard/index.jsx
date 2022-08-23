import "./style.css";
import pd from "../../assets/logo.png";
import { AiFillStar, AiOutlineShoppingCart } from "react-icons/ai";
import { ProductDetail } from "../ProductDetail";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const obj = props.obj;

  return (
    <Link to={`/product/${obj.masp}`} className="product__card">
      <img
        className="product__card_img"
        src={obj.hinh_anh}
        alt={obj.hinh_anh}
      />
      <div>
        <div className="product__card_price">
          <label className="product__card_price_left">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(obj.gia_ban_giam)}
          </label>
          <label className="product__card_price_right">
            {obj.gia_ban !== obj.gia_ban_giam && (
              <del>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(obj.gia_ban)}{" "}
              </del>
            )}
            {obj?.phan_tram_giam_gia && <span>{obj.phan_tram_giam_gia}%</span>}
          </label>
        </div>
        <h5>{obj.ten_npp}</h5>
        <p>{obj.ten_sp}</p>
        <div className="product__card_info">
          <div>
            <AiFillStar className="product__card_rating_star" />
            <AiFillStar className="product__card_rating_star" />
            <AiFillStar className="product__card_rating_star" />
            <AiFillStar className="product__card_rating_star" />
            <AiFillStar className="product__card_rating_star" />
            <span>({obj.sao.avg})</span>
            <span>
              | <AiOutlineShoppingCart />
            </span>
            <span>{obj.tong_da_ban}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
