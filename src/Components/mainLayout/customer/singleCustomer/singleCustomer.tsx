import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { customer_details } from "../../../../modal/customer_details";

import "./singleCustomer.css";

interface SingleCustomerProps {
	customer: customer_details;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    const navigate = useNavigate();
    const updateCustomer = ()=>{
        navigate("/admin/updateCustomer/", {state:{customerId:props.customer.id}} );
    }
    const couponsList = ()=>{
        navigate("/company/getAllCustomerCoupons", {state:{customerId:props.customer.id}})
    }
    return (
        <div className="singleCustomer SolidBox">
			<h2 style={{textAlign: "center"}}>{props.customer.id}</h2><hr/><br/>
            {props.customer.firstName}<br/>
            {props.customer.lastName}<br/><br/>
            {props.customer.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {<Button color="primary" onClick={couponsList}>Coupons</Button>}
                {<Button color="success" onClick={updateCustomer} >Edit Customer</Button>}
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;
