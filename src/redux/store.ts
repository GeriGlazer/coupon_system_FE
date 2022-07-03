import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";
import { CompanyReducer } from "./companyState";
import { combineReducers } from 'redux';
import { CouponReducer } from './couponState';
import { CustomerReducer } from "./customerState";

const combine = combineReducers({AuthState:AuthReducer, companyState:CompanyReducer, couponState: CouponReducer, customerState:CustomerReducer})
export const store = configureStore({
    reducer: combine,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
})
});