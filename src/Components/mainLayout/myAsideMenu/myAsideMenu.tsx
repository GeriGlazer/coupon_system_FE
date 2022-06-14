
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import "./myAsideMenu.css";


function MyAsideMenu(): JSX.Element {

    const [userMenu, setMenu] = useState<any>();
    const navigate = useNavigate();

    const adminMenu = ()=>{
        return (
            <>
                Administrator<br/>
                <NavLink to="admin/addCompany">Add company</NavLink><br/>
                <NavLink to="admin/addCustomer">Add customer</NavLink><br/>
                <NavLink to="admin/getAllCustomers">Show customers</NavLink><br/>
                <NavLink to="admin/getAllCompanies">Show companies</NavLink><br/>
                <br/>
            </>
        );
    };
   
    const company = ()=>{
        return (
            <>
                Companies menu<br/>
                <NavLink to="company/addCoupon">Add coupon</NavLink><br/>
                <NavLink to="company/updateCoupon">Update coupon</NavLink><br/>      
                <NavLink to="company/deleteCoupon">Delete coupon</NavLink><br/>
                <NavLink to="company/getAllCompanyCoupons">Show all coupons</NavLink><br/>
                <NavLink to="company/getCompanyDetails">Company profile</NavLink><br/>
                <NavLink to="company/getCouponsByCategory">Show coupons by category</NavLink><br/>
                <NavLink to="company/getCouponsByMaxPrice">Show coupons by max price</NavLink><br/>
                
                <br/>        
            </>
        );
    };

    const customer = ()=>{
        return (
            <>
                Customers<br/>
                <NavLink to="customer/getCustomerCoupons">My coupons</NavLink><br/>
                <NavLink to="customer/getCustomerCouponsByCategory">My coupons by category</NavLink><br/>
                <NavLink to="customer/getCustomerCouponsByMaxPrice">My coupons by price</NavLink><br/>
                <NavLink to="customer/getCustomerDetails">Customer profile</NavLink><br/>
            </>
        )
    }
    

    useEffect (()=>{
        if(store.getState().AuthState.userType==="ADMIN"){
            setMenu (adminMenu());
        }
        if(store.getState().AuthState.userType==="CUSTOMER"){
            setMenu (customer());
        }
        if(store.getState().AuthState.userType==="COMPANY"){
            setMenu (company());
        }
        else (
            navigate("/")
        )
    }, [])
    {/*create guest main page displaying all coupons in system */}
    return (
        <div className="myAsideMenu">
		{/*userMenu*/}
        {adminMenu()}
        {company()}
        {customer()}
        </div>
    );
}

export default MyAsideMenu;
