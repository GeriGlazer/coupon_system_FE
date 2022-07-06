import "./updateCoupon.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { Coupon_Details } from "../../../../modal/coupon_details";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../../util/jwtAxios";
import globals from "../../../../util/globals";
import { CouponState, deleteCoupon, updateCoupon } from "../../../../redux/couponState";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import SingleCoupon from "../singleCoupon/singleCoupon";

function UpdateCoupon(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const {couponId} = location.state as any;
    const [coupon, setCoupon] = useState(new Coupon_Details());
   // const [values, setValues] = useState(new Coupon_Details())
    const {register, handleSubmit} = useForm<Coupon_Details>();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        const compCoup = store.getState().companyState.company[0].coupons;
        const singleCoupon = [...compCoup].find(item=>couponId==item.id);
        setCoupon(singleCoupon);
    }, []);

    const send = ()=>{
        jwtAxios.put(globals.urls.updateCoupon, coupon)
        .then(response=>{
            if(response.status<300){
                msgNotify.success("Coupon updated.")
            }else{
                msgNotify.error("Check entered information, an error as occured");
            }       
        })
        .then(()=>{
            store.dispatch(updateCoupon(coupon));
        })
        .catch(err=>{
            msgNotify.error(err.response.data.details);
        })
        navigate("/company/getAllCompanyCoupons");
    }

    // const handleImputChange = (event:any)=>{
    //    const {name, value} = event.target;
    //    setValues({...values, [name]: value,});
    // }

    const categoryChange = (args: SyntheticEvent)=>{
        coupon.category = (args.target as HTMLInputElement).value;
    }
    const descriptionChange = (args: SyntheticEvent)=>{
        coupon.description = (args.target as HTMLInputElement).value;
    }
    const priceChange = (args: SyntheticEvent)=>{
        coupon.price = (args.target as HTMLInputElement).value as any;
    }
    const amountChange = (args: SyntheticEvent)=>{
        coupon.amount = (args.target as HTMLInputElement).value as any;
    }
    const startDateChange = (args: SyntheticEvent)=>{
        coupon.startDate = (args.target as HTMLInputElement).value;
    }
    const endDateChange = (args: SyntheticEvent)=>{
        coupon.endDate = (args.target as HTMLInputElement).value;
    }
    const imageChange = (args: SyntheticEvent)=>{
        coupon.image = (args.target as HTMLInputElement).value as any;
    }

    const goBack = ()=>{
        navigate("/company/getAllCompanyCoupons");
    }

    const removeCoupon = ()=>{
        jwtAxios.delete(globals.urls.deleteCoupon + coupon.id)        
        .then(response=>{
            if (response.status<300){
                msgNotify.success("coupon "+coupon.title+" was deleted :)");
                store.dispatch(deleteCoupon(coupon.id));
            } else {
                msgNotify.error(ErrMsg.ID_NOT_FOUND);
            }
        })
        .then(()=>{
            navigate("/company/getAllCompanyCoupons");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    return (
        <div className="updateCoupon companyId">
			<h1>Update Coupon</h1><hr/>
            <h3 style={{textAlign:"center"}}>{coupon.id}</h3>
            <form onSubmit={handleSubmit(send)}>
            <TextField name="title" label={coupon.title} variant="outlined" className="TextBox"  disabled helperText="Title"/>
                <br/><br/>
                <TextField name="category" label={coupon.category} variant="outlined" className="TextBox"  {...register("category")}  
                    onChange={categoryChange} helperText="category"/>
                <br/><br/>
                <TextField name="description" label={coupon.description} variant="outlined" className="TextBox" {...register("description")}  
                    onChange={descriptionChange} helperText="Description"/>
                <br/><br/>
                <TextField name="price" label={coupon.price} variant="outlined" className="TextBox"  {...register("price")}  
                    onChange={priceChange} helperText="price"/>
                <br/><br/>
                <TextField name="amount" label={coupon.amount} variant="outlined" className="TextBox"  {...register("amount")}  
                    onChange={amountChange} helperText="Amount"/>
                <br/><br/>
                <TextField name="startDate" label={coupon.startDate} variant="outlined" className="TextBox"  {...register("startDate")}  
                    onChange={startDateChange} helperText="Start date"/>

                <TextField name="endDate" label={coupon.endDate} variant="outlined" className="TextBox"  {...register("endDate")}  
                    onChange={endDateChange} helperText="End date"/>
                <br/><br/>
                <TextField name="image" label={coupon.image} variant="outlined" className="TextBox"  {...register("image")}  
                    onChange={imageChange} helperText="Image"/>     
                <br/><br/>
                {/* <TextField name="title" label={coupon.title} variant="outlined" className="TextBox"  disabled helperText="Title"/>
                <br/><br/>
                <TextField name="category" label={coupon.category} variant="outlined" className="TextBox"  {...register("category")}  
                    value={values.category} onChange={handleImputChange} helperText="category"/>
                <br/><br/>
                <TextField name="description" label={coupon.description} variant="outlined" className="TextBox" {...register("description")}  
                    value ={values.description} onChange={handleImputChange} helperText="Description"/>
                <br/><br/>
                <TextField name="price" label={coupon.price} variant="outlined" className="TextBox"  {...register("price")}  
                    value ={values.price} onChange={handleImputChange} helperText="price"/>
                <br/><br/>
                <TextField name="amount" label={coupon.amount} variant="outlined" className="TextBox"  {...register("amount")}  
                    value ={values.amount} onChange={handleImputChange} helperText="Amount"/>
                <br/><br/>
                <TextField name="startDate" label={coupon.startDate} variant="outlined" className="TextBox"  {...register("startDate")}  
                    value ={values.startDate} onChange={handleImputChange} helperText="Start date"/>

                <TextField name="endDate" label={coupon.endDate} variant="outlined" className="TextBox"  {...register("endDate")}  
                    value ={values.endDate} onChange={handleImputChange} helperText="End date"/>
                <br/><br/>
                <TextField name="image" label={coupon.image} variant="outlined" className="TextBox"  {...register("image")}  
                    value ={values.image} onChange={handleImputChange} helperText="Image"/>     
                <br/><br/> */}
                <ButtonGroup variant="contained" >
                    <Button type="submit" color="primary" >Update</Button>
                </ButtonGroup>
                </form>
                <br/>
                <Button variant="contained" color="warning" onClick={removeCoupon} >Delete</Button>
                <br/><br/>
                <Button variant="contained" color="error" onClick={goBack}> Back</Button>
        </div>
    );
}

export default UpdateCoupon;
