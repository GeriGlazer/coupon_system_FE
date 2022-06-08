import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { company_details } from "../../../../modal/company_details";
import { store } from "../../../../redux/store";
import globals from "../../../../util/globals";
import jwtAxios from "../../../../util/jwtAxios";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import SingleCompany from "../../company/singleCompany/singleCompany";
import "./getAllCompanies.css";

function GetAllCompanies(): JSX.Element {
    const[companies, setCompanies] = useState<company_details[]>([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        jwtAxios.get<company_details[]>(globals.urls.listCompanies)
        .then (response=>{
            setCompanies(response.data);
        })
        .catch(err=>{
            msgNotify.error(err);
        })
    }, []);

    return (
        <div className="getAllCompanies">
			<h1>Companies</h1><hr/>
            {companies.map(item=><SingleCompany key = {item.id} company={item}/>)}
        </div>
    );
}

export default GetAllCompanies;
