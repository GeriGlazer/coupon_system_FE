

import "./singleCoupon.css";
import { Coupon_Details } from "./../../../../modal/coupon_details";
import { Button } from "@mui/material";
import { store } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import {CustomerReducer,PurchaseCoupon, updateCustomer,} from "../../../../redux/customerState";
import { downloadCoupons, removeAllCoupons } from "../../../../redux/couponState";
import { useState } from "react";
import { customer_details } from "../../../../modal/customer_details";

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
        console.log(coupon)
        navigate("/customer/getCustomerCoupons");
  }
})
.catch((err) => {
  msgNotify.error(err);
  console.log(err);
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
        <b>amount:</b> {props.coupon.amount}
        <br />
        </>
      )
    }
  }

  const getData = () => {
    return (
      <>
        <b>id:</b> {props.coupon.id}
        <br />
        <b>category:</b> {props.coupon.category}
        <br />
        <b>description:</b> {props.coupon.description}
        <br />
        <b>price:</b> {props.coupon.price}
        <br />
        {getAmount()}
        <b>start date:</b> {props.coupon.startDate}
        <br />
        <b>end date:</b> {props.coupon.endDate}
        <br />
        <b>image:</b> {props.coupon.image}
        <br />
      </>
    );
  };
  return (
    <div className="singleCoupon SolidBox">
      <h2 style={{ textAlign: "center" }}>{props.coupon.title}</h2>
      <hr />
      {getData()}
      {getUpdateButton()}
    </div>
  );
}
export default SingleCoupon;