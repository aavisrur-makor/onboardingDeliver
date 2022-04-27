import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../../redux/slices/singleOnboardingSlice";

const RoleSelectBox = (props) => {
  const dataList = useSelector((state) =>
    props.data ? state.meta[props.data] : state.meta.positions
  );
  const value = useSelector(
    (state) => state.onboarding.current.contacts[props.index][props.id]
  );
  const positionMap = useSelector((state) => state.meta.positionsMap);
  const dispatch = useDispatch();

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Roles</InputLabel>
      <Select
        label="Roles"
        onChange={(e, child) => {
          dispatch(
            setOnboardingContactField({
              id: props.id,
              value: child.props.id,
              contactIndex: props.index,
            })
          );
          props.handleSelect(props.index);
        }}
        style={{ textTransform: "capitalize" }}
        value={value ? positionMap[value] : ""}
      >
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
