import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";
import { CompanyReducer } from "./companyState";
import { combineReducers } from 'redux';

const combine = combineReducers({AuthState:AuthReducer, companyState:CompanyReducer})
export const store = configureStore({reducer: combine});
 {/*AdminReducer, 
    CompanyReducer, 
    CompanyReducer 
*/}