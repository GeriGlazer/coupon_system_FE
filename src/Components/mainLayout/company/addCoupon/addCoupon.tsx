import "./addCoupon.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function AddCoupon(): JSX.Element {
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
        <div className="addCoupon">
			<h1>הוספת קופון</h1><hr/>
        </div>
    );
}

export default AddCoupon;
