import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import "./singleOption.css";

interface SingleOptionProps{
    option:string;
    link:string;
}



function SingleOption(props: SingleOptionProps): JSX.Element {

    return (
        <div className="singleOption SolidBox">
			{props.option}
            <ButtonGroup variant="contained" fullWidth>
                <Button component={Link} to={props.link} color="primary" >Go</Button>
            </ButtonGroup>
        </div>
    );
}

export default SingleOption;
