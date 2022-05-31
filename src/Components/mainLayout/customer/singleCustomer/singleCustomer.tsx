import { ButtonGroup } from "@mui/material";
import "./singleCustomer.css";

interface SingleCustomerProps {
	id:number;
    name: string;
    email: string;
}

function SingleCustomer(props: SingleCustomerProps): JSX.Element {
    return (
        <div className="singleCustomer SolidBox">
			{props.id}<hr/><br/>
            {props.name}<br/><br/>
            {props.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {/*<Button onChange={} color="primary" >Coupons</Button>*/}
            </ButtonGroup>
        </div>
    );
}

export default SingleCustomer;
