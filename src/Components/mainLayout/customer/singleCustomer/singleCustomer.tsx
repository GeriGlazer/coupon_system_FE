import { Button, ButtonGroup } from "@mui/material";
import { customer_details } from "../../../../modal/customer_details";

import "./singleCustomer.css";

interface SingleCustomerProps {
	customer: customer_details;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    return (
        <div className="singleCustomer SolidBox">
			<h2 style={{textAlign: "center"}}></h2>{props.customer.id}<hr/><br/>
            {props.customer.name}<br/><br/>
            {props.customer.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {<Button color="primary" >Coupons</Button>}
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;
