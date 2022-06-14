import { Coupon_Details } from "../modal/coupon_details";


export class CouponState{
coupon: Coupon_Details[] = []
}

export enum couponActionType{
    downloadCoupons = "downloadCoupons",
    deleteCoupon = "deleteCoupon",
    updateCoupon = "updateCoupon" ,
    addCoupon = "addCoupon" ,
}
