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

function UpdateCompany(): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const location = useLocation();
    const {companyId} = location.state as any;
    const [company, setCompany] = useState(new company_details());
    const {register, handleSubmit} = useForm<company_details>();
    const navigate = useNavigate();

    useEffect (()=>{
        setCompany(store.getState().companyState.company.find(item=>companyId==item.id));
    }, []);

    const goHome = ()=>{
        if(getUserType==="ADMIN"){
            navigate("/admin/getAllCompanies");
        }
        if(getUserType==="COMPANY"){
            navigate("/company/getCompanyDetails");
        }
    }

    const send = ()=>{
        if (getUserType!="ADMIN"){
            msgNotify.error(ErrMsg.LOGIN_AS_ADMIN);
            navigate("/login");
        }
        jwtAxios.put(globals.urls.updateCompany, company)
        .then(response=>{
            if(response.status<300){
                msgNotify.success("Company details updated.")
            }else{
                msgNotify.error(ErrMsg.COMPANY_MAIL_EXIST);
            }       
        })
        .then(()=>{
            store.dispatch(updateCompanies(company));
            
        })
        .catch(err=>{
            msgNotify.error(err);
        })
        navigate("/admin/getAllCompanies");
    }
    const removeCompany = ()=>{
        jwtAxios.delete(globals.urls.deleteCompany+company.id)        
        .then(response=>{
            if (response.status<300){
                msgNotify.success("company "+company.name+" was deleted :)");
                store.dispatch(deleteCompany(company.id));
            } else {
                msgNotify.error(ErrMsg.ID_NOT_FOUND);
            }
        })
        .then(()=>{
            navigate("/admin/getAllCompanies");
        })
        .catch(err=>{
            msgNotify.error("We got a problem");
            console.log(err);
        })
    }
    const emailChange = (args:SyntheticEvent)=>{
        company.email = (args.target as HTMLInputElement).value;
    }

    const showButtons = ()=>{
        if (getUserType=="ADMIN"){
            return(
                <>
                    <h1 style={{textAlign:"center"}}>Delete Company</h1><hr/>
                    <TextField name="name" label={company.name} variant="outlined" className="TextBox" fullWidth
                        disabled />
                    <br/><br/>
                    <TextField name="email" label={company.email} variant="outlined" className="TextBox" fullWidth 
                        disabled />
                    <br/><br/>
                    <Button variant="contained" color="warning" onClick={removeCompany} fullWidth>delete</Button>
                </>
            )
        }
        else if (getUserType == "COMPANY"){
            return(
                <>
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
                            <Button color="success" component={Link} to={globals.urls.updatePassword}>Change Password</Button>
                            <Button type="submit" color="primary" >Update</Button>
                        </ButtonGroup>
                    </form>
                    <Button variant="contained" color="warning" onClick={removeCompany} fullWidth>delete</Button>
                </>
            )
        }
    }


    return (
        <div className="updateCompany SolidBox">
            {showButtons()}   
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default UpdateCompany;
