import "./singleCoupon.css";
import { Coupon_Details } from './../../../../modal/coupon_details';
import { Button } from "@mui/material";
import { store } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";

interface SingleCouponProps{
    coupon: Coupon_Details;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();
    const updateCoupon = ()=>{
        navigate("/company/updateCoupon", {state:{couponId:props.coupon.id}})
    }
    const goToLogin = ()=>{
        navigate("/login");
    }
    const getUpdateButton = ()=>{
        if (getUserType=="COMPANY"){
            return (
                <>
                    <Button variant="contained" color="primary" onClick={updateCoupon}>update</Button>
                </>
            )
        }
        else if (getUserType == "CUSTOMER"){
            if (store.getState().customerState.customer[0].coupons.filter(item=>item.id==props.coupon.id).length==0){

            return (
                <>
                    <Button variant="contained">buy me</Button>
                </>
            ) 
            }
        }
        else if (getUserType == ''){
            return (
                <>
                    <Button variant="contained" onClick={goToLogin}>buy me</Button>
                </>
            ) 
        }
    }

    const getData = ()=>{
        return (
            <>
                <b>id:</b> {props.coupon.id}<br/>
                <b>category:</b> {props.coupon.category}<br/>
                <b>description:</b> {props.coupon.description}<br/>
                <b>price:</b> {props.coupon.price}<br/>
                <b>amount:</b> {props.coupon.amount}<br/>
                <b>start date:</b> {props.coupon.startDate}<br/>
                <b>end date:</b> {props.coupon.endDate}<br/>
                <b>image:</b> {props.coupon.image}<br/>
            </>

        );
    }
    return (
        <div className="singleCoupon SolidBox">
			<h2 style={{textAlign: "center"}}>{props.coupon.title}</h2><hr/>
            {getData()}
            {getUpdateButton()}
            
        </div>
    );
}


export default SingleCoupon;
