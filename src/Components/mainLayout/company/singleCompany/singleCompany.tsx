import { Button, ButtonGroup } from "@mui/material";

import "./singleCompany.css";
import { useState } from 'react';
import { useEffect } from 'react';
import { company_details } from "../../../../modal/company_details";

interface SingleCompanyProps {
    company: company_details;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {

    return (
        <div className="singleCompany SolidBox">
			<h2 style={{textAlign:"center"}}>{props.company.id}</h2><hr/><br/>
            {props.company.name}<br/><br/>
            {props.company.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {<Button color="primary" >Coupons</Button>}
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;
