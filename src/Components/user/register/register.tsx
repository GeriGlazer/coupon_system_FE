import { Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./register.css";
import globals from '../../../util/globals';

function Register(): JSX.Element {
    const navigate = useNavigate();

    const addCompany = () => {
        navigate("/guest/addCompany");
    }
    const addCustomer = () => {
        navigate("/guest/addCustomer");
    }

    const goHome = ()=>{
        navigate("/");
    }
  
    return (
        <div className="register SolidBox">
			<Typography variant="h3" className="HeadLine">Hello new user - tell me who you are</Typography>
                <ButtonGroup variant="contained" >
                    <Button  type="submit" color="primary" onClick={addCompany}>Company</Button>
                    <Button  type="submit" color="primary" onClick={addCustomer} >Customer</Button>
                </ButtonGroup>
                <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>

    );
}

export default Register;
