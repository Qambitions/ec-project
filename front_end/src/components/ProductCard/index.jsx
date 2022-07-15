import './style.css'
import pd from '../../assets/logo.png'
import {AiFillStar,AiOutlineShoppingCart} from "react-icons/ai";
import { ProductDetail } from '../ProductDetail';
export default function ProductCard(props){
    return(     
        <a href='/products' className='product__card'>
        <img className='product__card_img' src={pd} alt ={pd}/>
        <div>
            <div className='product__card_price'>
                <label className='product__card_price_left'>price</label>
                <label className='product__card_price_right'>price<span>%</span></label>
            </div>
            <h5>BRAND</h5>
            <p>Product name</p>
            <div className='product__card_info'>
                <div>
                    <AiFillStar className='product__card_rating_star'/>
                    <AiFillStar className='product__card_rating_star'/>
                    <AiFillStar className='product__card_rating_star'/>
                    <AiFillStar className='product__card_rating_star'/>
                    <AiFillStar className='product__card_rating_star'/>
                    <span>()</span>
                    <span> | <AiOutlineShoppingCart/></span>
                    <span>instock</span>
                    </div>
                </div>
            </div>
        </a>
    )
}