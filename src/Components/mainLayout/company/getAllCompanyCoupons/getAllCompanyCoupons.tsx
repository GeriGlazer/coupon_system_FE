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
    const [coupons, setCoupons] = useState<Coupon_Details[]>([]);
    const location = useLocation();
    const {companyId} = location.state as any;
    
    useEffect (()=>{
        //setCoupons(store.getState().companyState.company.find(item=>companyId==item.id));
    }, [])

    useEffect(()=>{
        jwtAxios.get<Coupon_Details[]>(globals.urls.getAllCoupon)
        .then (response=>{
            setCoupons(response.data);
        })
        .catch(err=>{
            msgNotify.error("No coupons in the system");
        })
    },[])
    
    return (
        <div className="getAllCompanyCoupons">
			<h1>Company Coupons</h1><hr/>
            {coupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetAllCompanyCoupons;
