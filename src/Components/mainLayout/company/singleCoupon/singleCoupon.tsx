

import "./singleCoupon.css";
import { Coupon_Details } from "./../../../../modal/coupon_details";
import { Button } from "@mui/material";
import { store } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { updateCustomer,} from "../../../../redux/customerState";
interface SingleCouponProps {
  coupon: Coupon_Details;
}
function SingleCoupon(props: SingleCouponProps): JSX.Element {
  const getUserType = store.getState().AuthState.userType;
  const navigate = useNavigate();

  const updateCoupon = () => {
    navigate("/company/updateCoupon", { state: { couponId: props.coupon.id } });
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToMyCoupons = ()=>{
    navigate("/customer/getCustomerCoupons");
    }
  const purchaseCoupon = () => {
    let couponId = props.coupon.id;
    jwtAxios.put(globals.urls.purchaseCoupon + couponId)
    .then((response) => {
      if (response.status < 300) {
        msgNotify.success("Coupon purchased");
        let coupon = store.getState().couponState.coupon.filter(item=>item.id==couponId)[0];
        let newAmount = coupon.amount - 1;
        coupon.amount = newAmount;
        let myCoupons = store.getState().customerState.customer[0].coupons;
        myCoupons.push(coupon);
        let customer = store.getState().customerState.customer[0];
        customer.coupons=myCoupons;
        store.dispatch(updateCustomer(customer));
        navigate("/customer/customerMainPage");
      }
    })
    .catch((err) => {
      msgNotify.error(err.response.data.details);
      navigate("/")
    });
    }
  const getUpdateButton = () => {
    if (getUserType == "COMPANY") {
      return (
        <>
          <Button variant="contained" color="primary" onClick={updateCoupon}>
            update
          </Button>
        </>
      );
    } else if (getUserType == "CUSTOMER") {
      if (
        store
          .getState()
          .customerState.customer[0].coupons.filter(
            (item) => item.id == props.coupon.id
          ).length == 0
      ) {
        return (
          <>
            <Button variant="contained" onClick={purchaseCoupon}>
              buy me
            </Button>
          </>
        );
      }
    } else if (getUserType == "") {
      return (
        <>
          <Button variant="contained" onClick={goToLogin}>
            buy me
          </Button>
        </>
      );
    }
  };
  const getAmount = () =>{
    if(getUserType=="COMPANY"){
      return (
        <>
          <b >ID: {props.coupon.id}</b> 
          <br />
          <b>Amount:</b> {props.coupon.amount}
          <br />
          <b>Category:</b> {props.coupon.category}
          <br />
          <b>Start date:</b> {props.coupon.startDate}
          <br />
        </>
      )
    }
  }

  const getData = () => {
    return (
      <>
        <img className="Image" src= {props.coupon.image} ></img>
        <h6><b>{props.coupon.description}</b> </h6>
        <div className="Container2">
          <b>Price:{props.coupon.price}</b> 
          <br />
          {getAmount()}
          <b className="Expire">Expires: {props.coupon.endDate}</b> 
          <br />
        </div>
        <br />
        <b>{getUpdateButton()}</b>
       
      </>
    );
  };

  return (
    <div className="singleCoupon CouponBox">
      <h3 className="Container" style={{ textAlign: "center" }}>{props.coupon.title}</h3>
      <hr />
      {getData()}

    </div>
  );
}
export default SingleCoupon;