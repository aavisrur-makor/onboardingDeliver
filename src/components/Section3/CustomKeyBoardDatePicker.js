import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../../redux/slices/singleOnboardingSlice";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReactComponent as CalenderIcon } from "../../assets/icons/calender.svg";

import { useDebouncedCallback } from "use-debounce/lib";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { IconButton, SvgIcon } from "@mui/material";
import { useStyles } from "../../styles/UiForm";
// export const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "red",
//     },
//   },
// }));

const CustomKeyBoardDatePicker = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const value = useSelector(
    (state) => state.onboarding.current.contacts[props.index][props.id]
  );
  function DateIcon(props) {
    return (
      <SvgIcon {...props}>
        <CalenderIcon />
      </SvgIcon>
    );
  }

  return (
    <DatePicker
      id={props.id}
      disableFuture
      onAccept={(date) => {
        dispatch(
          setOnboardingContactField({
            id: "birthday_at",
            value: moment(date).isValid() ? moment(date) : "",
            contactIndex: props.index,
          })
        );
        props.handleDynamicListChange(props.index);
      }}
      openTo="year"
      label={!value ? "Date of Birth" : ""}
      views={["year", "month", "day"]}
      inputVariant="outlined"
      inputFormat="dd MMMM yyyy"
      value={value ? value : null}
      components={{ OpenPickerIcon: DateIcon }}
      onChange={(date, value) => {}}
      renderInput={(params) => (
        <TextField
          required={props.required}
          className={classes.calenderIcon}
          fullWidth
          error={false}
          {...params}
        />
      )}
    />
  );
};

export default CustomKeyBoardDatePicker;
