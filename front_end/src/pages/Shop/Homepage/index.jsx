import React from "react";
import { MainAds } from "../../../components/Advertise";
import HomepageSection from "../../../components/HomepageSection";
import HotDeals from "../../../components/HomepageSection/HotDeals";

export default function Homepage() {
  return (
    <div className="body">
      <MainAds />
      {/* <HotDeals /> */}
      <HomepageSection
        header={"THỨC ĂN"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832642/icon/3737726_p0dkzy.png"
        }
        malh={10}
        limit={5}
        offset={1}
      />
      <HomepageSection
        header={"MỸ PHẨM VÀ LÀM ĐẸP"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832639/icon/1312091_qharxb.png"
        }
        malh={11}
        limit={5}
        offset={1}
      />
      <HomepageSection
        header={"THỜI TRANG"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832643/icon/3969932_zgd7eh.png"
        }
        malh={12}
        limit={5}
        offset={1}
      />
      <HomepageSection
        header={"ĐỒ CHƠI"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832643/icon/4063451_ouauas.png"
        }
        malh={13}
        limit={5}
        offset={1}
      />
      <HomepageSection
        header={"Y TẾ"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832640/icon/2447823_mp6uzx.png"
        }
        malh={14}
        limit={5}
        offset={1}
      />
      <HomepageSection
        header={"CHUỒNG THÚ"}
        icon={
          "https://res.cloudinary.com/ec-2022-lam-zau-khum-kho/image/upload/v1655832641/icon/3047886_v3tkho.png"
        }
        malh={15}
        limit={5}
        offset={1}
      />
    </div>
  );
}
