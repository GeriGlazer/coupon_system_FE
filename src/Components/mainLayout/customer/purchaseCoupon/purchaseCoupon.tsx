import "./purchaseCoupon.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function PurchaseCoupon(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().userType!="CUSTOMER"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        /*.catch(err=>{
            msgNotify.error(err);
        })*/
    }, []);


    return (
        <div className="purchaseCoupon">
			<h1>רכישת קופון</h1><hr/>
        </div>
    );
}

export default PurchaseCoupon;