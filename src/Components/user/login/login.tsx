
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import user_details from "../../../modal/user_details";
import "./login.css";
import msgNotify, { SccMsg} from './../../../util/notify';
import globals from "../../../util/globals";
import jwtAxios from "../../../util/jwtAxios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/authState";
import { store } from "../../../redux/store";
import { downloadCompanies } from './../../../redux/companyState';
import { company_details } from './../../../modal/company_details';
import { customer_details } from "../../../modal/customer_details";
import { downloadCustomers } from "../../../redux/customerState";

function Login(): JSX.Element {

    const {register, handleSubmit, formState:{errors}} = useForm<user_details>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const send = (details:user_details)=>{
        jwtAxios.post(globals.urls.login, details)
        .then(response => {
            msgNotify.success(SccMsg.LOGIN_APPROVED)
            
            dispatch(loginUser(response.headers.authorization));
            console.log(store.getState().AuthState.userType)
            if(store.getState().AuthState.userType==="ADMIN"){
                if(store.getState().companyState.company.length<1){
                    jwtAxios.get<company_details[]>(globals.urls.listCompanies)
                    .then(response=>{
                        store.dispatch(downloadCompanies(response.data));
                    })
                    .catch(err => {
                        msgNotify.error("No companies in the system");
                    })
                }

            if(store.getState().customerState.customer.length<1){
                    jwtAxios.get<customer_details[]>(globals.urls.listCustomers)
                    .then(response=>{
                        store.dispatch(downloadCustomers(response.data))
                    })
                    .catch(err => {
                        msgNotify.error("No customers in the system");
                    })
            }
            navigate("/admin/adminMainPage");
            }

            if(store.getState().AuthState.userType==="COMPANY"){
                navigate("/company/companyMainPage");
                {/*dispatch(downloadCompanyCoupons()) */}
            }
            if(store.getState().AuthState.userType==="CUSTOMER"){
                navigate("/customer/customerMainPage");
                {/*dispatch(downloadCustomerCoupons()) */}
            }
        
        })
        .catch(err => {
            msgNotify.error(err);
        })
    }

    return (
        <div className="login SolidBox">
            <Typography variant="h3" className="HeadLine">Login</Typography>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="clientType" label="clientType" variant="outlined" fullWidth {...register("clientType",{
                    required:{
                        value:true,
                        message: 'Missing client type'
                    }
                })}/>
                <span>{errors.clientType?.message}</span>
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
                <TextField name="pass" label="pass" variant="outlined" className="TextBox" type="password" fullWidth {...register("pass", {
                    required:{
                        value:true,
                        message: 'Missing password'
                    }
                })}/>
                <span>{errors.pass?.message}</span>
                <br/><br/>
                <br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >login</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default Login;
