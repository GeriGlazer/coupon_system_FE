import "./addCoupon.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import Button from "@mui/material/Button";
import { Coupon_Details } from "../../../../modal/coupon_details";
import { useForm } from "react-hook-form";
import jwtAxios from './../../../../util/jwtAxios';
import globals from "../../../../util/globals";
import { removeAll } from "../../../../redux/couponState";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<Coupon_Details>();
    
    const send = (coupon: Coupon_Details)=> {
        jwtAxios.put(globals.urls.addCoupon, coupon)
        .then(response =>{
            if(response.status<300){
                msgNotify.success("Coupon added");
                store.dispatch(removeAll());
            }else{
                msgNotify.error("Something went wrong, lease try again.");
            }
        })
        .then(()=>{
            navigate("/company/companyMainPage");
        })
        .catch(err =>{
            msgNotify.error(err);
        })
    }

    const goBack = ()=>{
        navigate("/company/companyMainPage");
    }
    return (
        <div className="addCoupon SolidBox">
			<Typography variant="h3" className="HeadLine">Add Coupon:</Typography>
            <br/><hr/>
            <form onSubmit={handleSubmit(send)}>
            <TextField name="title" label="title" variant="outlined" className="TextBox" fullWidth {...register("title",{
                    required:{
                        value:true,
                        message: 'Missing title'
                    }
                })}/>
                <span>{errors.title?.message}</span>
                <br/><br/>
                
            <TextField name="category" label="category" variant="outlined" className="TextBox" fullWidth {...register("category",{
                    required:{
                        value:true,
                        message: 'Missing category'
                    }
                })}/>
                <span>{errors.category?.message}</span>
                <br/><br/>
                <TextField name="description" label="description" variant="outlined" className="TextBox" fullWidth {...register("description",{
                    required:{
                        value:true,
                        message: 'Missing description'
                    }
                })}  
                    />
                <br/><br/>
                <TextField name="price" label="price" variant="outlined" className="TextBox" fullWidth {...register("price",{
                    required:{
                        value:true,
                        message: 'Missing price'
                    }
                })}  
                   />
                <br/><br/>
                <TextField name="amount" label="amount" variant="outlined" className="TextBox" fullWidth {...register("amount",{
                    required:{
                        value:true,
                        message: 'Missing amount'
                    }
                })}  
                   />
                <br/><br/>
                <TextField name="startDate" label="startDate" variant="outlined" className="TextBox" fullWidth {...register("startDate",{
                    required:{
                        value:true,
                        message: 'Missing start date'
                    }
                })}  
                    />
                <br/><br/>
                <TextField name="endDate" label="endDate" variant="outlined" className="TextBox" fullWidth {...register("endDate",{
                    required:{
                        value:true,
                        message: 'Missing end date'
                    }
                })}
                    />
                <br/><br/>
                <TextField name="image" label="image" variant="outlined" className="TextBox" fullWidth {...register("image")}  
                    />     
                <br/><br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >Add</Button>
                </ButtonGroup>
            </form>
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default AddCoupon;
