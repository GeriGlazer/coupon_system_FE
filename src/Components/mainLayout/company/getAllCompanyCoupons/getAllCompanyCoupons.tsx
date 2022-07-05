import { useLocation, useNavigate } from "react-router-dom";
import "./getAllCompanyCoupons.css";
import { Coupon_Details } from './../../../../modal/coupon_details';
import { useEffect, useState } from "react";
import SingleCoupon from "../singleCoupon/singleCoupon";
import { store } from "../../../../redux/store";
import { company_details } from "../../../../modal/company_details";
import Button from "@mui/material/Button";

function GetAllCompanyCoupons(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const [company, setCompany] = useState(new company_details());
    const [companyCoupons, setCompanyCoupons] = useState<Coupon_Details[]>([]);
    const getUserType = store.getState().AuthState.userType;

    useEffect (()=>{
        if(getUserType=="ADMIN"){
        const {companyId} =location.state as any;
        let singleCompany = store.getState().companyState.company.find(item=>companyId==item.id);
        setCompany(singleCompany);
        setCompanyCoupons(singleCompany.coupons);
        }
        else if(getUserType=="COMPANY"){
            let singleCompany=store.getState().companyState.company[0];
            setCompanyCoupons(singleCompany.coupons);
        }
    }, [])

    const goBack = ()=>{
        if(getUserType==="ADMIN"){
            navigate("/admin/getAllCompanies");
        }
        if(getUserType==="COMPANY"){
            navigate("/company/companyMainPage");
        }
    }

    return (
        <div className="getAllCompanyCoupons">
			<h1 style={{textAlign:"center"}}>Company Coupons</h1><hr/>
            {companyCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetAllCompanyCoupons;
