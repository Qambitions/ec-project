import './style.css'

export default function VoucherCard(props){
    return(
        <div className="voucher__card">
            <div className='voucher__card_left'>
                <label>Title</label>
            </div>
            <div className='voucher__card_right'>
                <span>Discount <label className='voucher__card_label1'>| Mã voucher:</label></span>
                <label className='voucher__card_label2'>Voucher description</label>
                <label className='voucher__card_label2'>HSD:</label>
            </div>
        </div>
    )
}