import StoreAddress from "../../components/StoreAddress";
import './style.css'
export default function Footer(){
    const stores = [
        {
          id: 1, 
          name: 'Chi nhánh Quận 1',
          address: '123 stress, phường XY, quận 1, TP HCM',
          phone: '0987654321'
        },
        {
          id: 2, 
          name: 'Chi nhánh Quận 2',
          address: '123 stress, phường XY, quận 1, TP HCM',
          phone: '0987654321'
        },
        {
          id: 3, 
          name: 'Chi nhánh Quận 3',
          address: '123 stress, phường XY, quận 1, TP HCM',
          phone: '0987654321'
        },
        {
          id: 4, 
          name: 'Chi nhánh Quận 5',
          address: '123 stress, phường XY, quận 1, TP HCM',
          phone: '0987654321'
        },
        {
            id: 4, 
            name: 'Chi nhánh Quận 7',
            address: '123 stress, phường XY, quận 1, TP HCM',
            phone: '0987654321'
        },
        {
            id: 4, 
            name: 'Chi nhánh Quận 7',
            address: '123 stress, phường XY, quận 1, TP HCM',
            phone: '0987654321'
        },
        {
            id: 4, 
            name: 'Chi nhánh Quận 7',
            address: '123 stress, phường XY, quận 1, TP HCM',
            phone: '0987654321'
        },
        {
            id: 4, 
            name: 'Chi nhánh Quận 7',
            address: '123 stress, phường XY, quận 1, TP HCM',
            phone: '0987654321'
        },
        {
            id: 4, 
            name: 'Chi nhánh Quận 7',
            address: '123 stress, phường XY, quận 1, TP HCM',
            phone: '0987654321'
        }
      ];
    return(    
        <div>
            <div className="container footer">
                <div className="footer-info">
                    <div>Thông tin Huimitu</div>
                    <div>Danh mục sản phẩm</div>
                    <div>Chính sách chung</div>
                    <div>Hình thức thanh toán</div>
                    <div>Đơn vị vận chuyển</div>
                    <div>Kết nối với chúng tôi</div>
                </div>
                <div className="footer-stores">
                    {
                        stores.map((item,index)=><StoreAddress key={index} obj = {item}/>)
                    }
                </div>
                <div className="company">
                    <p>Trụ sở chính:  227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>
                    <p>Mã số doanh nghiệp: 0123456789 do Sở Kế hoạch & Đầu tư TP Hồ Chí Minh cấp lần đầu ngày 18/06/2017</p>
                    <p>Tổng đài hỗ trợ: 19001919 - Email: cskh@hotro.huimitu.vn</p>
                    <p>© 2022 - Bản quyền thuộc công ty Huimitu</p>
                </div>
            </div>
        </div>
    )
}