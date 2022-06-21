import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./companyMainPage.css";

function CompanyMainPage(): JSX.Element {

    const navigate = useNavigate();
    const addCoupon = ()=>{
        navigate("/company/addCoupon")
    }

    const showAllCoupons = ()=>{
        navigate("/company/getAllCompanyCoupons")
    }

    const compDetails = ()=>{
        navigate("/company/getCompanyDetails")
    }

    const couponByCat = ()=>{
        navigate("/company/getCouponsByCategory")
    }

    const couponByMaxPrice = ()=>{
        navigate("/company/getCouponsByMaxPrice")
    }
    
    return (
        <div className="companyMainPage">
		<ButtonGroup>
                <Button onClick={addCoupon}> Add a coupon</Button>
                <Button onClick={showAllCoupons}> Show me the Coupons</Button>
                <Button onClick={compDetails}> Show me my details</Button>
                <Button onClick={couponByCat}> Show me coupons by its category</Button>
                <Button onClick={couponByMaxPrice}> Show me coupons by a Maximum Price</Button>
            </ButtonGroup>	
        </div>
    );
}

export default CompanyMainPage;
