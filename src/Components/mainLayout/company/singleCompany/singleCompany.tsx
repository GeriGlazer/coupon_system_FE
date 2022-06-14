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
    const navigate = useNavigate();
    const updateCompany = ()=>{
        navigate("/admin/updateCompany/", {state:{companyId:props.company.id}} );
    }
    const couponsList = ()=>{
        //navigate("/company/getAllCoCmpanyCoupons", {state:{companyId:props.company.id}})
        navigate("/company/getAllCoCmpanyCoupons")
    }

    return (
        <div className="singleCompany SolidBox">
			<h2 style={{textAlign:"center"}}>{props.company.id}</h2><hr/><br/>
            {props.company.name}<br/><br/>
            {props.company.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {<Button color="primary" onClick={couponsList}>Coupons</Button>}
                {<Button color="success" onClick={updateCompany} >Edit Company</Button>}
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;
