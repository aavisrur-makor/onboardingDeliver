import { Grid, TextField, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import FieldContext from "../../context/fields";

function WalletList() {
  const { fieldState, setFieldState } = useContext(FieldContext);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography>Wallets</Typography>
      </Grid>
      {Object.values(fieldState.assets)?.map((asset) => {
        return (
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              type="Text"
              label={`${asset.code} Wallet`}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default WalletList;
