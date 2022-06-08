import "./getAllCustomers.css";
import { useNavigate } from 'react-router-dom';
import { customer_details } from './../../../../modal/customer_details';
import { useEffect, useState } from "react";
import jwtAxios from './../../../../util/jwtAxios';
import globals from "../../../../util/globals";
import msgNotify, { ErrMsg } from './../../../../util/notify';
import SingleCustomer from "../../customer/singleCustomer/singleCustomer";
import { store } from "../../../../redux/store";

function GetAllCustomers(): JSX.Element {
    const navigate = useNavigate();
    const[customers, setCustomers] = useState<customer_details[]>([]);
    
    useEffect(()=>{
        if (store.getState().userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        jwtAxios.get<customer_details[]>(globals.urls.listCustomers)
        .then (response =>{
            setCustomers(response.data)
        })
        .catch(err=>{
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        })
    },[])
    return (
        <div className="getAllCustomers">
			<h1>Customers</h1><hr/>
            {customers.map(item=><SingleCustomer key={item.id} customer={item}/>)}
        </div>
    );
}

export default GetAllCustomers;
