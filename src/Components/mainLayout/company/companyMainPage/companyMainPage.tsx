import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
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
                <Button variant="outlined" color="secondary" onClick={addCoupon}> Add a coupon</Button>
                <span> </span>
                <Button variant="outlined" color="secondary"  onClick={showAllCoupons}> Show me the Coupons</Button>
                <span> </span>
                <Button variant="outlined" color="secondary"  onClick={compDetails}> Show me my details</Button>
                <br/><br/>
                <Button variant="outlined" color="secondary"  onClick={couponByCat}> Show me coupons by its category</Button>
                <span> </span>
                <Button variant="outlined" color="secondary"  onClick={couponByMaxPrice}> Show me coupons by a Maximum Price</Button>
                <span> </span>
        </div>
    );
}

export default CompanyMainPage;
