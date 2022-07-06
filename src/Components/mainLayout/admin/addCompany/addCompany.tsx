import "./addCompany.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg, SccMsg } from "../../../../util/notify";
import { company_details } from "./../../../../modal/company_details";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import {
  removeAll,
  downloadCompanies,
  downloadSingleCompany,
  addCompany,
} from "../../../../redux/companyState";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { loginUser } from "../../../../redux/authState";
import { useDispatch } from "react-redux";
import user_details from "../../../../modal/user_details";

function AddCompany(): JSX.Element {
  const {register,handleSubmit, formState:{ errors },} = useForm<company_details>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getUserType = store.getState().AuthState.userType;

  const send = (company: company_details) => {
    company.coupons=[];
    jwtAxios
      .post(globals.urls.addCompany, company)
      .then((response) => {
        console.log(response);
        if (response.status < 300) {
          msgNotify.success("Company added");
          let fullCompany = response.data;
          store.dispatch(addCompany(fullCompany));
        } else {
          msgNotify.error(ErrMsg.COMPANY_MAIL_EXIST);
        }
      })
      .then(() => {
        if (getUserType == "ADMIN") {
          navigate("/admin/getAllCompanies");
        } else {
          let userDetails = new user_details();
          userDetails.email = company.email;
          userDetails.pass = company.password;
          userDetails.clientType = "COMPANY";
          jwtAxios.post(globals.urls.login, userDetails).then((response) => {
            msgNotify.success(SccMsg.LOGIN_APPROVED);
            dispatch(loginUser(response.headers.authorization));
            console.log(store.getState().AuthState.userType);
            navigate("/company/companyMainPage");
          });
        }
      })
      .catch((err) => {
        msgNotify.error(err.response.data.details);
      });
  };

  const goBack = () => {
    if (getUserType === "ADMIN") {
      navigate("/admin/adminMainPage");
    }
    navigate("/");
  };

  return (
    <div className="addCompany SolidBox">
      <Typography variant="h3" className="HeadLine">
        Add Company:
      </Typography>
      <form onSubmit={handleSubmit(send)}>
        <TextField
          name="name"
          label="name"
          variant="outlined"
          fullWidth
          {...register("name", {
            required: {
              value: true,
              message: "Missing company name",
            },
          })}
        />
        <span>{errors.name?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          name="email"
          label="email"
          variant="outlined"
          className="TextBox"
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "Missing Email",
            },
          })}
        />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        <br />
        <TextField
          name="password"
          label="password"
          variant="outlined"
          className="TextBox"
          type="password"
          fullWidth
          {...register("password", {
            required: {
              value: true,
              message: "Missing password",
            },
          })}
        />
        <span>{errors.password?.message}</span>
        <br />
        <br />
        <br />
        <ButtonGroup variant="contained" fullWidth>
          <Button type="submit" color="primary">Add</Button>
        </ButtonGroup>
      </form>
          <Button variant="contained" color="error" onClick={goBack}>Back</Button>
    </div>
  );
}

export default AddCompany;
