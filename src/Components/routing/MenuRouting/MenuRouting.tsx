import { Route, Routes } from "react-router-dom";
import AddCompany from "../../mainLayout/admin/addCompany/addCompany";
import AddCustomer from "../../mainLayout/admin/addCustomer/addCustomer";
import AdminMainPage from "../../mainLayout/admin/adminMainPage/adminMainPage";
import DeleteCompany from "../../mainLayout/admin/deleteCompany/deleteCompany";
import DeleteCustomer from "../../mainLayout/admin/deleteCustomer/deleteCustomer";
import GetAllCompanies from "../../mainLayout/admin/getAllCompanies/getAllCompanies";
import GetAllCustomers from "../../mainLayout/admin/getAllCustomers/getAllCustomers";
import GetCustomer from "../../mainLayout/admin/getCustomer/getCustomer";
import GetOneCompany from "../../mainLayout/admin/getOneCompany/getOneCompany";
import UpdateCompany from "../../mainLayout/admin/updateCompany/updateCompany";
import UpdateCustomer from "../../mainLayout/admin/updateCustomer/updateCustomer";
import AddCoupon from "../../mainLayout/company/addCoupon/addCoupon";
import DeleteCoupon from "../../mainLayout/company/deleteCoupon/deleteCoupon";
import GetAllCompanyCoupons from "../../mainLayout/company/getAllCompanyCoupons/getAllCompanyCoupons";
import GetCompanyDetails from "../../mainLayout/company/getCompanyDetails/getCompanyDetails";
import GetCouponByCategory from "../../mainLayout/company/getCouponByCategory/getCouponByCategory";
import GetCouponsByMaxPrice from "../../mainLayout/company/getCouponsByMaxPrice/getCouponsByMaxPrice";
import UpdateCoupon from "../../mainLayout/company/updateCoupon/updateCoupon";
import GetCustomerCoupons from "../../mainLayout/customer/getCustomerCoupons/getCustomerCoupons";
import GetCustomerCouponsByCategory from "../../mainLayout/customer/getCustomerCouponsByCategory/getCustomerCouponsByCategory";
import GetCustomerCouponsByMoney from "../../mainLayout/customer/getCustomerCouponsByMoney/getCustomerCouponsByMoney";
import GetCustomerDetails from "../../mainLayout/customer/getCustomerDetails/getCustomerDetails";
import PurchaseCoupon from "../../mainLayout/customer/purchaseCoupon/purchaseCoupon";
import MyMainPage from "../../mainLayout/myMainPage/myMainPage";
import Login from "../../user/login/login";
import Page404 from "../../user/page404/page404";
import "./MenuRouting.css";
import CompanyMainPage from './../../mainLayout/company/companyMainPage/companyMainPage';
import CustomerMainPage from "../../mainLayout/customer/customerMainPage/customerMainPage";
import UpdatePassword from './../../mainLayout/company/updatePassword/updatePassword';

function MenuRouting(): JSX.Element {
    return (
        <div className="MenuRouting">
			<Routes>
                <Route path="/" element={<MyMainPage/>}/>
                <Route path="admin/adminMainPage" element={<AdminMainPage/>}/>
                <Route path="admin/addCompany" element={<AddCompany/>}/>
                <Route path="admin/addCustomer" element={<AddCustomer/>}/>
                <Route path="admin/deleteCompany" element={<DeleteCompany/>}/>
                <Route path="admin/deleteCustomer" element={<DeleteCustomer/>}/>
                <Route path="admin/getAllCompanies" element={<GetAllCompanies/>}/>
                <Route path="admin/getAllCustomers" element={<GetAllCustomers/>}/>
                <Route path="admin/oneCustomer" element={<GetCustomer/>}/>
                <Route path="admin/oneCompany" element={<GetOneCompany/>}/>
                <Route path="admin/updateCompany" element={<UpdateCompany/>}/>
                <Route path="admin/updateCustomer" element={<UpdateCustomer/>}/>

                {/* company */}
                <Route path="company/companyMainPage" element={<CompanyMainPage/>}/>
                <Route path="company/addCoupon" element={<AddCoupon/>}/>
                <Route path="company/deleteCoupon" element={<DeleteCoupon/>}/>
                <Route path="company/getAllCompanyCoupons" element={<GetAllCompanyCoupons/>}/>
                <Route path="company/getCompanyDetails" element={<GetCompanyDetails/>}/>
                <Route path="company/getCouponsByCategory" element={<GetCouponByCategory/>}/>
                <Route path="company/getCouponsByMaxPrice" element={<GetCouponsByMaxPrice/>}/>
                <Route path="company/updateCoupon" element={<UpdateCoupon/>}/>

                {/* Customer */}
                <Route path="customer/customerMainPage" element={<CustomerMainPage/>}/>
                <Route path="customer/getCustomerCoupons" element={<GetCustomerCoupons/>}/>
                <Route path="customer/getCustomerCouponsByCategory" element={<GetCustomerCouponsByCategory/>}/>
                <Route path="customer/getCustomerCouponsByMaxPrice" element={<GetCustomerCouponsByMoney/>}/>
                <Route path="customer/getCustomerDetails" element={<GetCustomerDetails/>}/>
                <Route path="customer/purchaseCoupon" element={<PurchaseCoupon/>}/>

                {/* General */}
                <Route path="login" element={<Login/>}/>
                <Route path="guest" element={<MyMainPage/>}/>


                <Route path="*" element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default MenuRouting;
