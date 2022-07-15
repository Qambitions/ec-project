import './style.css'
import {AiFillStar,AiOutlineStar,AiOutlineShoppingCart} from "react-icons/ai";
import {IoLocationSharp} from "react-icons/io5";
import {Table} from 'react-bootstrap'
import { CommentCard } from '../CommentCard';

export function ProductDetail(props){
    return(
        <div className='body'>
            <div className='container product__detail'>
            <div className='product__detail_head'>
                <img className='produtct__detail_head_left' src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065289/food/pate-cho-meo-vi-nuoc-sot-thit-bo-whiskas-beef-flavour-sauce_rfdzzi.webp"} alt={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656065289/food/pate-cho-meo-vi-nuoc-sot-thit-bo-whiskas-beef-flavour-sauce_rfdzzi.webp"}></img>
                <div className='product__detail_head_right'>
                    <h3>Nhãn hiệu</h3>
                    <h5>Tên sản phẩm</h5>
                    <div className='container__flex'>
                        <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        ()
                        </div>
                        <div><AiOutlineShoppingCart/></div>
                        <div>Mã sản phẩm:</div>
                    </div>
                    <div className='container__flex'>
                        <label className='product__card_price_left'>price</label>
                        <label className='product__card_price_right'>price<span>%</span></label>
                    </div>
                    <div className='container__flex'>
                        <label>Số lượng</label>
                        <div className="checkout__product_quantity_indicator">
                            <button className="checkout__product_decrease">-</button>
                            <input className="checkout__product_input_quantity" type="number"></input>
                            <button  className="checkout__product_increase">+</button>
                        </div>
                        <label>stock</label>
                    </div>
                    <div className='container__flex'>
                        <button className='button_pink'>Thêm vào giỏ hàng</button>
                        <button className='button_flex_warp'>
                            <div className='container__flex'>
                                <IoLocationSharp className='location__icon'/>
                                <label>chi nhánh</label>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='product__detail_info'>
                <h3>Thông tin sản phẩm</h3>
                <hr></hr>
                <div className='product__detail_info_title'>Thông tin chi tiết</div>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr>
                        <td>Thương hiệu</td>
                        <td>Mark</td>
                        </tr>
                        <tr>
                        <td>Xuất xứ</td>
                        <td>Jacob</td>
                        </tr>
                        <tr>
                        <td>Khối lượng</td>
                        <td>Jacob</td>
                        </tr>
                        <tr>
                        <td>Hạn sử dụng</td>
                        <td>Jacob</td>
                        </tr>
                    </tbody>
                </Table>
                <div className='product__detail_info_title'>Mô tả</div>
                <div className='product__detail_info_content'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora laborum, exercitationem similique consectetur impedit quaerat nemo quod esse maxime doloremque ipsa aspernatur dolore sit, repellat dicta. Provident minima ad harum!</p>
                </div>
            </div>
            <div className='product__detail_comment'>
                <h3>Đánh giá</h3>
                <hr/>
                <div className='container__flex rating__overview'>
                    <div className='rating__overview_left'>
                        <span><lable className="rating__overview_current_rate">4.9</lable>/5</span>
                        <div>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                            <AiOutlineStar/>
                        </div>
                        <label>đánh giá</label>
                    </div>
                    <div className='rating__overview_right'>
                        <div className='rating__overview_right_col'>
                            <label>5</label>
                            <label>4</label>
                            <label>3</label>
                            <label>2</label>
                            <label>1</label>
                        </div>
                        <div className='rating__overview_right_col'>
                            <div className='rating__overview_right_row'>
                                <AiOutlineStar/>
                                <div className='rating__container_grey'>
                                    <div className='rating__container_red'></div>
                                </div>
                            </div>
                            <div className='rating__overview_right_row'>
                                <AiOutlineStar/>
                                <div className='rating__container_grey'>
                                    <div className='rating__container_red'></div>
                                </div>
                            </div>
                            <div className='rating__overview_right_row'>
                                <AiOutlineStar/>
                                <div className='rating__container_grey'>
                                    <div className='rating__container_red'></div>
                                </div>
                            </div>
                            <div className='rating__overview_right_row'>
                                <AiOutlineStar/>
                                <div className='rating__container_grey'>
                                    <div className='rating__container_red'></div>
                                </div>
                            </div>
                            <div className='rating__overview_right_row'>
                                <AiOutlineStar/>
                                <div className='rating__container_grey'>
                                    <div className='rating__container_red'></div>
                                </div>
                            </div>
                        </div>
                        <div className='rating__overview_right_col'>
                            <label>(332123)</label>
                            <label>(22)</label>
                            <label>()</label>
                            <label>()</label>
                            <label>(123)</label>
                        </div>
                    </div>
                </div>
                <CommentCard/>
            </div>
        </div>
        </div>
    )
}