
import { useNavigate } from "react-router-dom";
import "./myHeader.css";
import { store } from "../../../redux/store";
import Button from "@mui/material/Button";
import { logOutUser } from './../../../redux/authState';

function MyHeader(): JSX.Element {

    const getState = store.getState().AuthState.userType;
    const navigate = useNavigate();
    const goToLogin= ()=>{
        navigate("/login");
    }
    const logOut = ()=>{
        store.dispatch(logOutUser());
        navigate("/");
    }

    const checkIsLogin=()=>{
        if(getState==''){
            return(
            <>
                <Button  variant="contained" color="secondary" onClick={goToLogin}>Login</Button>
                <span> </span>
                <Button  variant="contained" color="secondary" onClick={register} >Register</Button>
            </>
            ) ;   
        }
            return(
            <>
                <Button variant="contained" color="warning" onClick={logOut}>LogOut</Button>
            </>
            )
    }

     const register = ()=>{
        navigate("/register");
     }


    return (
        <div className="myHeader botton-padding" >
			{checkIsLogin()}
        </div>
    );
}

export default MyHeader;
