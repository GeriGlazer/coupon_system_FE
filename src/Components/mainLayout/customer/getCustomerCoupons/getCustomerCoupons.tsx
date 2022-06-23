import "./getCustomerCoupons.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import { customer_details } from "../../../../modal/customer_details";
import { Coupon_Details } from "../../../../modal/coupon_details";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";
import Button from "@mui/material/Button";


function GetCustomerCoupons(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new customer_details()); 
    const [ customerCoupons, setCustomerCoupons] = useState<Coupon_Details[]>([]);
    
    useEffect(()=>{

        if(store.getState().AuthState.userType=="ADMIN"){
            const {customerId} = location.state as any;
            let singleCustomer = store.getState().customerState.customer.find(item=>customerId==item.id);
            setCustomer(singleCustomer);
            setCustomerCoupons(singleCustomer.coupons);
        }
        else if(store.getState().AuthState.userType=="CUSTOMER"){
            let singleCustomer = store.getState().customerState.customer[0];
            setCustomerCoupons(singleCustomer.coupons);
        }
    }, []);

    const goHome = ()=>{
        if(store.getState().AuthState.userType==="ADMIN"){
            navigate("/admin/getAllCustomers");
        }
        if(store.getState().AuthState.userType==="CUSTOMER"){
            navigate("/customer/customerMainPage");
        }
    }


    {/*{customerCoupons.length==0?
            <span>No coupons Purchased</span>: 
            customerCoupons.map(item=>
                <SingleCoupon key={item.id} coupon={item}/>)*/}
    return (
        <div className="getCustomerCoupons">
			<h1>Customer Coupons</h1><hr/>
            {customerCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default GetCustomerCoupons;
