import React, { memo, useState } from "react";
import {
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";

import selectData from "../data/termsFromSite";
import {
  InputBase,
  withStyles,
  makeStyles,
  FormHelperText,
  Input,
} from "@material-ui/core";
import clsx from "clsx";
import { useSelector } from "react-redux";

//!generic select with own state and validation.
const CustomSelect = (props) => {
  return (
    <FormControl fullWidth={props.fullWidth ?? true} variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">
        {props.label}
      </InputLabel>
      <Select
        maxHeight={200}
        // className={clsx(classes.select, props.className)}
        name={props.id}
        id={props.id}
        // defaultValue={props.selected}
        // value={value}
        // onChange={props.handleChange}
        // error={isFormSubmitted && props.error}
        inputProps={{ id: props.id, readOnly: props.readOnly }}
        variant={props.variant && props.variant}
        label={props.label && props.label}
        // inputProps={props.readOnly} check if somethin changed
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {props.selectData?.map((option) => {
          return <MenuItem value={option}>{option}</MenuItem>;
        })}
      </Select>
      {/* {isFormSubmitted && props.error && (
        <FormHelperText style={{ color: "#f44336" }}>
          This field is required
        </FormHelperText>
      )} */}
    </FormControl>
  );
};

export default memo(CustomSelect);
