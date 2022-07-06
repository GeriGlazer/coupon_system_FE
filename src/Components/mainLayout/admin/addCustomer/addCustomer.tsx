import "./addCustomer.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg, SccMsg } from "../../../../util/notify";
import { useForm } from "react-hook-form";
import { customer_details } from "../../../../modal/customer_details";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { removeAll } from "../../../../redux/companyState";
import { addCustomer, downloadCustomers, downloadSingleCustomer } from "../../../../redux/customerState";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/authState";
import user_details from '../../../../modal/user_details';

function AddCustomer(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<customer_details>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserType = store.getState().AuthState.userType;

    const send = (customer: customer_details) => {
        customer.coupons=[];
        jwtAxios.post(globals.urls.addCustomer, customer)
        .then(response =>{
            if(response.status<300){
                msgNotify.success("customer added");
                let fullCustomer = response.data;
                store.dispatch(addCustomer(fullCustomer));
            }else{
                msgNotify.error(ErrMsg.CUSTOMER_EXISTS);
            }
        })
        .catch(err => {
            msgNotify.error(err.response.data.details);
        })
        .then(()=>{
            if(getUserType=="ADMIN"){
                navigate("/admin/getAllCustomers");
            }else{
                let userDetails = new user_details;
                userDetails.email = customer.email;
                userDetails.pass = customer.password;
                userDetails.clientType="CUSTOMER"
                jwtAxios.post(globals.urls.login, userDetails)
                .then((response) => {
                msgNotify.success(SccMsg.LOGIN_APPROVED);
                dispatch(loginUser(response.headers.authorization));
                console.log(store.getState().AuthState.userType);
              navigate("/customer/customerMainPage");
            })
            }   
        })
        .catch(err => {
            msgNotify.error(err.response.data.details);
        })
    }

    const goBack = ()=>{
        if(getUserType==="ADMIN"){
            navigate("/admin/adminMainPage");
        }
            navigate("/");
    }

    return (
        <div className="addCustomer SolidBox">
        <Typography variant="h3" className="HeadLine">Add Customer:</Typography>
        <form onSubmit={handleSubmit(send)}>
            <TextField name="firstName" label="firstName" variant="outlined" fullWidth {...register("firstName",{
                required:{
                    value:true,
                    message: 'Missing first name'
                }
            })}/>
            <span>{errors.firstName?.message}</span>
            <br/>
            <br/><br/>
            <TextField name="lastName" label="lastName" variant="outlined" fullWidth {...register("lastName",{
                required:{
                    value:true,
                    message: 'Missing last name'
                }
            })}/>
            <span>{errors.lastName?.message}</span>
            <br/>
            <br/><br/>
            <TextField name="email" label="email" variant="outlined" className="TextBox" fullWidth {...register("email",{
                required:{
                    value:true,
                    message: 'Missing Email'
                }
            })}/>
            <span>{errors.email?.message}</span>
            <br/>
            <br/><br/>
            <TextField name="password" label="password" variant="outlined" className="TextBox" type="password" fullWidth {...register("password", {
                required:{
                    value:true,
                    message: 'Missing password'
                }
            })}/>
            <span>{errors.password?.message}</span>
            <br/><br/>
            <br/>
            <ButtonGroup variant="contained" fullWidth>
                <Button type="submit" color="primary" >Add customer</Button>
            </ButtonGroup>
        </form>
        <ButtonGroup variant="contained" fullWidth>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </ButtonGroup>
        </div>
    );
}

export default AddCustomer;
