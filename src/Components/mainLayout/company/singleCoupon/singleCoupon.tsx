import "./singleCoupon.css";
import { Coupon_Details } from './../../../../modal/coupon_details';
import { Button } from "@mui/material";
import { store } from "../../../../redux/store";

interface SingleCouponProps{
    coupon: Coupon_Details;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const getUpdateButton = ()=>{
        if (getUserType=="COMPANY"){
            return (
                <>
                    <Button>update</Button>
                </>
            )
        }
        else if (getUserType == "CUSTOMER"){
            return (
                <>
                    <Button>buy me</Button>
                </>
            ) 
        }
    }

    const getData = ()=>{
        return (
            <>
                <b>id:</b> {props.coupon.id}<br/><br/>
                <b>category:</b> {props.coupon.category}<br/><br/>
                <b>description:</b> {props.coupon.description}<br/><br/>
                <b>price:</b> {props.coupon.price}<br/><br/>
                <b>amount:</b> {props.coupon.amount}<br/><br/>
                <b>start date:</b> {props.coupon.startDate}<br/><br/>
                <b>end date:</b> {props.coupon.endDate}<br/><br/>
                <b>image:</b> {props.coupon.image}<br/><br/>
            </>

        );
    }
    return (
        <div className="singleCoupon SolidBox">
			<h2 style={{textAlign: "center"}}> <b>title: </b>{props.coupon.title}</h2><hr/><br/>
            {getData()}
            {getUpdateButton()}
            
        </div>
    );
}


export default SingleCoupon;
