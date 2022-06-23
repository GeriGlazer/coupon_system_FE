import "./getCustomerCouponsByCategory.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { customer_details } from "../../../../modal/customer_details";
import { Coupon_Details } from "../../../../modal/coupon_details";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";

function GetCustomerCouponsByCategory(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(new customer_details()); 
    let singleCustomer = store.getState().customerState.customer[0];
    const [ customerCoupons, setCustomerCoupons] = useState<Coupon_Details[]>(singleCustomer.coupons);
    const [category, setCategory] = useState('');


    useEffect(()=>{
        if (store.getState().AuthState.userType!="CUSTOMER"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
    }, []);

    const send = (myCategory:string)=>{
         if(myCategory=="ALL"){
            setCategory(myCategory);
            setCustomerCoupons(singleCustomer.coupons);
        }else{
            setCategory(myCategory);
            let coupons = singleCustomer.coupons.filter(item=>item.category==myCategory);           
            setCustomerCoupons(coupons);
         }
    };
    const handleChange = (event:SelectChangeEvent) => {
        send(event.target.value as string);
    }

    const goHome = ()=>{
         navigate("/customer/customerMainPage");
    }

    return (
        <div className="getCustomerCouponsByCategory">
            <h1 style={{textAlign:"center"}}>Customer Coupons By Category</h1><hr/>
            <FormControl fullWidth>
                <InputLabel id="myCategory">Category</InputLabel>
                <Select labelId="myCategory" value={category} label="Category" onChange={handleChange}>
                    <MenuItem value={"ALL"}>ALL</MenuItem>
                    <MenuItem value={"SPORT"}>SPORT</MenuItem>
                    <MenuItem value={"EXTREME"}>EXTREME</MenuItem>
                    <MenuItem value={"FOOD"}>FOOD</MenuItem>
                    <MenuItem value={"ELECTRIC_APPLIANCE"}>ELECTRIC_APPLIANCE</MenuItem>
                    <MenuItem value={"OUTDOOR"}>OUTDOOR</MenuItem>
                    <MenuItem value={"PETS"}>PETS</MenuItem>
                    <MenuItem value={"RESTAURANT"}>RESTAURANT</MenuItem>
                    <MenuItem value={"VACATION"}>VACATION</MenuItem>
                    <MenuItem value={"ENTERTAINMENT"}>ENTERTAINMENT</MenuItem>
                    <MenuItem value={"CLEANING_SUPPLIES"}>CLEANING_SUPPLIES</MenuItem>
                    <MenuItem value={"HOUSEHOLD_SUPPLIES"}>HOUSEHOLD_SUPPLIES</MenuItem>
                    <MenuItem value={"MEDICAL_AND_ADDITIVES"}>MEDICAL_AND_ADDITIVES</MenuItem>
                    <MenuItem value={"PERSONAL_CARE"}>PERSONAL_CARE</MenuItem>
                    <MenuItem value={"OTHER"}>OTHER</MenuItem>
                </Select>
            </FormControl>  
            {customerCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}           
            <br/><br/>
            <Button variant="contained" color="error" onClick={goHome}> Back</Button>            
            </div>
    );
}

export default GetCustomerCouponsByCategory;
