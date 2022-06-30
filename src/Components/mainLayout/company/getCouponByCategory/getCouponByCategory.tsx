import "./getCouponByCategory.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { company_details } from "../../../../modal/company_details";
import { Coupon_Details } from "../../../../modal/coupon_details";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SingleCoupon from "../singleCoupon/singleCoupon";
import categories from "../../../../modal/categories";

function GetCouponByCategory(): JSX.Element {
    const navigate = useNavigate();
    let singleCompany=store.getState().companyState.company[0];
    const [companyCoupons, setCompanyCoupons] = useState<Coupon_Details[]>(singleCompany.coupons);
    const [category, setCategory] = useState('');

    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
    }, []);

    const send = (myCategory:string)=>{
        if(myCategory=="ALL"){
            setCategory(myCategory);
            setCompanyCoupons(singleCompany.coupons);
       }else{
        setCategory(myCategory);
       let coupons = singleCompany.coupons.filter(item=>item.category==myCategory);           
       setCompanyCoupons(coupons);
        }
   };
   const handleChange = (event:SelectChangeEvent) => {
       send(event.target.value as string);
   }

   const goBack = ()=>{
    navigate("/company/companyMainPage");
    }

    return (
        <div className="getCouponByCategory">
            <h1 style={{textAlign:"center"}}>Company Coupons By Category</h1><hr/>
            <FormControl fullWidth>
                <InputLabel id="myCategory">Category</InputLabel>
                <Select labelId="myCategory" value={category} label="Category" onChange={handleChange}>
                    {categories.map((item,index)=>
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl> 
            {companyCoupons.map(item=><SingleCoupon key={item.id} coupon={item}/>)}
            <br/><br/>
            <Button variant="contained" color="error" onClick={goBack}>Back</Button>
               </div>
    );
}

export default GetCouponByCategory;
