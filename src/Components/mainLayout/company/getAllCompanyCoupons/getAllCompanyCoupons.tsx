import { useLocation, useNavigate } from "react-router-dom";
import "./getAllCompanyCoupons.css";
import { Coupon_Details } from './../../../../modal/coupon_details';
import { useEffect, useState } from "react";
import jwtAxios from './../../../../util/jwtAxios';
import globals from './../../../../util/globals';
import msgNotify, { ErrMsg } from './../../../../util/notify';
import SingleCoupon from "../singleCoupon/singleCoupon";
import { store } from "../../../../redux/store";
import { company_details } from "../../../../modal/company_details";
import { couponActionType } from "../../../../redux/couponState";

function GetAllCompanyCoupons(): JSX.Element {
    const navigate = useNavigate();
    //const location = useLocation();
    //const {companyId} =location.state as any;
    const [company, setCompany] = useState(new company_details());
    const [companyCoupons, setCompanyCoupons] = useState<Coupon_Details[]>([]);
    
    {/*|| store.getState().AuthState.userType !="COMPANY" */}


    useEffect (()=>{
        if(store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error("You must be Administrator or the registrated company")
            navigate("/login");
        }
        setCompany(store.getState().companyState.company.find(item=>company.id==item.id));
        console.log(company)
        setCompanyCoupons(company.coupons);
        console.log("MY COUPONS: " + company.coupons)

    }, [])

    return (
        <div className="getAllCompanyCoupons">
			<h1 style={{textAlign:"center"}}>Company Coupons</h1><hr/>
            {companyCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}

export default GetAllCompanyCoupons;
