import "./addCustomer.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function AddCustomer(): JSX.Element {
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
        <div className="addCustomer">
			<h1>הוספת לקוח</h1><hr/>
        </div>
    );
}

export default AddCustomer;
