import { Grid, Tooltip, FormControlLabel, Checkbox } from "@material-ui/core";
import React, { useContext } from "react";
import { checkBoxArray } from "../../data/termsFromSite";
import FieldContext from "../../context/fields";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentOnboardingFields,
  setOnboardingAssets,
  updateFieldOnboarding,
} from "../../redux/slices/singleOnboardingSlice";

function AssetTable() {
  const currency_wallet = useSelector(
    (state) => state.onboarding.current.currency_wallet
  );
  const currencies = useSelector((state) => state.meta.currencies);
  const dispatch = useDispatch();
  const handleAssetChange = (e, checkedAsset) => {
    console.log(console.log("checked", e.target.checked));

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
    <Grid container>
      {currencies.map((checkBox, index) => {
        return (
          <Grid item xs={2}>
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
      <Grid item>
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label={"Other"}
        />
      </Grid>
    </Grid>
  );
}

export default AssetTable;
