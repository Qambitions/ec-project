import './style.css'

export default function NavBar(props){
    return(
        <div className='nav-container'>
            <div className="container navbar">
                <a href='/'>Trang chủ</a>
                <a href='/'>Hot deals</a>
                <a href='/'>Thức ăn</a>
                <a href='/'>Mỹ phẩm và làm đẹp</a>
                <a href='/'>Thời trang</a>
                <a href='/'>Đồ chơi</a>
                <a href='/'>Y tế</a>
                <a href='/'>Chuồng thú</a>
            </div>
        </div>
    )
}