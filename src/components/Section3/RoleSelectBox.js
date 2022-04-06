import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const RoleSelectBox = (props) => {
  const dataList = useSelector((state) =>
    props.data ? state.meta[props.data] : state.meta.positions
  );
  
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Roles</InputLabel>
      <Select style={{ textTransform: "capitalize" }}>
        {dataList.map((data) => {
          return (
            <MenuItem id={data.uuid} value={data.name}>
              {data.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default RoleSelectBox;
