import "./style.css";
import { Rate } from "antd";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { OverlayTrigger, Table, Popover, Toast } from "react-bootstrap";
import { CommentCard } from "../CommentCard";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import CartContext from "../../context/CartProvider";
const GETDETAIL_URL = "/product/details";

export function ProductDetail() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [ratting, setRatting] = useState([]);
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState([]);
  const [availableBranch, setAvailableBranch] = useState([]);
  const [starAvg, setStarAvg] = useState();
  const [rattingConsult, setRattingConsult] = useState({});


  useEffect(() => {
    fetchDetail();
    setStarAvg(3);
  }, []);

  const handleAddToCart = () => {
    cartContext.addItem(id, quantity, false);
  };

  const fetchDetail = async () => {
    await axios(GETDETAIL_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: { masp: id },
    }).then((res) => {
      setProduct(res.data.item);
      setComments(res.data.item.comment);
      setRatting(res.data.item.sao);
      setAvailableBranch(res.data.item.branch_available);
      calRattingConsult();
    });
    setStarAvg(ratting.avg);
  };

  const calRattingConsult = () => {
    let total = parseInt(product.luot_danh_gia);
    var one = 0;
    var two = 0;
    var three = 0;
    var four = 0;
    var five = 0;
    if (total > 0) {
      one = parseInt((parseInt(ratting["1"]) / total) * 100);
      two = parseInt((parseInt(ratting["2"]) / total) * 100);
      three = parseInt((parseInt(ratting["3"]) / total) * 100);
      four = parseInt((parseInt(ratting["4"]) / total) * 100);
      five = parseInt((parseInt(ratting["5"]) / total) * 100);
    }

    setRattingConsult({
      one_star_percent: one + "%",
      two_star_percent: two + "%",
      three_star_percent: three + "%",
      four_star_percent: four + "%",
      five_star_percent: five + "%",
    });
  };

  const AvailableStorePopOver = (
    <Popover id="popover-basic">
      {availableBranch.length > 0 ? (
        <>
          <Popover.Header as="h3">
            Mặt hàng vẫn còn tại các cửa hàng:
          </Popover.Header>
          {availableBranch.map((item, index) => (
            <Popover.Body key={item.macn}>
              <strong>Chi nhánh {index}:</strong> {item.so_nha_duong}, phường{" "}
              {item.phuong_xa}, Quận {item.quan_tp}, {item.tp_tinh}
            </Popover.Body>
          ))}
        </>
      ) : (
        <Popover.Header as="h3">Sản phẩm đã hết hàng</Popover.Header>
      )}
    </Popover>
  );

  return (
    <div className="body">
      <Breadcrumb className="container breadcrumbs">
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Loại hàng</Breadcrumb.Item>
        <Breadcrumb.Item active>{product?.tensp}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="container product__detail">
        <div className="product__detail_head">
          <img
            className="produtct__detail_head_left"
            src={product?.hinh_anh}
            alt={product?.hinh_anh}
          ></img>
          <div className="product__detail_head_right">
            <h3>{product?.ten_npp}</h3>
            <h5>{product?.tensp}</h5>
            <div className="container__flex">
              <div>
                {ratting?.avg}
                <Rate disabled defaultValue={3}/>
                {product?.luot_danh_gia}
              </div>

              <div>
                <AiOutlineShoppingCart />
                <label>{product?.tong_da_ban}</label>
              </div>
              <label>Mã sản phẩm: {product?.masp}</label>
            </div>
            <div className="container__flex">
              <label className="product__card_price_left">
                {product?.gia_ban_goc}
              </label>
              <label className="product__card_price_right">
                {product?.phan_tram_giam_gia > 0 ? <span>%</span> : <></>}
              </label>
            </div>
            <div className="container__flex">
              <label>Số lượng</label>
              <div className="checkout__product_quantity_indicator">
                <button
                  className="checkout__product_decrease"
                  onClick={() => {
                    if (quantity > 0) setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>
                <input
                  value={quantity}
                  className="checkout__product_input_quantity"
                  type="number"
                ></input>
                <button
                  className="checkout__product_increase"
                  onClick={() => {
                    if (quantity < 50) setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
              <label>{product?.ton_kho}</label>
            </div>
            <div className="container__flex">
              <button className="button_pink" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="button_flex_warp">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={AvailableStorePopOver}
                >
                  <div className="container__flex">
                    <IoLocationSharp className="location__icon" />
                    <label>
                      {availableBranch?.length} chi nhánh còn sản phẩm
                    </label>
                  </div>
                </OverlayTrigger>
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
                <td>{product?.ten_npp}</td>
              </tr>
              <tr>
                <td>Xuất xứ</td>
                {product?.xuat_xu ? <td>Jacob</td> : <></>}
              </tr>
              <tr>
                <td>Khối lượng</td>
                <td>{product?.khoi_luong}</td>
              </tr>
              <tr>
                <td>Hạn sử dụng</td>
                {product?.hsd ? <td>Jacob</td> : <></>}
              </tr>
            </tbody>
          </Table>
          <div className="product__detail_info_title">Mô tả</div>
          <div className="product__detail_info_content">
            <p>{product?.mo_ta}</p>
          </div>
        </div>
        <div className="product__detail_comment">
          <h3>Đánh giá</h3>
          <hr />
          <div className="container__flex rating__overview">
            <div className="rating__overview_left">
              <span>
                <lable className="rating__overview_current_rate">
                  {ratting?.avg}
                </lable>
                /5
              </span>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <label>{product?.luot_danh_gia} đánh giá</label>
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
                  <AiFillStar />
                  <div className="rating__container_grey">
                    <div
                      className="rating__container_red"
                      style={{ width: rattingConsult?.five_star_percent }}
                    ></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiFillStar />
                  <div className="rating__container_grey">
                    <div
                      className="rating__container_red"
                      style={{ width: rattingConsult?.four_star_percent }}
                    ></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiFillStar />
                  <div className="rating__container_grey">
                    <div
                      className="rating__container_red"
                      style={{ width: rattingConsult?.three_star_percent }}
                    ></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiFillStar />
                  <div className="rating__container_grey">
                    <div
                      className="rating__container_red"
                      style={{ width: rattingConsult?.two_star_percent }}
                    ></div>
                  </div>
                </div>
                <div className="rating__overview_right_row">
                  <AiFillStar />
                  <div className="rating__container_grey">
                    <div
                      className="rating__container_red"
                      style={{ width: rattingConsult?.one_star_percent }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="rating__overview_right_col">
                <label>({ratting['5']?.count})</label>
                <label>({ratting['4']?.count})</label>
                <label>({ratting['3']?.count})</label>
                <label>({ratting['2']?.count})</label>
                <label>({ratting['1']?.count})</label>
              </div>
            </div>
          </div>
          {comments.map((item, index) => (
            <CommentCard key={index} obj={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
