import { useEffect, useState } from "react";
import SingleOption from "../../singleOption/singleOption";
import "./adminMainPage.css";
import jwtAxios from './../../../../util/jwtAxios';
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
			<ButtonGroup>
                <Button onClick={getCompanies}> Show me the companies</Button>
                <Button onClick={getCustomers}> Show me the customers</Button>
                <Button onClick={addCompany}> Add a new companies</Button>
                <Button onClick={addCustomer}> Add a new customers</Button>
            </ButtonGroup>
        </div>
    );
}

export default AdminMainPage;
