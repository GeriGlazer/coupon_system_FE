import { ConstructionOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Coupon_Details } from "../../../modal/coupon_details";
import { downloadCoupons } from "../../../redux/couponState";
import { store } from "../../../redux/store";
import globals from "../../../util/globals";
import jwtAxios from "../../../util/jwtAxios";
import msgNotify, { ErrMsg } from "../../../util/notify";
import SingleCoupon from "../company/singleCoupon/singleCoupon";

import "./myMainPage.css";

function MyMainPage(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon_Details[]>([]);


    useEffect(()=>{
        jwtAxios.get<Coupon_Details[]>(globals.urls.guest)
        .then(response=>{
            setCoupons(response.data)
            console.log(response.data);
            store.dispatch(downloadCoupons(response.data));
            
        })
        .catch(err=>{
            msgNotify.error("No coupons in data base")
        })
    },[])

    return (
        <div className="myMainPage">
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default MyMainPage;
