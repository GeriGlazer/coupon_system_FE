import "./getCompanyDetails.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function GetCompanyDetails(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        /*.catch(err=>{
            msgNotify.error(err);
        })*/
    }, []);

    return (
        <div className="getCompanyDetails">
			<h1>פרטי חברה</h1><hr/>
        </div>
    );
}

export default GetCompanyDetails;
