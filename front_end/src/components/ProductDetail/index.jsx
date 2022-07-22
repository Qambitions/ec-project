import "./style.css";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { Table } from "react-bootstrap";
import { CommentCard } from "../CommentCard";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const GETDETAIL_URL = "/product/details";

export function ProductDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    await axios(GETDETAIL_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: { masp: id },
    }).then((res) => {
      console.log(res.data.item);
      setProduct(res.data.item);
    });
  };

  return (
    <div className="body">
      <Breadcrumb className="container breadcrumbs">
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Loại hàng</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.tensp}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container product__detail">
        <div className="product__detail_head">
          <img
            className="produtct__detail_head_left"
            src={product.hinh_anh}
            alt={product.hinh_anh}
          ></img>
          <div className="product__detail_head_right">
            <h3>Nhãn hiệu</h3>
            <h5>{product.tensp}</h5>
            <div className="container__flex">
              <div>
                {/* {product.sao.avg} */}
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                {product.luot_danh_gia}
              </div>
              <div>
                <AiOutlineShoppingCart />
                <label>{product.tong_da_ban}</label>
              </div>
              <label>Mã sản phẩm: {product.masp}</label>
            </div>
            <div className="container__flex">
              <label className="product__card_price_left">
                {product.gia_ban_goc}
              </label>
              <label className="product__card_price_right">
                {product.gia_ban_giam}
                <span>%</span>
              </label>
            </div>
            <div className="container__flex">
              <label>Số lượng</label>
              <div className="checkout__product_quantity_indicator">
                <button className="checkout__product_decrease">-</button>
                <input
                  className="checkout__product_input_quantity"
                  type="number"
                ></input>
                <button className="checkout__product_increase">+</button>
              </div>
              <label>{product.ton_kho}</label>
            </div>
            <div className="container__flex">
              <button className="button_pink">Thêm vào giỏ hàng</button>
              <button className="button_flex_warp">
                <div className="container__flex">
                  <IoLocationSharp className="location__icon" />
                  <label>chi nhánh</label>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="product__detail_info">
          <h3>Thông tin sản phẩm</h3>
          <hr></hr>
          <div className="product__detail_info_title">Thông tin chi tiết</div>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Thương hiệu</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Xuất xứ</td>
                <td>Jacob</td>
              </tr>
              <tr>
                <td>Khối lượng</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Hạn sử dụng</td>
                <td>Jacob</td>
              </tr>
            </tbody>
          </Table>
          <div className="product__detail_info_title">Mô tả</div>
          <div className="product__detail_info_content">
            <p>{product.mo_ta}</p>
          </div>
        </div>
        <div className="product__detail_comment">
          <h3>Đánh giá</h3>
          <hr />
          <div className="container__flex rating__overview">
            <div className="rating__overview_left">
              <span>
                <lable className="rating__overview_current_rate">2</lable>
                /5
              </span>
              <div>
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
              <label>đánh giá</label>
            </div>
            <div className="rating__overview_right">
              <div className="rating__overview_right_col">
                <label>5</label>
                <label>4</label>
                <label>3</label>
                <label>2</label>
                <label>1</label>
              </div>
              <div className="rating__overview_right_col">
                <div className="rating__overview_right_row">
                  <AiOutlineStar />
                  <div className="rating__container_grey">
                    <div className="rating__container_red"></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiOutlineStar />
                  <div className="rating__container_grey">
                    <div className="rating__container_red"></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiOutlineStar />
                  <div className="rating__container_grey">
                    <div className="rating__container_red"></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiOutlineStar />
                  <div className="rating__container_grey">
                    <div className="rating__container_red"></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiOutlineStar />
                  <div className="rating__container_grey">
                    <div className="rating__container_red"></div>
                  </div>
                </div>
              </div>
              <div className="rating__overview_right_col">
                <label>(22)</label>
                <label>(22)</label>
                <label>()</label>
                <label>()</label>
                <label>(123)</label>
              </div>
            </div>
          </div>
          <CommentCard />
        </div>
      </div>
    </div>
  );
}
