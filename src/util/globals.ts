class Globals{


}

class DevelopmentGlobals extends Globals{
    public urls = {
        login: "http://localhost:8080/GYGNcoupons/login",
        addCompany: "http://localhost:8080/GYGNcoupons/admin/addCompany",
        addCustomer: "http://localhost:8080/GYGNcoupons/admin/addCustomer",
        deleteCompany: "http://localhost:8080/GYGNcoupons/admin/deleteCompany",
        deleteCustomer: "http://localhost:8080/GYGNcoupons/admin/deleteCustomer",
        updateCompany: "http://localhost:8080/GYGNcoupons/admin/updateCompany",
        updateCustomer: "http://localhost:8080/GYGNcoupons/admin/updateCustomer",
        listCompanies: "http://localhost:8080/GYGNcoupons/admin/allCompanies",
        listCustomers: "http://localhost:8080/GYGNcoupons/admin/allCustomers",
        oneCompany: "http://localhost:8080/GYGNcoupons/admin/oneCompany",
        oneCustomer: "http://localhost:8080/GYGNcoupons/admin/oneCustomer",

        addCoupon: "http://localhost:8080/GYGNcoupons/company/addCoupon",
        updateCoupon: "http://localhost:8080/GYGNcoupons/company/updateCoupon",
        deleteCoupon: "http://localhost:8080/GYGNcoupons/company/deleteCoupon",
        getOneCoupon: "http://localhost:8080/GYGNcoupons/company/getOneCoupon",
        getAllCoupon: "http://localhost:8080/GYGNcoupons/company/getAllCoupons",
        getCouponsByMaxPrice: "http://localhost:8080/GYGNcoupons/company/getCouponsByMaxPrice",
        getCouponsByCategory: "http://localhost:8080/GYGNcoupons/company/getCouponsByCategory",
        updatePassword: "http://localhost:8080/GYGNcoupons/company/updatePassword",
        companyDetails: "http://localhost:8080/GYGNcoupons/company/companyDetails",

        getCustomerCoupons: "http//localhost:8080/GYGNcoupons/customer/getCustomerCoupons",
        getCustomerCouponsByCategory: "http://localhost:8080/GYGNcoupons/customer/GetCustomerCouponsByCategory",
        getCustomerCouponsByMaxPrice: "http://localhost:8080/GYGNcoupons/customer/getCouponsByMaxPrice",
        customerDetails: "http://localhost:8080/GYGNcoupons/customer/customerDetails",

    }
}

class ProductionGlobals extends Globals{
    public urls = {
        guest:"/GYGNcoupons/",
        login: "/GYGNcoupons/login",
        addCompany: "/GYGNcoupons/admin/addCompany",
        addCustomer: "/GYGNcoupons/admin/addCustomer",
        deleteCompany: "/GYGNcoupons/admin/deleteCompany",
        deleteCustomer: "/GYGNcoupons/admin/deleteCustomer",
        updateCompany: "/GYGNcoupons/admin/updateCompany",
        updateCustomer: "/GYGNcoupons/admin/updateCustomer",
        listCompanies: "/GYGNcoupons/admin/allCompanies",
        listCustomers: "/GYGNcoupons/admin/allCustomers",
        oneCompany: "/GYGNcoupons/admin/oneCompany",
        oneCustomer: "/GYGNcoupons/admin/oneCustomer",

        addCoupon: "/GYGNcoupons/company/addCoupon",
        updateCoupon: "/GYGNcoupons/company/updateCoupon",
        deleteCoupon: "/GYGNcoupons/company/deleteCoupon",
        getOneCoupon: "/GYGNcoupons/company/getOneCoupon",
        getAllCoupon: "/GYGNcoupons/company/getAllCoupons",
        getCouponsByMaxPrice: "/GYGNcoupons/company/getCouponsByMaxPrice",
        getCouponsByCategory: "/GYGNcoupons/company/getCouponsByCategory",
        updatePassword: "/GYGNcoupons/company/updatePassword",
        companyDetails: "/GYGNcoupons/company/companyDetails",

        getCustomerCoupons: "/GYGNcoupons/customer/getCustomerCoupons",
        getCustomerCouponsByCategory: "/GYGNcoupons/customer/GetCustomerCouponsByCategory",
        getCustomerCouponsByMaxPrice: "/GYGNcoupons/customer/getCouponsByMaxPrice",
        customerDetails: "/GYGNcoupons/customer/customerDetails",
    }
}
//go to process, find the enviroment and from there take the node enviroment,
//if this fits production then return productionGlobals, else developmentGlobals
const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals :  new DevelopmentGlobals;
export default globals;