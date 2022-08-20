import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../../api/axios";
import AddressCard from "./AddressCard";

export default function MyAddress() {
  const [addressList, setAddressList] = useState([]);
  const [info, setInfo] = useState({});
  const fetchBasicInfo = async () => {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_GET_BASIC_INFO,
      headers: { token: Cookies.get("token") },
    });
    if (res.data.exitcode === 0) {
      setInfo(res.data.user);
    } else {
      console.log("fetch fail");
    }
  };
  const fetchAddress = async () => {
    let res = await axios({
      method: "get",
      url: process.env.REACT_APP_GET_DELIVERY_INFO,
      headers: { token: Cookies.get("token") },
    });
    if (res.data.exitcode === 0) {
      setAddressList(res.data.list_address);
    } else {
      console.log("fetch fail");
    }
  };
  useEffect(() => {
    fetchAddress();
    fetchBasicInfo();
  }, []);

  return (
    <>
      <h3 className="user_dashboard_header">Địa chỉ nhận hàng</h3>
      <hr />
      {addressList.map((item) => (
        <AddressCard
          type={item.mac_dinh}
          name={info.tenkh}
          phone={info.sdt_kh}
          address={
            item.so_nha_duong +
            ", phường" +
            item.phuong_xa +
            ", quận" +
            item.quan_tp +
            ", TP" +
            item.tp_tinh
          }
        />
      ))}
    </>
  );
}
