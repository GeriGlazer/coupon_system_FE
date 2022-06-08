import "./singleCoupon.css";
import { Coupon_Details } from './../../../../modal/coupon_details';

interface SingleCouponProps{
    coupon: Coupon_Details;
}

function SingleCoupon(props: SingleCouponProps): JSX.Element {
    return (
        <div className="singleCoupon SolidBox">
			<h2 style={{textAlign: "center"}}>{props.coupon.title}</h2><hr/><br/>
            {props.coupon.id}<br/><br/>
            {props.coupon.category}<br/><br/>
            {props.coupon.description}<br/><br/>
            {props.coupon.price}<br/><br/>
            {props.coupon.amount}<br/><br/>
            {props.coupon.startDate}<br/><br/>
            {props.coupon.endDate}<br/><br/>
            {props.coupon.image}<br/><br/>
        </div>
    );
}

export default SingleCoupon;
