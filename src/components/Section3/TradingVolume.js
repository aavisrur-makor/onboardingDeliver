import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CustomSelect from "../CustomSelect";
function TradingVolume() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={3}>
        <Typography>Trading Volume</Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography>Up to</Typography>
          </Grid>
          <Grid item xs={8}>
            <CustomSelect
              label="Select Amount"
              selectData={[
                "$10,000",
                "$100,000",
                "$500,000",
                "$1,000,000",
                "$2,000,000+",
              ]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TradingVolume;
