
import { NavLink } from "react-router-dom";
import "./myAsideMenu.css";


function MyAsideMenu(): JSX.Element {

    {/*useEffect or useState to change between the diferent menues */}
    const adminMenu = ()=>{
        return (
            <>
                Administrator<br/>
                <NavLink to="admin/addCompany">Add company</NavLink><br/>
                <NavLink to="admin/addCustomer">Add customer</NavLink><br/>
                <NavLink to="admin/deleteCompany">Delete company</NavLink><br/>
                <NavLink to="admin/deleteCustomer">Delete customer</NavLink><br/>
                <NavLink to="admin/getAllCustomers">Show all customers</NavLink><br/>
                <NavLink to="admin/getAllCompanies">Get all companies</NavLink><br/>
                <NavLink to="admin/getCustomer">Get customer</NavLink><br/>
                <NavLink to="admin/getOneCompany">Get company</NavLink><br/>
                <NavLink to="admin/updateCompany">Company update</NavLink><br/>
                <NavLink to="admin/updateCustomer">Customer update</NavLink><br/>     
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
        );  //this code was written in 18_05_2022, if oren still exists , please kill him :)
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
    


    return (
        <div className="myAsideMenu">
			{adminMenu()}
            {company()}
            {customer()}      
        </div>
    );
}

export default MyAsideMenu;
