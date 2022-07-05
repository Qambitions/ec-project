import ProductCard from '../ProductCard'
import './style.css'
import {Link} from 'react-router-dom'

export default function HomepageSection(props){
    return(
        <div className='container homepage_section'>
            <div className='homepage_section_head'> 
                <div className='homepage_section_head_title'>
                    <h1>{props.header}</h1>
                    <img src={props.icon}></img>
                </div>
                <Link to='/gio-hang'>Xem tất cả <img style={{height:"20px"}} src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832641/icon/3272665_gztrje.png"}></img></Link>
            </div>
            <hr/>
            <div className='homepage_section_container'>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
    )
}