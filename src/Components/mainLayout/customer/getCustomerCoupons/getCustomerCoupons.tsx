import "./getCustomerCoupons.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { customer_details } from "../../../../modal/customer_details";
import { Coupon_Details } from "../../../../modal/coupon_details";


function GetCustomerCoupons(): JSX.Element {
    const location = useLocation();
    const {customerId} = location.state as any;
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new customer_details()); 
    const [ customerCoupons, setCustomerCoupons] = useState<Coupon_Details[]>([]);
    
    useEffect(()=>{
        let singleCustomer = store.getState().customerState.customer.find(item=>customerId==item.id);
        setCustomer(singleCustomer);
        setCustomerCoupons(singleCustomer.coupons);
    }, []);

    return (
        <div className="getCustomerCoupons">
			<h1>Customer Coupons</h1><hr/>
        </div>
    );
}

export default GetCustomerCoupons;
