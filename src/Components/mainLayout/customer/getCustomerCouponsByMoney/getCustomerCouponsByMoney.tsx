import "./getCustomerCouponsByMoney.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { Box, Button, Slider, Typography } from "@mui/material";
import { Coupon_Details } from "../../../../modal/coupon_details";
import SingleCoupon from "../../company/singleCoupon/singleCoupon";

function GetCustomerCouponsByMoney(): JSX.Element {
    const navigate = useNavigate();
  let singleCustomer = store.getState().customerState.customer[0];
  const [customerCoupons, setCustomerCoupons] = useState<Coupon_Details[]>(
    singleCustomer.coupons
  );  
  const [myMaxPrice, setPrice] = useState<number>();
  const maxPrice = () => {
    let price = 0;
    for (let i = 0; i < singleCustomer.coupons.length; i++) {
      if (singleCustomer.coupons[i].price > price) {
        price = singleCustomer.coupons[i].price;
      }
    }
    return price;
  };
  const [value, setValue] = useState<number | string | Array<number | string>>(maxPrice());

  useEffect(() => {
    if (store.getState().AuthState.userType != "CUSTOMER") {
      msgNotify.error(ErrMsg.NO_LOGIN);
      navigate("/login");
    }
    setPrice(maxPrice());
  }, []);

  const send = (maxPrice: number) => {
    let coupons = singleCustomer.coupons.filter(
      (item) => item.price <= maxPrice
    );
    setCustomerCoupons(coupons);
  };
  const handleChange = (event: Event, newValue: number| number[]) => {
    send(newValue as number);
    setValue(newValue as number);
  };

  const goHome = ()=>{
    navigate("/customer/customerMainPage");
}

  return (
    <div className="getCustomerCouponsByMoney">
        <h1 style={{ textAlign: "center" }}>Customer Coupons By Price</h1>
        <hr />  
        <Typography id="input-slider" gutterBottom> Max Price : {value} </Typography>
        <Box  textAlign={"center"} width="90%">
            <Slider
        getAriaLabel={() => "maxPrice"}
        value={typeof value === 'number' ? value : 0}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={maxPrice()}
            />
        </Box>  
        {customerCoupons.map(item => (<SingleCoupon key={item.id} coupon={item}/> ))}
        <br/><br/>
        <Button variant="contained" color="error" onClick={goHome}> Back</Button>           
    </div>
  );
}

export default GetCustomerCouponsByMoney;
