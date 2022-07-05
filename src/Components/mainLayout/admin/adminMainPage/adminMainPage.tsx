
import "./adminMainPage.css";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminMainPage(): JSX.Element {

    const navigate = useNavigate();
    const getCompanies = ()=>{
        navigate("/admin/getAllCompanies")
    }
    
    const getCustomers = ()=>{
        navigate("/admin/getAllCustomers")
    }
    const addCompany = ()=>{
        navigate("/guest/addCompany");
    }

    const addCustomer = ()=>{
        navigate("/guest/addCustomer");
    }

    return (
        <div className="adminMainPage">
                <Button variant="outlined" color="secondary" onClick={getCompanies}> Show me the companies</Button>
                <span> </span>
                <Button variant="outlined"color="secondary" onClick={getCustomers}> Show me the customers</Button>
            <br/><br/>
                <Button variant="outlined" color="secondary" onClick={addCompany}> Add a new companies</Button>
                <span> </span>
                <Button variant="outlined" color="secondary" onClick={addCustomer}> Add a new customers</Button>
        </div>
    );
}

export default AdminMainPage;
