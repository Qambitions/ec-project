import './style.css'

export function OrderCard(props){
    return(
        <div className="container__flex">
            <img className='order__card_img' src={"https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655547531/Huimitu-Logo-Final_zakn2y.png"}></img>
            <div className='container__flex_col'>
                <div className='container__flex'>
                    <small>Brand</small>
                    <small>Price</small>
                </div>
                <small>Product name</small>
                <p>SL:</p>
            </div>
        </div>
    )
}