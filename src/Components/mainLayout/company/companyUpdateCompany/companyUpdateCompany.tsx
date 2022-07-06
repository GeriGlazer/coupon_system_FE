import "./companyUpdateCompany.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import globals from "../../../../util/globals";
import { company_details } from './../../../../modal/company_details';
import { updateCompanies } from "../../../../redux/companyState";
function CompanyUpdateCompany(): JSX.Element {

    const location = useLocation();
    const {companyId} = location.state as any;
    const [company, setCompany] = useState(new company_details());
    const {register, handleSubmit} = useForm<company_details>();
    const navigate = useNavigate();
    const getUserType = store.getState().AuthState.userType;

    
    useEffect(()=>{
        setCompany(store.getState().companyState.company.find(item=>companyId==item.id));
    }, []);

    const goBack = ()=>{
            navigate("/company/companyMainPage");
    }

    

    const send = ()=>{
        jwtAxios.put(globals.urls.companyUpdateCompany, company)
        .then(response=>{
            if(response.status<300){
                msgNotify.success("Customer details updated.")
                store.dispatch(updateCompanies(company));
            }else{
                msgNotify.error("something gone wrong");
            }       
        })
        .catch(err=>{
            console.log(err.response.data.details);
        })
        goBack();
    }   
    
    
    const emailChange = (args:SyntheticEvent)=>{
        company.email = (args.target as HTMLInputElement).value;
    }    

    return (
        <div className="companyUpdateCompany SolidBox">
			<h1 style={{textAlign:"center"}}>Update Customer Details</h1><hr/>
            <form onSubmit={handleSubmit(send)}>
                <TextField name="name" label={company.name} variant="outlined" className="TextBox" fullWidth
                 disabled helperText="name"/>

                <TextField name="email" label={company.email} variant="outlined" className="TextBox" fullWidth {...register("email",{
                    required:{
                        value:true,
                        message: 'Missing Email'
                    }
                })}  onChange={emailChange} helperText="Email"/>


                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >Update</Button>
                </ButtonGroup>
    
            </form>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>

        </div>
    );
}

export default CompanyUpdateCompany;
