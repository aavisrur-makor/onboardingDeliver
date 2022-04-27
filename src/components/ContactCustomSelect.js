import React, { memo } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { useStyles } from "../styles/UiForm";

const ContactCustomSelect = (props) => {
  const value = useSelector(
    (state) => state.onboarding.current.contacts[props.index][props.id]
  );
  const stateData = useSelector((state) => state.meta[props.stateData]);
  const stateDataMap = useSelector((state) => state?.meta[props.stateDataMap]);
  const classes = useStyles();

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        required={props.required}
        id="demo-simple-select-outlined-label"
      >
        {props.label}
      </InputLabel>
      {(stateDataMap && stateDataMap[value]) ||
      props.selectData ||
      (props.stateDataMap && props.stateData) ? (
        <Select
          className={classes.selectIcon}
          name={props.id}
          id={props.id}
          style={{ textTransform: "capitalize" }}
          value={
            props.selectData
              ? value
              : stateDataMap[value]
              ? stateDataMap[value]
              : ""
          }
          required={props.required}
          onChange={(e, child) => {
            props.handleChange(e, child, props.index);
          }}
          inputProps={{ id: props.id, readOnly: props.readOnly }}
          variant={props.variant && props.variant}
          label={props.label && props.label}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            classes: { paper: classes.paperMenu },
          }}
        >
          {stateData &&
            stateData.map((option) => {
              return (
                <MenuItem
                  style={{ textTransform: "capitalize" }}
                  id={option.uuid}
                  value={option.name}
                >
                  {option.name}
                </MenuItem>
              );
            })}
        </Select>
      ) : null}
    </FormControl>
  );
};

export default memo(ContactCustomSelect);
