import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customerMainPage.css";

function CustomerMainPage(): JSX.Element {
    const navigate = useNavigate();

    const showAllCoupons = ()=>{
        navigate("/customer/getCustomerCoupons");
    }
    const showDetails = ()=>{
        navigate("/customer/getCustomerDetails");
    }
    const showCouponsByCategory = ()=>{
        navigate("/customer/getCustomerCouponsByCategory");
    }
    const showCouponsByPrice = ()=>{
        navigate("/customer/getCustomerCouponsByMaxPrice");
    }

    return (
        <div className="customerMainPage">
                <Button variant="outlined" color="secondary"  onClick={showDetails}> Show me my details</Button>
                <br/><br/>
                <Button variant="outlined" color="secondary"  onClick={showAllCoupons}> Show me my Coupons</Button>
                <br/><br/>
                <Button variant="outlined" color="secondary"  onClick={showCouponsByCategory}> Show me coupons by its category</Button>
                <br/><br/>
                <Button variant="outlined" color="secondary"  onClick={showCouponsByPrice}> Show me coupons by a Maximum Price</Button>
        </div>
    );
}

export default CustomerMainPage;
