
import { NavLink } from "react-router-dom";
import "./myHeader.css";

function MyHeader(): JSX.Element {
    return (
        <div className="myHeader text_right" style={{textAlign:"end",padding:"0px 30px 0px 0px"}}>
			<NavLink to="/login">Login</NavLink>
        </div>
    );
}

export default MyHeader;
