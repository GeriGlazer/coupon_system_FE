import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import "./updateCompany.css";

function UpdateCompany(): JSX.Element {

    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        /*.catch(err=>{
            msgNotify.error(err);
        })*/
    }, []);

    return (
        <div className="updateCompany">
			<h1>עידכון חברה</h1><hr/>
        </div>
    );
}

export default UpdateCompany;
