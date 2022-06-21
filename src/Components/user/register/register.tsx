import { Button, ButtonGroup, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register(): JSX.Element {
    const navigate = useNavigate();

    const addCompany = () => {
        navigate("/admin/addCompany");
    }
    const addCustomer = () => {
        navigate("/admin/addCustomer");
    }
  
    return (
        <div className="register SolidBox">
			<Typography variant="h3" className="HeadLine">Hello new user - tell me who you are</Typography>
                <ButtonGroup variant="contained" >
                    <Button  type="submit" color="primary" onClick={addCompany}>Company</Button>
                    <Button  type="submit" color="primary" onClick={addCustomer} >Customer</Button>
                </ButtonGroup>
        </div>

    );
}

export default Register;
