import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { company_details } from "../../../../modal/company_details";
import { store } from "../../../../redux/store";
import globals from "../../../../util/globals";
import jwtAxios from "../../../../util/jwtAxios";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import SingleCompany from "../../company/singleCompany/singleCompany";
import "./getOneCompany.css";

function GetOneCompany(): JSX.Element {
    const navigate = useNavigate();
    const[company, setCompany] = useState<company_details>();
    const searchCompany = (sender:SyntheticEvent)=>{
        const value = (sender.target as HTMLInputElement).value;
        {/*setCompay(value) */}
        return value;
    };
    
    useEffect(()=>{
        if (store.getState().userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        {/* jwtAxios.get<company_details>(globals.urls.oneCompany + searchCompany)*/}
        jwtAxios.get<company_details>(globals.urls.oneCompany + searchCompany)
        .then (response =>{
            setCompany(response.data)
        })
        .catch(err=>{
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        })
    },[])
    return (
        <div className="getOneCompany">
			<h1>Company Details</h1><hr/>
            {/*<input type="text" placeholder="Find Company by ID" onChange={searchCompany} value={company}></input>*/}
            <input type="text" placeholder="Find Company by ID" onChange={searchCompany}></input>
            {company.map((item: company_details)=><SingleCompany key = {item.id} company={item}/>)}


        </div>
    );
}

export default GetOneCompany;
