import './style.css'
import ads from '../../assets/head-ads.png'  
import ads1 from '../../assets/ads-1.png'
import ads2 from '../../assets/ads-2.png'  
import ads3 from '../../assets/ads-3.png'  
import { Carousel } from 'react-bootstrap'

export function HeadAds(){
    return(
        <img style={{width:"100%"}} src={ads} alt={ads}></img>
    )
}

export function MainAds(){
    return(
        <div className="container main__ads">
            <div className="carousel__ads">
                <Carousel>
                    <Carousel.Item interval={1000}>
                        <img
                        className="carousel__ads_slide"
                        src={ads1}
                        alt={ads1}
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                        className="carousel__ads_slide"
                        src={ads2}
                        alt={ads2}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="carousel__ads_slide"
                        src={ads3}
                        alt={ads3}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='side__ads'>
                <img className='side__ads_img' src={ads2}></img>
                <img className='side__ads_img' src={ads3}></img>
            </div>
        </div>
    )
}