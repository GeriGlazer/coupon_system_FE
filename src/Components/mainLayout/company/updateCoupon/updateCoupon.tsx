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
    const {register, handleSubmit} = useForm<Coupon_Details>();
    
    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        {/*singleCoupon is Undefined */}
        const compCoup = store.getState().companyState.company[0].coupons;
        const singleCoupon = compCoup.find(item=>couponId==item.id);
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
            console.log(err)
            msgNotify.error(err);
        })
        navigate("/company/getAllCompanyCoupons");
    }

    const categoryChange = (args: SyntheticEvent)=>{
        coupon.category = (args.target as HTMLInputElement).value;
    }
    const descriptionChange = (args: SyntheticEvent)=>{
        coupon.description = (args.target as HTMLInputElement).value;
    }
    const priceChange = (args: SyntheticEvent)=>{
        coupon.price = (args.target as HTMLInputElement).valueAsNumber;
    }
    const amountChange = (args: SyntheticEvent)=>{
        coupon.amount = (args.target as HTMLInputElement).valueAsNumber;
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

    const goHome = ()=>{
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
            msgNotify.error("We got a problem");
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
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary" >Update</Button>
                </ButtonGroup>
                </form>
                <br/>
                <Button variant="contained" color="warning" onClick={removeCoupon} fullWidth>Delete</Button>
                <br/><br/>
                <Button variant="contained" color="error" onClick={goHome}> Back</Button>
        </div>
    );
}

export default UpdateCoupon;
