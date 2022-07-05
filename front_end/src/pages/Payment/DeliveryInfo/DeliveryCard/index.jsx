import './style.css'

export function DeliveryCard(props){
    return(
        <div className='container__flex  delivery__card'>
            <div className='container__flex'>
                <input type="radio"></input>
                <div className='container__flex_col'>
                    <div className="container__flex">
                        <label>User name</label>
                    </div>
                    <small>phone</small>
                    <small>address</small>
                </div>
            </div>
            <label>Mặc định</label>
        </div>
    )
}