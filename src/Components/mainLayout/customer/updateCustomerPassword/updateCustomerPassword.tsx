import { Button, ButtonGroup, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { customer_details } from "../../../../modal/customer_details";
import { updateCustomer } from "../../../../redux/customerState";
import { store } from "../../../../redux/store";
import globals from "../../../../util/globals";
import jwtAxios from "../../../../util/jwtAxios";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import "./updateCustomerPassword.css";

function UpdateCustomerPassword(): JSX.Element {
    const location = useLocation();
    const {customerId} = location.state as any;
    const [customer, setCustomer] = useState(new customer_details());
    const {register, handleSubmit} = useForm<customer_details>();
    const navigate = useNavigate();

    useEffect(()=>{
        const singleCustomer = store.getState().customerState.customer.find(item=>customerId==item.id);
        setCustomer(singleCustomer);
        console.log(customerId)
        console.log(customer)
        console.log(singleCustomer)
    }, []);
    
    const updatePass = ()=>{
        jwtAxios.put(globals.urls.updateCustomer, customer)        
        .then(response=>{
            if (response.status<300){
                msgNotify.success("password updated successfully");
                store.dispatch(updateCustomer(customer));
            } else {
                msgNotify.error("password update failed");
            }
        })
        .then(()=>{
            navigate("/customer/customerMainPage");
        })
        .catch(err=>{
            msgNotify.error(err);
            console.log(err);
        })
    }


    const passChange = (args:SyntheticEvent)=>{
        customer.password = (args.target as HTMLInputElement).value;
    }

    const goBack = ()=>{
        navigate("/customer/getCustomerDetails");
    }

    return (
        <div className="updateCustomerPassword SolidBox">
             
                <h1 style={{textAlign:"center"}}>update your password</h1><hr/>
            <h3 style={{textAlign:"center"}}>{customerId}</h3>
            <form onSubmit={handleSubmit(updatePass)}>
                <TextField name="oldPassword" label="oldPassword" variant="outlined" className="TextBox" fullWidth />

                <TextField name="newPassword" label="newPassword" variant="outlined" className="TextBox" fullWidth
                {...register("password",{
                    required:{
                        value:true,
                        message: 'Missing new password'
                    }
                })}  onChange={passChange} helperText="update password"/>

            <TextField name="verifyPassword" label="verifyPassword" variant="outlined" className="TextBox" fullWidth/>

                <ButtonGroup variant="contained" fullWidth>
                   
                    <Button type="submit" color="primary" onClick={updatePass} >Update</Button>
                </ButtonGroup>
            </form>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default UpdateCustomerPassword;
