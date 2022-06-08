import "./getCouponsByMaxPrice.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function GetCouponsByMaxPrice(): JSX.Element {
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
        <div className="getCouponsByMaxPrice">
			<h1>קבלת קופנים לפי מחיר גבוה</h1><hr/>
        </div>
    );
}

export default GetCouponsByMaxPrice;
