import { Button, ButtonGroup } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import "./singleCompany.css";
import { company_details } from "../../../../modal/company_details";
import globals from "../../../../util/globals";
import jwtAxios from "../../../../util/jwtAxios";
import msgNotify from "../../../../util/notify";
import { store } from "../../../../redux/store";
import { deleteCompany } from "../../../../redux/companyState";

interface SingleCompanyProps {
    company: company_details;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    const getUserType = store.getState().AuthState.userType;
    const navigate = useNavigate();
    const updateCompany = ()=>{
        navigate("/admin/updateCompany/", {state:{companyId:props.company.id}} );
    }
    const couponsList = ()=>{
        navigate("/company/getAllCompanyCoupons", {state:{companyId:props.company.id}})
    }

    const showButtons = ()=>{
        if (getUserType=="COMPANY"){
            return(
                <>
                    <Button color="primary" onClick={couponsList}>Coupons</Button>
                    <Button color="secondary" onClick={updateCompany} >Edit Company</Button>
                </>
            )
        }
        else if (getUserType=="ADMIN"){
           return(
            <>
                <Button color="primary" onClick={couponsList}>Coupons</Button>
                <Button  color="secondary" onClick={updateCompany} >Delete Company</Button>
            </>
           ) 
        }
    }

    return (
        <div className="singleCompany SolidBox">
			<h2 style={{textAlign:"center"}}>{props.company.id}</h2><hr/><br/>
            {props.company.name}<br/><br/>
            {props.company.email}<br/><br/>
            {showButtons()}
        </div>
    );
}

export default SingleCompany;
