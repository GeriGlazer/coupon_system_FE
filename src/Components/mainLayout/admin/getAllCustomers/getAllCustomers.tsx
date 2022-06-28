import "./getAllCustomers.css";
import { useNavigate } from 'react-router-dom';
import { customer_details } from './../../../../modal/customer_details';
import { useEffect, useState } from "react";
import jwtAxios from './../../../../util/jwtAxios';
import globals from "../../../../util/globals";
import msgNotify, { ErrMsg } from './../../../../util/notify';
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import { store } from "../../../../redux/store";
import { Button } from "@mui/material";

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const[customers, setCustomers] = useState<customer_details[]>([]);
    {/*add search bar */}
    useEffect(()=>{
        if (store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setCustomers(store.getState().customerState.customer);
    },[]);

    const goBack = ()=>{
        navigate("/admin/adminMainPage");
    }

    return (
        <div className="getAllCustomers">
			<h1>Customers</h1><hr/>
            {customers.map(item=><SingleCustomer key={item.id} customer={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetAllCustomers;
