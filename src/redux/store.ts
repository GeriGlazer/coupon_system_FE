import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";
import { CompanyReducer } from "./companyState";
import { combineReducers } from 'redux';
import { CustomerRducer, CustomerState } from './customerState';

const combine = combineReducers({AuthState:AuthReducer, companyState:CompanyReducer, customerState:CustomerRducer})
export const store = configureStore({reducer: combine});
 {/*AdminReducer, 
    CompanyReducer, 
    CompanyReducer 
*/}