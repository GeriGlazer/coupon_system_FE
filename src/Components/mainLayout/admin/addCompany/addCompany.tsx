import "./addCompany.css";
import { useEffect, useState } from 'react';

function AddCompany(): JSX.Element {
    const [jwt, setJwt] = useState("");
    useEffect(() => {
        setJwt(localStorage.getItem("jwt"));
    })

    return (
        <div className="addCompany">
			<h1>Add company</h1><hr/>
        </div>
    );
}

export default AddCompany;
