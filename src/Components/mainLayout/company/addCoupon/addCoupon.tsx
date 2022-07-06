import "./addCoupon.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import Button from "@mui/material/Button";
import { Coupon_Details } from "../../../../modal/coupon_details";
import categories from "../../../../modal/categories"
import { useForm } from "react-hook-form";
import jwtAxios from './../../../../util/jwtAxios';
import globals from "../../../../util/globals";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { addCoupon, removeAllCoupons } from "../../../../redux/couponState";

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm<Coupon_Details>();
    const [category, setCategory] = useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    }
    
    const send = (coupon: Coupon_Details)=> {
        jwtAxios.post(globals.urls.addCoupon, coupon)
        .then(response =>{
            if(response.status<300){
                msgNotify.success("Coupon added");
                console.log(response);
                let fullCoupon = response.data;
                store.dispatch(addCoupon(fullCoupon));
                let myCompany = store.getState().companyState.company[0];
                myCompany.coupons.push(fullCoupon);
                navigate("/company/getAllCompanyCoupons");
            }else{
                msgNotify.error("Something went wrong, lease try again.");
            }
        })
        .catch(err =>{
            msgNotify.error(err.response.data.details);
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
                <FormControl  fullWidth  >
                    <InputLabel id="myCategory">Category</InputLabel>
                        <Select labelId="myCategory" value={category} label="Category" {...register("category",{
                            required:{
                                value:true,
                                message:"missing category"
                                }
                                })} 
                                onChange={handleChange}>
                            {categories.map((item,index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                            )}
                        </Select>
                </FormControl>
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
