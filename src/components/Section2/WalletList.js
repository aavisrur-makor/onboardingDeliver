import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import FieldContext from "../../context/fields";
import {
  setCurrentOnboardingFields,
  updateFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";

function WalletList() {
  const currency_wallet = useSelector(
    (state) => state.onboarding.current.currency_wallet
  );
  const dispatch = useDispatch();
  const handleWallet = (e, index, asset) => {
    console.log("wallet value", e.target.id, e.target.value, index);
    dispatch(
      setCurrentOnboardingFields({
        id: e.target.id,
        value: e.target.value,
        index: index,
        asset: asset,
      })
    );
    dispatch(
      updateFieldOnboarding({ [e.target.id]: { [asset]: e.target.value } })
    );
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography>Wallets</Typography>
      </Grid>
      {Object.entries(currency_wallet)?.map(([key, value], index) => {
        return (
          <Grid item md={12} xs={12}>
            <TextField
              variant="outlined"
              id={"currency_wallet"}
              value={value || ""}
              fullWidth
              onChange={(e) => handleWallet(e, index, key)}
              type="Text"
              label={`${key} Wallet`}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default WalletList;
