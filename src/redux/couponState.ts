import { Coupon_Details } from "../modal/coupon_details";


export class CouponState{
coupon: Coupon_Details[] = []
}

export enum couponActionType{
    downloadCoupons = "downloadCoupons",
    deleteCoupon = "deleteCoupon",
    updateCoupon = "updateCoupon" ,
    addCoupon = "addCoupon" ,
    removeAllCoupons = "removeAllCoupons" ,
}

export interface couponAction{
    type: couponActionType,
    payload?: any,
}

export function downloadCoupons(coupons:Coupon_Details[]):couponAction{
    return {type: couponActionType.downloadCoupons, payload:coupons}
}

export function deleteCoupon(couponId: number):couponAction{
    return {type: couponActionType.deleteCoupon, payload:couponId}
}

export function updateCoupon(coupon:Coupon_Details):couponAction{
    return {type: couponActionType.updateCoupon, payload:coupon}
}

export function addCoupon(coupon: Coupon_Details):couponAction{
    return {type: couponActionType.addCoupon, payload:coupon}
}

export function removeAllCoupons():couponAction{
    return {type: couponActionType.removeAllCoupons}
}

export function CouponReducer (currentState: CouponState = new CouponState, action: couponAction):CouponState{
    const newState = {...currentState};

    switch(action.type){

        case couponActionType.downloadCoupons:
            newState.coupon = action.payload;
        break;

        case couponActionType.deleteCoupon:
            newState.coupon = newState.coupon.filter(item=>item.id!==action.payload);
        break;

        case couponActionType.updateCoupon:
            var updateCoupon = [...newState.coupon].filter(item=>item.id!==action.payload.id);
            updateCoupon.push(action.payload);
            newState.coupon = updateCoupon;
        break;

        case  couponActionType.addCoupon:
            newState.coupon.push(action.payload);
        break;

        case couponActionType.removeAllCoupons:
            newState.coupon = [];
        break;
    }

    return newState;
}