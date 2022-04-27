import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CustomSelect from "../CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  updateFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";

function TradingVolume() {
  const dispatch = useDispatch();
  const trading_volume = useSelector((state) => state.meta.trading_volume);
  const handleFreqChange = (e, child) => {

    dispatch(updateFieldOnboarding({ [e.target.name]: e.target.value }));
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: e.target.value })
    );
  };
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={3}>
        <Typography>Trading Volume *</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={3}>
            <Typography>Up to</Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomSelect
              required
              label="Select Amount"
              id={"trading_volume"}
              selectData={trading_volume}
              handleChange={handleFreqChange}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TradingVolume;
