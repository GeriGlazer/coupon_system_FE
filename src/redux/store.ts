import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./authState";

export const store = configureStore({reducer: AuthReducer,});
 {/*AdminReducer, 
    CompanyReducer, 
    CompanyReducer 
*/}