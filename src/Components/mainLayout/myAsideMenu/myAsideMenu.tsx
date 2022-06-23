
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";
import "./myAsideMenu.css";


function MyAsideMenu(): JSX.Element {
const navigate= useNavigate();

const adminMain = ()=>{
    navigate("/admin/adminMainPage");
}

const compMain = ()=>{
    navigate("/company/companyMainPage");
}

const custMain = ()=>{
    navigate("/customer/customerMainPage");
}


    var menu = ()=>{
        if(store.getState().AuthState.userType=="ADMIN"){
           return (
           <>
           <Button variant="contained" color="success" onClick={adminMain}>My Options</Button> 
           </>
            )
        }
        if(store.getState().AuthState.userType=="COMPANY"){
           return (
           <>
           <Button variant="contained" color="success" onClick={compMain}>My Options</Button>
           </>
           )
        }
        if(store.getState().AuthState.userType=="CUSTOMER"){
            return (
            <>
            <Button variant="contained" color="success" onClick={custMain}>My Options</Button>
            </>
            )
        }
    }
    
    return (
        <div className="myAsideMenu">
           {menu()}
        </div>
    );
}

export default MyAsideMenu;
