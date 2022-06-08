import "./updateCustomer.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function UpdateCustomer(): JSX.Element {
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
        <div className="updateCustomer">
			<h1>עידכון לקוח</h1><hr/>
        </div>
    );
}

export default UpdateCustomer;
