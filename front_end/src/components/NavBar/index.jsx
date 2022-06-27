import './style.css'

export default function NavBar(props){
    const navTag=[
        {
            id: 1,
            tagName: 'Trang chủ'
        },
        {
            id: 2,
            tagName: 'Hot deals'
        },
        {
            id: 3,
            tagName: 'Thức ăn'
        },
        {
            id: 4,
            tagName: 'Mỹ phẩm và làm đẹp'
        },
        {
            id: 5,
            tagName: 'Thời trang'
        },
        {
            id: 6,
            tagName: 'Đồ chơi'
        },
        {
            id: 7,
            tagName: 'Y tế'
        },
        {
            id: 8,
            tagName: 'Chuồng thú'
        },
    ]
    return(
        <div className='nav-container'>
            <div className="container navbar">
                {
                    navTag.map((item)=>{return <label>{item.tagName}</label>})
                }
            </div>
        </div>
    )
}