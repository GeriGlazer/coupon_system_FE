import "./getCustomerCouponsByCategory.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function GetCustomerCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="CUSTOMER"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        /*.catch(err=>{
            msgNotify.error(err);
        })*/
    }, []);

    return (
        <div className="getCustomerCouponsByCategory">
			<h1>הקופונים שלי לפי קטגוריה</h1><hr/>
        </div>
    );
}

export default GetCustomerCouponsByCategory;
