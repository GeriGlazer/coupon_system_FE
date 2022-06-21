import "./updateCustomer.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { customer_details } from "../../../../modal/customer_details";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { deleteCustomer, updateCustomer } from "../../../../redux/customerState";

function UpdateCustomer(): JSX.Element {
    const location = useLocation();
    const {customerId} = location.state as any;
    const [customer, setCustomer] = useState(new customer_details());
    const {register, handleSubmit} = useForm<customer_details>();
    const navigate = useNavigate();

    
    useEffect(()=>{
<<<<<<< HEAD
        if (store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error(ErrMsg.LOGIN_AS_ADMIN);
            navigate("/login");
        }
        setCustomer(store.getState().customerState.customer.find(item=>customerId==item.id));
    }, []);

    const goHome = ()=>{
        navigate("/admin/getAllCustomers");
    }

=======
      if (store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error(ErrMsg.LOGIN_AS_ADMIN);
            navigate("/login");
        }
        setCustomer(store.getState().customerState.customers.find(item=>customerId==item.id));
    }, [])
    
>>>>>>> bc22e61de7c22decd129d7050bb8084a9bcc73f8
    const send = ()=>{
        
        jwtAxios.put(globals.urls.updateCustomer, customer)
        .then(response=>{
            if(response.status<300){
                msgNotify.success("Customer details updated.")
            }else{
                msgNotify.error("Cusromer's email exists");
            }       
        })
        .then(()=>{
            store.dispatch(updateCustomer(customer));
            
        })
        .catch(err=>{
            msgNotify.error(err);
        })
        navigate("/admin/getAllCustomers");
    }   
    
    const removeCustomer = ()=>{
        jwtAxios.delete(globals.urls.deleteCustomer+customer.id)        
        .then(response=>{
            if (response.status<300){
                msgNotify.success("Customer "+customer.firstName+" "+customer.lastName+" was delete");
                store.dispatch(deleteCustomer(customer.id));
            } else {
                msgNotify.error(ErrMsg.ID_NOT_FOUND);
            }
        })
        .then(()=>{
            navigate("/admin/getAllCustomers");
        })
        .catch(err=>{
            msgNotify.error("We got a problem");
            console.log(err);
        })
    }
    const firstNameChange = (args:SyntheticEvent)=>{
        customer.firstName = (args.target as HTMLInputElement).value;
    }
    const lastNameChange = (args:SyntheticEvent)=>{
        customer.lastName = (args.target as HTMLInputElement).value;
    }
    const emailChange = (args:SyntheticEvent)=>{
        customer.email = (args.target as HTMLInputElement).value;
    }
    return (
        <div className="updateCustomer SolidBox">
			<h1 style={{textAlign:"center"}}>Update Customer Details</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="firstName" label={customer.firstName} variant="outlined" className="TextBox" fullWidth
                {...register("firstName",{
                    required:{
                        value:true,
                        message: 'Missing firstName'
                    }
                })}  onChange={firstNameChange} helperText="First name"/>

                <TextField name="lastName" label={customer.lastName} variant="outlined" className="TextBox" fullWidth
                {...register("lastName",{
                    required:{
                        value:true,
                        message: 'Missing lastName'
                    }
                })}  onChange={lastNameChange} helperText="Last name"/>

                <TextField name="email" label={customer.email} variant="outlined" className="TextBox" fullWidth {...register("email",{
                    required:{
                        value:true,
                        message: 'Missing Email'
                    }
                })}  onChange={emailChange} helperText="Email"/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button color="success" component={Link} to={globals.urls.updatePassword}>Change Password</Button>
                    <Button type="submit" color="primary" >Update</Button>
                </ButtonGroup>
            </form>
            <Button variant="contained" color="warning" onClick={removeCustomer} fullWidth>delete</Button>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default UpdateCustomer;
