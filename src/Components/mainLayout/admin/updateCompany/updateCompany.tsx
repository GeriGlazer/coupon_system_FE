import { Button, ButtonGroup, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { company_details } from "../../../../modal/company_details";
import { deleteCompany, updateCompanies } from "../../../../redux/companyState";
import { store } from "../../../../redux/store";
import globals from "../../../../util/globals";
import jwtAxios from "../../../../util/jwtAxios";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import "./updateCompany.css";
import { logOutUser } from './../../../../redux/authState';
import { useDispatch } from 'react-redux';

function UpdateCompany(): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const location = useLocation();
    const {companyId} = location.state as any;
    const [company, setCompany] = useState(new company_details());
    const {register, handleSubmit} = useForm<company_details>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect (()=>{
        setCompany(store.getState().companyState.company.find(item=>companyId==item.id));
    }, []);

    const goBack = ()=>{
        navigate("/admin/getAllCompanies");
    }

    const send = ()=>{
        jwtAxios.put(globals.urls.updateCompany,company)
        .then(response=>{
            if(response.status<300){
                msgNotify.success("Company details updated.")
                dispatch(updateCompanies(company));
            }else{
                msgNotify.error("something gone wrong");
            }       
        })
        .catch(err=>{
            msgNotify.error(err.response.data.details);
        })
        goBack();
    }
    const removeCompany = ()=>{
        jwtAxios.delete(globals.urls.deleteCompany+companyId)        
        .then(response=>{
            if (response.status<300){
                msgNotify.success("company "+company.name+" was deleted :)");
                store.dispatch(deleteCompany(company.id));
            } else {
                msgNotify.error(response.data);
            }
        })
        .then(()=>{
                navigate("/admin/getAllCompanies");
        })
        .catch(err=>{
            msgNotify.error(err.response.data.details);
        })
    }
    const emailChange = (args:SyntheticEvent)=>{
        company.email = (args.target as HTMLInputElement).value;
    }

    return (
        <div className="updateCompany SolidBox">
            <h1 style={{textAlign:"center"}}>Update Company Details</h1><hr/>
            <h3 style={{textAlign:"center"}}>{company.id}</h3>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="name" label={company.name} variant="outlined" className="TextBox" fullWidth
                    disabled helperText="Company Name"/>
                <br/><br/>
                <TextField name="email" label={company.email} variant="outlined" className="TextBox" fullWidth {...register("email",{
                    required:{
                        value:true,
                        message: 'Missing Email'
                    }
                    })}  onChange={emailChange} helperText="Company Email"/>
                <br/><br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >Update</Button>
                    <Button variant="contained" color="warning" onClick={removeCompany} fullWidth>delete</Button>
                </ButtonGroup>
            </form>
             <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default UpdateCompany;
