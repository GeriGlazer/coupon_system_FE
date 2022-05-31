import { useEffect, useState } from "react";
import SingleOption from "../../singleOption/singleOption";
import "./adminMainPage.css";
import jwtAxios from './../../../../util/jwtAxios';

function AdminMainPage(): JSX.Element {

    const [options,setOptions] = useState([])
   
    var adminOpts = {
        Add_company:"admin/addCompany",
        Update_company:"admin/updateCompany",
        Delete_company:"admin/deleteCompany",
        Get_company:"admin/getOneCompany",
        Show_all_companies:"admin/getAllCompanies",
        Add_customer:"admin/addCustomer",
        Update_customer:"admin/updateCustomer",
        Delete_customer:"admin/deleteCustomer",
        Get_customer:"admin/getCustomer",
        Show_all_customers:"admin/getAllCustomers",
    }

    return (
        <div className="adminMainPage">
			{options.map(item=><SingleOption option={adminOpts.forEach(element => {
                
            });} link={""}/>)}
        </div>
    );
}

export default AdminMainPage;
