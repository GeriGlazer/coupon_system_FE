import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { company_details } from "../../../../modal/company_details";
import { updateToken } from "../../../../redux/authState";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import SingleCompany from "../../company/singleCompany/singleCompany";
import "./getAllCompanies.css";
import { Button } from "@mui/material";

function GetAllCompanies(): JSX.Element {
    const[companies, setCompanies] = useState<company_details[]>([]);
    const navigate = useNavigate();
    {/*add search bar */}
    useEffect(()=>{
        if (store.getState().AuthState.userType!=="ADMIN"){
            msgNotify.error(ErrMsg.LOGIN_AS_ADMIN);
            navigate("/login");
        }
        setCompanies(store.getState().companyState.company);
        }, []);

        const goBack = ()=>{
            navigate("/admin/adminMainPage");
        }

    return (
        <div className="getAllCompanies">  
			<h1>Companies</h1><hr/>
            {companies.map(item=><SingleCompany key = {item.id} company={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default GetAllCompanies;
