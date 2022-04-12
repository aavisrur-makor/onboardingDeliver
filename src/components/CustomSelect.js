import React, { memo, useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { useStyles } from "../styles/UiForm";
import numeral from "numeral";

//!generic select with own state and validation.
const CustomSelect = (props) => {
  const value = useSelector((state) =>
    props.contactIndex
      ? state.onboarding.current.contacts[props.contactIndex][props.id]
      : state.onboarding.current[props.id]
  );
  const stateData = useSelector((state) => state.meta[props.stateData]);
  const stateDataMap = useSelector((state) => state?.meta[props.stateDataMap]);
  const classes = useStyles();
  if (props.id === "trades_per") {
    console.log("CHECKING THE DATA", stateData, stateDataMap, value);
  }
  return (
    <FormControl fullWidth={props.fullWidth ?? true} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
        {props.label}
      </InputLabel>
      {(stateDataMap && stateDataMap[value]) ||
      props.selectData ||
      (props.stateDataMap && props.stateData) ? (
        <Select
          // className={clsx(classes.select, props.className)}
          name={props.id}
          id={props.id}
          style={{ textTransform: "capitalize" }}
          // defaultValue={props.selected}
          value={
            props.selectData
              ? value
              : stateDataMap[value]
              ? stateDataMap[value]
              : ""
          }
          // defaultValue={stateDataMap ? stateDataMap[value] : value}
          onChange={(e, child) => {
            props.handleChange(e, child);
          }}
          // error={isFormSubmitted && props.error}
          inputProps={{ id: props.id, readOnly: props.readOnly }}
          variant={props.variant && props.variant}
          label={props.label && props.label}
          // inputProps={props.readOnly} check if somethin changed
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
          {stateData
            ? stateData.map((option) => {
                return (
                  <MenuItem id={option.uuid} value={option.name}>
                    {option.name}
                  </MenuItem>
                );
              })
            : props.selectData?.map((option, index) => {
                return (
                  <MenuItem
                    style={{ textTransform: "capitalize" }}
                    id={option}
                    value={option}
                  >
                    {props.id === "trading_volume"
                      ? index === props.selectData.length - 1
                        ? `${numeral(option).format("$0,0")}+`
                        : numeral(option).format("$0,0")
                      : option}
                  </MenuItem>
                );
              })}
        </Select>
      ) : null}
      {/* {isFormSubmitted && props.error && (
          <FormHelperText style={{ color: "#f44336" }}>
          This field is required
          </FormHelperText>
        )} */}
    </FormControl>
  );
};

export default CustomSelect;
