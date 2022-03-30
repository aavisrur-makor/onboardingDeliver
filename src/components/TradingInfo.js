import { Typography, Grid } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "../styles/TradingInfoStyle";
import CustomSelect from "./CustomSelect";
import DispatcherField from "./DispatcherField";
import AssetTable from "./Section3/AssetTable";
import TradingFrequency from "./Section3/TradingFrequency";
import TradingVolume from "./Section3/TradingVolume";
import WalletList from "./Section3/WalletList";
const TradingInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeSourceOfFunds = (e) => {};
  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Typography variant="body1" className={classes.titleText}>
          Activity Details
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DispatcherField id={"source_of_funds"} label="Source of Funds" />
      </Grid>
      <Grid item xs={12}>
        <TradingFrequency />
      </Grid>
      <Grid item xs={12}>
        <TradingVolume />
      </Grid>
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body1" className={classes.titleText}>
              Assets Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AssetTable />
          </Grid>
          <Grid item xs={12}>
            <WalletList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TradingInfo;
