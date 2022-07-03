import "./addCompany.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg, SccMsg } from "../../../../util/notify";
import { company_details } from './../../../../modal/company_details';
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import { removeAll, downloadCompanies, downloadSingleCompany, addCompany } from "../../../../redux/companyState";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { loginUser } from "../../../../redux/authState";
import { useDispatch } from "react-redux";

function AddCompany(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<company_details>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserType = store.getState().AuthState.userType;
    
    const send = (company:company_details)=>{
        jwtAxios.post(globals.urls.addCompany, company)
        .then(response => {
            if(response.status<300){
                msgNotify.success("Company added");
                store.dispatch(addCompany(company));
            }else{
                msgNotify.error(ErrMsg.COMPANY_MAIL_EXIST);
            }
        }) 
        .then(()=>{
            if(getUserType=="ADMIN"){
                navigate("/admin/getAllCompanies");
            }else{
            jwtAxios.post(globals.urls.login, company)
            .then((response) => {
            msgNotify.success(SccMsg.LOGIN_APPROVED);
            dispatch(loginUser(response.headers.authorization));
            console.log(store.getState().AuthState.userType);
            jwtAxios.get<company_details>(globals.urls.companyDetails)
            .then((response) => {
              let SingleCompany = response.data;
              store.dispatch(downloadSingleCompany(SingleCompany));
            });
          navigate("/company/companyMainPage");
        })
        }   
        }) 
           
        .catch(err => {
            msgNotify.error(err);
        })
    }

    const goBack = ()=>{
        if(getUserType==="ADMIN"){
            navigate("/admin/adminMainPage");
        }
            navigate("/");
    }

    return (
        <div className="addCompany SolidBox">
            <Typography variant="h3" className="HeadLine">Add Company:</Typography>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="name" label="name" variant="outlined" fullWidth {...register("name",{
                    required:{
                        value:true,
                        message: 'Missing company name'
                    }
                })}/>
                <span>{errors.name?.message}</span>
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
                    <Button type="submit" color="primary" >Add</Button>
                </ButtonGroup>
            </form>
            <ButtonGroup variant="contained" fullWidth>
                <Button variant="contained" color="error" onClick={goBack}> Back</Button>
            </ButtonGroup>
        </div>
    );
}

export default AddCompany;
