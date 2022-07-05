import ProductCard from '../../ProductCard'
import './style.css'
import { Carousel } from 'react-bootstrap'

export default function HotDeals(props){
    return(
        <div className='container hot__deals homepage_section'>
            <div className='homepage_section_head'>
                <div className='homepage_section_head_title'>
                    <h1>HOT DEALS</h1>
                    <img src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/3898712_ansqej.png"}></img>
                </div>
            </div>
            <hr/>
            <Carousel className='hot__deals_carousel'>
                <Carousel.Item>
                    <div className='hot__deals_body'>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='hot__deals_body'>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='hot__deals_body'>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                        <ProductCard/>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}