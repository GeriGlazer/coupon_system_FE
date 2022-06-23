import "./addCoupon.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import Button from "@mui/material/Button";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
    }, []);

    const goHome = ()=>{
        navigate("/company/companyMainPage");
    }
    return (
        <div className="addCoupon">
			<h1>Add coupons</h1><hr/>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default AddCoupon;
