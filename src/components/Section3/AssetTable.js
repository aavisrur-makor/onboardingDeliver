import { Grid, Tooltip, FormControlLabel, Checkbox } from "@material-ui/core";
import React, { useContext } from "react";
import { checkBoxArray } from "../../data/termsFromSite";
import FieldContext from "../../context/fields";

function AssetTable() {
  const { fieldState, setFieldState } = useContext(FieldContext);
  const handleAssetChange = (e, checkedAsset) => {
    console.log(fieldState.assets);

    setFieldState((prev) => {
      return {
        ...fieldState,
        assets: {
          ...fieldState.assets,
          [checkedAsset.code]: { ...checkedAsset, checked: e.target.checked },
        },
      };
    });
  };
  return (
    <Grid container>
      {checkBoxArray.map((checkBox, index) => {
        return (
          <Grid item xs={2}>
            <Tooltip title={checkBox.name}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={fieldState.assets[checkBox.code]?.checked === true}
                    onChange={(e) => handleAssetChange(e, checkBox)}
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
