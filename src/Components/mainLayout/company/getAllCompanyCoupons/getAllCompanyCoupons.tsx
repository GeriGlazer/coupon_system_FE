import { useLocation, useNavigate } from "react-router-dom";
import "./getAllCompanyCoupons.css";
import { Coupon_Details } from './../../../../modal/coupon_details';
import { useEffect, useState } from "react";
import jwtAxios from './../../../../util/jwtAxios';
import globals from './../../../../util/globals';
import msgNotify, { ErrMsg } from './../../../../util/notify';
import SingleCoupon from "../singleCoupon/singleCoupon";
import { store } from "../../../../redux/store";

function GetAllCompanyCoupons(): JSX.Element {
    const navigate = useNavigate(); 
    const [coupons, setCoupons] = useState(new Coupon_Details);
    const location = useLocation();
    const {companyCoupons} = location.state as any;
    
    useEffect (()=>{
        setCoupons(store.getState().couponState.coupon.find(item=>companyCoupons==item.id))
        //setCoupons(store.getState().companyState.company.find(item=>companyCoupons==item.coupons))
    }, [])

    return (
        <div className="getAllCompanyCoupons">
			<h1>Company Coupons</h1><hr/>
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetAllCompanyCoupons;
