import { Button, ButtonGroup } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import "./singleCompany.css";
import { company_details } from "../../../../modal/company_details";
import { store } from "../../../../redux/store";


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
        if (getUserType == "COMPANY"){
            return(
                <>
                <br/><br/>
                <Button color="primary" onClick={couponsList}>Coupons</Button>
                <br/><br/>
                </>
            )
        }
        else {
            return(
                <>
                <br/><br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button color="primary" onClick={couponsList}>Coupons</Button>
                    <Button color="secondary" onClick={updateCompany} >Edit Company</Button>
                </ButtonGroup>
                <br/><br/>
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
