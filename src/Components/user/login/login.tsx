
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import user_details from "../../../modal/user_details";
import "./login.css";
import msgNotify, { SccMsg , ErrMsg} from './../../../util/notify';
import globals from "../../../util/globals";
import jwtAxios from "../../../util/jwtAxios";
import { Details } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

      const {register, handleSubmit, formState:{errors}} = useForm<user_details>();
      const [jwt, setJwt] = useState("");
      //hook useNavigate
      const navigate = useNavigate();

      const send = (details:user_details)=>{
        jwtAxios.post(globals.urls.login, details)
        .then(response => {
            msgNotify.success(SccMsg.LOGIN_APPROVED)
            navigate("/");
        })
        .catch(err => {
            msgNotify.error(err.response.data.details);
        })
      }

    return (
        <div className="login SolidBox">
          <Typography variant="h3" className="HeadLine">Login</Typography>
          <form onSubmit={handleSubmit(send)}>
                <TextField name="clientType" label="clientType" variant="outlined" fullWidth {...register("clientType",{
                    required:{
                        value:true,
                        message: 'Missing client type'
                    }
                })}/>
                <span>{errors.clientType?.message}</span>
                <br/>
                <br/><br/>
                <TextField name="email" label="email" variant="outlined" className="TextBox" fullWidth {...register("email",{
                     required:{
                        value:true,
                        message: 'Missing Email'
                    }
                })}/>
                <span>{errors.email?.message}</span>
                <br/>
                <br/><br/>
                <TextField name="pass" label="pass" variant="outlined" className="TextBox" type="password" fullWidth {...register("pass", {
                    required:{
                        value:true,
                        message: 'Missing password'
                    }
                })}/>
                <span>{errors.pass?.message}</span>
                <br/><br/>
                <br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >login</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default Login;
