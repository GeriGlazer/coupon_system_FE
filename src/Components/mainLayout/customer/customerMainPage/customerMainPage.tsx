import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./customerMainPage.css";

function CustomerMainPage(): JSX.Element {
    const navigate = useNavigate();
    const goHome = ()=>{
        navigate("/");
    }

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
			<ButtonGroup>
                <Button onClick={showAllCoupons}> Show me my Coupons</Button>
                <Button onClick={showDetails}> Show me my details</Button>
                <Button onClick={showCouponsByCategory}> Show me coupons by its category</Button>
                <Button onClick={showCouponsByPrice}> Show me coupons by a Maximum Price</Button>
            </ButtonGroup>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>	
        </div>
    );
}

export default CustomerMainPage;
