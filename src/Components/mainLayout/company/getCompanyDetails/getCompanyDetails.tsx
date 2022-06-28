import "./getCompanyDetails.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import Button from "@mui/material/Button";
import { company_details } from './../../../../modal/company_details';
import SingleCompany from "../singleCompany/singleCompany";

function GetCompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    const [company, setCompany] = useState(new company_details());
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setCompany(store.getState().companyState.company[0]);
    }, []);

    const showDetails = ()=>{
return(
    <>
    <div >
        <SingleCompany key={company.id} company={company} />
    </div>
    </>
)
    }

    const goBack = ()=>{
        navigate("/company/companyMainPage");
    }

    return (
        <div className="getCompanyDetails">
			<h1>My details</h1><hr/>
            {showDetails()}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetCompanyDetails;
