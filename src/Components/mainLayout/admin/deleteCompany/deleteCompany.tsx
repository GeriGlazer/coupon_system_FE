import "./deleteCompany.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";

function DeleteCompany(): JSX.Element {
    
    return (
        <div className="deleteCompany">
			<h1>מחיקת חברה</h1><hr/>
        </div>
    );
}

export default DeleteCompany;
