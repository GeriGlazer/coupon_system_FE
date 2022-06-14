import "./addCompany.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg, SccMsg } from "../../../../util/notify";
import { company_details } from './../../../../modal/company_details';
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import { removeAll, downloadCompanies } from "../../../../redux/companyState";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";

function AddCompany(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<company_details>();
    const navigate = useNavigate();
    
    const send = (company:company_details)=>{
        if (store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        jwtAxios.post(globals.urls.addCompany, company)
        .then(response => {
            if(response.status<300){
                msgNotify.success("Company added.");
                store.dispatch(removeAll());
            }else{
                msgNotify.error(ErrMsg.COMPANY_MAIL_EXIST);
            }
        }) 
        jwtAxios.get<company_details[]>(globals.urls.listCompanies) 
        .then((response)=>{
            store.dispatch(downloadCompanies(response.data));
        })
        .then(()=>{
            navigate("/admin/getAllCompanies");
        })    
        .catch(err => {
            msgNotify.error(err);
        })
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
                    <Button type="submit" color="primary" >add company</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default AddCompany;
