import {
  Grid,
  Tooltip,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setOnboardingAssets,
  updateFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";

function AssetTable() {
  const currency_wallet = useSelector(
    (state) => state.onboarding.current.currency_wallet
  );
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));

  const currencies = useSelector((state) => state.meta.currencies);
  const dispatch = useDispatch();
  const handleAssetChange = (e, checkedAsset) => {

    dispatch(
      setOnboardingAssets({
        id: e.target.id,
        value: checkedAsset.code,
        checkStatus: e.target.checked,
      })
    );
    dispatch(
      updateFieldOnboarding({
        currency_wallet: {
          isActive: e.target.checked,
          [checkedAsset.code]: "",
        },
      })
    );
  };
  return (
    <Grid container spacing={querySelector ? 3 : null}>
      {currencies.map((checkBox, index) => {
        return (
          <Grid item xs={3} md={2}>
            <Tooltip title={checkBox.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Object.keys(currency_wallet).includes(
                      checkBox.code
                    )}
                    onChange={(e) => handleAssetChange(e, checkBox)}
                    id={"currency_wallet"}
                  />
                }
                label={checkBox.code}
              />
            </Tooltip>
          </Grid>
        );
      })}
      {/* <Grid item>
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={"Other"}
        />
      </Grid> */}
    </Grid>
  );
}

export default AssetTable;
