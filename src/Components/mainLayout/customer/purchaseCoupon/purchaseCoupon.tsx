import "./purchaseCoupon.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function PurchaseCoupon(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="CUSTOMER"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
    }, []);


    return (
        <div className="purchaseCoupon">
			<h1>רכישת קופון</h1><hr/>
        </div>
    );
}

export default PurchaseCoupon;
