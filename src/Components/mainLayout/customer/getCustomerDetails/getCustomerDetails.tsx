import "./getCustomerDetails.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { customer_details } from "../../../../modal/customer_details";
import SingleCustomer from './../singleCustomer/singleCustomer';
import Button from "@mui/material/Button";

function GetCustomerDetails(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new customer_details());
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="CUSTOMER"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setCustomer(store.getState().customerState.customer[0]);
    }, []);

    const goHome = ()=>{
        navigate("/customer/customerMainPage");
    }

    return (
        <div className="getCustomerDetails">
			<h1>My details</h1><hr/>
            <SingleCustomer key={customer.id} customer={customer}/>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default GetCustomerDetails;
