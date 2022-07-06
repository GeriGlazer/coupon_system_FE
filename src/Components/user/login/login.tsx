import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select,SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import user_details from "../../../modal/user_details";
import "./login.css";
import msgNotify, { SccMsg } from "./../../../util/notify";
import globals from "../../../util/globals";
import jwtAxios from "../../../util/jwtAxios";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/authState";
import { store } from "../../../redux/store";
import {  downloadCompanies,  downloadSingleCompany,} from "./../../../redux/companyState";
import { company_details } from "./../../../modal/company_details";
import { customer_details } from "../../../modal/customer_details";
import { downloadCustomers, downloadSingleCustomer } from "../../../redux/customerState";
import { useState } from "react";

function Login(): JSX.Element {
  const {register, handleSubmit, formState: { errors },} = useForm<user_details>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientType, setClientType] = useState('');
  const handleChange = (event:SelectChangeEvent) => {
    setClientType(event.target.value as string);
  }

  const goHome = ()=>{
    navigate("/");
}

  const send = (details: user_details) => {
    // who tuched the login??
    jwtAxios.post(globals.urls.login, details)
      .then((response) => {
        msgNotify.success(SccMsg.LOGIN_APPROVED);
        dispatch(loginUser(response.headers.authorization));
        console.log(store.getState().AuthState.userType);
        if (store.getState().AuthState.userType === "ADMIN") {
          jwtAxios.get<company_details[]>(globals.urls.listCompanies)
            .then((response) => {
              store.dispatch(downloadCompanies(response.data));
            })
            .catch((err) => {
              msgNotify.error(err.response.data.details);
            });
          jwtAxios.get<customer_details[]>(globals.urls.listCustomers)
            .then((response) => {
              store.dispatch(downloadCustomers(response.data));
            })
            .catch((err) => {
              msgNotify.error(err.response.data.details);
            });
          navigate("/admin/adminMainPage");
        }
        if (store.getState().AuthState.userType === "COMPANY") {
          jwtAxios.get<company_details>(globals.urls.companyDetails)
            .then((response) => {
              let SingleCompany = response.data;
              store.dispatch(downloadSingleCompany(SingleCompany));
            });
          navigate("/company/companyMainPage");
        }
        if (store.getState().AuthState.userType === "CUSTOMER") {
          jwtAxios.get<customer_details>(globals.urls.customerDetails)
          .then((response)=>{
            let SingleCustomer= response.data;
            store.dispatch(downloadSingleCustomer(SingleCustomer));
          });
          navigate("/");
        }
      })
      .catch((err) => {
        msgNotify.error(err.response.data.details);
      });
  };

  return (
    <div className="login SolidBox">
      <Typography variant="h3" className="HeadLine">Login</Typography>
      <br /><br />
      <form onSubmit={handleSubmit(send)}>
      <FormControl fullWidth > 
            <InputLabel id="clientType">client Type</InputLabel>
              <Select  labelId="clientType" value={clientType} label="clientType" {...register("clientType",{
                  required:{
                      value:true,
                      message: 'Missing client type'
                  }
              })}
                onChange={handleChange}>
                <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                <MenuItem value={"CUSTOMER"}>CUSTOMER</MenuItem>
                <MenuItem value={"COMPANY"}>COMPANY</MenuItem>

              </Select>
        </FormControl>
        <span>{errors.clientType?.message}</span>
        <br /><br /><br />
        <TextField name="email" label="email" variant="outlined"  className="TextBox" fullWidth {...register("email", {
            required: {
              value: true,
              message: "Missing Email",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br /> <br /> <br />
        <TextField name="pass" label="pass" variant="outlined" className="TextBox" type="password" fullWidth {...register("pass", {
            required: {
              value: true,
              message: "Missing password",
            },
          })}
        />
        <span>{errors.pass?.message}</span>
        <br /><br />
        <NavLink to="/register">New user? create account</NavLink>
        <br /><br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Login</Button>
        </ButtonGroup>
        <br/> <br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
      </form>
    </div>
  );
}

export default Login;
