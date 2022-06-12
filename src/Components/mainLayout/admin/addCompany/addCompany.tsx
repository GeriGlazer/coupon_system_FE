import "./addCompany.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function AddCompany(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="ADMIN"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        /*.catch(err=>{
            msgNotify.error(err);
        })*/
    }, []);


    return (
        <div className="addCompany">
			<h1>Add company</h1><hr/>
        </div>
    );
}

export default AddCompany;
