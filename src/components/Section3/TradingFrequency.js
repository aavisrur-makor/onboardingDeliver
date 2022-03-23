import React from "react";
import { Typography, Grid } from "@material-ui/core";
import CustomSelect from "../CustomSelect";
import DispatcherField from "../DispatcherField";
function TradingFrequency() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <Typography>Trading Frequency</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography>From</Typography>
          </Grid>
          <Grid item xs={4}>
            <DispatcherField type="number" />
          </Grid>
          <Grid item>
            <Typography>To</Typography>
          </Grid>
          <Grid item xs={4}>
            <DispatcherField type="number" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography>Trades Per</Typography>
          </Grid>
          <Grid item xs={8}>
            <CustomSelect
              selectData={["Daily", "Monthly", "Yearly"]}
              label="Select Period"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TradingFrequency;
