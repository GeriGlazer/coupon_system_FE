import "./getCouponsByMaxPrice.css";
import { useEffect,  useState} from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../../../redux/store";
import { Box, Button, Slider, Typography } from "@mui/material";
import msgNotify, { ErrMsg } from "../../../../util/notify";
import { Coupon_Details } from "../../../../modal/coupon_details";
import SingleCoupon from "../singleCoupon/singleCoupon";

function GetCouponsByMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    let singleCompany = store.getState().companyState.company[0];
    const [companyCoupons, setCompanyCoupons] = useState<Coupon_Details[]>(
        singleCompany.coupons
    );  
    const [myMaxPrice, setPrice] = useState<number>();
    const maxPrice = () => {
      let price = 0;
      for (let i = 0; i < singleCompany.coupons.length; i++) {
        if (singleCompany.coupons[i].price > price) {
          price = singleCompany.coupons[i].price;
        }
      }
      return price;
    };
    const [value, setValue] = useState<number | string | Array<number | string>>(maxPrice());
    useEffect(()=>{
        if (store.getState().AuthState.userType!="COMPANY"){
            msgNotify.error(ErrMsg.NO_LOGIN);
            navigate("/login");
        }
        setPrice(maxPrice());
    }, []);

    const send = (maxPrice: number) => {
        let coupons = singleCompany.coupons.filter(
          (item) => item.price <= maxPrice
        );

        setCompanyCoupons(coupons);
      };
      const handleChange = (event: Event, newValue: number| number[]) => {
        send(newValue as number);
        setValue(newValue as number);
      };

      const goBack = () => {
        navigate("/company/companyMainPage");
      };

    return (
        <div className="getCouponsByMaxPrice">
			<h1 style={{ textAlign: "center" }}>Company Coupons By Price</h1>
      <hr />  
      <Typography id="input-slider" gutterBottom>
        Max Price : {value}
      </Typography>
      <Box  textAlign={"center"} width="90%">
      <Slider
        getAriaLabel={() => "maxPrice"}
        value={typeof value === 'number' ? value : 0}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={maxPrice()}
      />
    </Box>  
      {companyCoupons.map((item) => (
        <SingleCoupon key={item.id} coupon={item} />
      ))}
      <br />
      <br />
      <Button variant="contained" color="error" onClick={goBack}>Back</Button>
        </div>
    );
}

export default GetCouponsByMaxPrice;
