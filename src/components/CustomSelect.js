import React from "react";
import { MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";

import { useSelector } from "react-redux";
import { useStyles } from "../styles/UiForm";
import numeral from "numeral";

const CustomSelect = (props) => {
  const value = useSelector((state) =>
    props.contactIndex
      ? state.onboarding.current.contacts[props.contactIndex][props.id]
      : state.onboarding.current[props.id]
  );
  const stateData = useSelector((state) => state.meta[props.stateData]);
  const stateDataMap = useSelector((state) => state?.meta[props.stateDataMap]);
  const classes = useStyles();

  return (
    <FormControl fullWidth={props.fullWidth ?? true} variant="outlined">
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
          onChange={(e, child) => {
            props.handleChange(e, child);
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
          {props.id === "regulator_uuid" && (
            <MenuItem value="other" id="other">
              Other
            </MenuItem>
          )}
        </Select>
      ) : null}
    </FormControl>
  );
};

export default CustomSelect;
