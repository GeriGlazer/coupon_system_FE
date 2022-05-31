import { Button, ButtonGroup } from "@mui/material";
import "./singleCompany.css";

interface SingleCompanyProps {
	id:number;
    name: string;
    email: string;
}

function SingleCompany(props: SingleCompanyProps): JSX.Element {
    return (
        <div className="singleCompany SolidBox">
			{props.id}<hr/><br/>
            {props.name}<br/><br/>
            {props.email}<br/><br/>
            <ButtonGroup variant="contained" fullWidth>
                {/*<Button onChange={} color="primary" >Coupons</Button>*/}
            </ButtonGroup>
        </div>
    );
}

export default SingleCompany;
