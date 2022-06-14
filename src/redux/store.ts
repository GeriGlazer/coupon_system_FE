import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";
import { CompanyReducer } from "./companyState";
import { combineReducers } from 'redux';
import { CouponReducer } from './couponState';

const combine = combineReducers({AuthState:AuthReducer, companyState:CompanyReducer, couponState: CouponReducer})
export const store = configureStore({reducer: combine});
{/*AdminReducer, 
    CustomerReducer, 
*/}