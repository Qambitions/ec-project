import './style.css'

export default function VoucherInfo(props){
    return(
        <div className='payment__info_container voucher__info'>
            <div className="container__flex payment__info_head">
                <h4>Voucher</h4>
                <a className='navigate__detail'>Chọn voucher</a>
            </div>
            <div className="payment__info_body">
                <label>Code</label>
                <label>VC name</label>
            </div>
        </div>
    )
}