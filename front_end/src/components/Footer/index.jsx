import { useState } from "react";
import { useEffect } from "react";
import StoreAddress from "../../components/StoreAddress";
import "./style.css";
import axios from "../../api/axios";
export default function Footer() {
  const [branches, setBranches] = useState([]);
  async function fetchBranchesAddress() {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_GET_BRANCHES,
      headers: { magic_pass: process.env.REACT_APP_MAGIC_PASS },
    });
    if (res.data.exitcode === 0) {
      console.log(res.data.chi_nhanh);
      setBranches(res.data.chi_nhanh);
    } else {
      console.log("fetch branch fail");
    }
  }
  useEffect(() => {
    fetchBranchesAddress();
  }, []);

  return (
    <div>
      <div className="container footer">
        <div className="footer-info">
          <div>
            <h5>Thông tin Huimitu</h5>
            <ul>
              <li>Về Huimitu</li>
              <li>Trang chủ</li>
              <li>Sản phẩm</li>
              <li>Trung tâm CSKH</li>
              <li>Điều khoản sử dụng</li>
            </ul>
          </div>
          <div>
            <h5>Danh mục sản phẩm</h5>
            <ul>
              <li>Thức ăn</li>
              <li>Mỹ phẩm và làm đẹp</li>
              <li>Đồ chơi</li>
              <li>Thời trang</li>
              <li>Chuồng thú</li>
              <li>Y tế</li>
            </ul>
          </div>
          <div>
            <h5>Chính sách chung</h5>
            <ul>
              <li>Chính sách giao hàng</li>
              <li>Chính sách đổi trả</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h5>Hình thức thanh toán</h5>
            <div className="footer__icon_container_horizontal">
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/888870_wptg5q.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/momo-logo-ED8A3A0DF2-seeklogo.com_pnirvg.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2543174_viafmp.png"
                }
              ></img>
            </div>
          </div>
          <div>
            <h5>Đơn vị vận chuyển</h5>
            <div className="footer__icon_container_vertical">
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/286088489_5050087261779690_4284998344429746518_n_ioqia7.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/287535036_424202986024765_8691090997415472965_n_vqls2y.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656573798/icon/Logo-Viettel-Post-Transparent_zw5rmz.webp"
                }
              ></img>
            </div>
          </div>
          <div>
            <h5>Kết nối với chúng tôi</h5>
            <div className="footer__icon_container_horizontal">
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832638/icon/145802_sodwfz.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/3955024_u8cbqr.png"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/3670147_ponygk.png"
                }
              ></img>
            </div>
            <h5>Chứng nhận</h5>
            <div className="footer__icon_container_horizontal ">
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656574904/icon/noi-khong-voi-hang-gia_xvgmlk.webp"
                }
              ></img>
              <img
                style={{ height: "35px" }}
                src={
                  "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1656574898/icon/20150827110756-dadangky_vqvyli.png"
                }
              ></img>
            </div>
          </div>
        </div>
        <div className="footer-stores" id="branches">
          {branches.map((item) => (
            <StoreAddress
              key={item.macn}
              name={"Chi nhánh " + item.macn}
              address={
                item.so_nha_duong +
                ", phường " +
                item.phuong_xa +
                ", quận " +
                item.quan_tp +
                ", tp " +
                item.tp_tinh
              }
              phone={item.sdt_cn}
            />
          ))}
        </div>
        <div className="company">
          <p>
            Trụ sở chính: 227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí
            Minh
          </p>
          <p>
            Mã số doanh nghiệp: 0123456789 do Sở Kế hoạch & Đầu tư TP Hồ Chí
            Minh cấp lần đầu ngày 18/06/2017
          </p>
          <p>Tổng đài hỗ trợ: 19001919 - Email: cskh@hotro.huimitu.vn</p>
          <p>© 2022 - Bản quyền thuộc công ty Huimitu</p>
        </div>
      </div>
    </div>
  );
}
