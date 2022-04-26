import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../../redux/slices/singleOnboardingSlice";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useDebouncedCallback } from "use-debounce/lib";
import { makeStyles } from "@material-ui/core";
import TextField from "@mui/material/TextField";

// export const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "red",
//     },
//   },
// }));

const CustomKeyBoardDatePicker = (props) => {
  //   const classes = useStyles();
  const dispatch = useDispatch();
  const value = useSelector(
    (state) => state.onboarding.current.contacts[props.index][props.id]
  );

  return (
    <DatePicker
      id={props.id}
      disableFuture
      openTo="year"
      //   className={classes.root}
      label={!value ? "Date of Birth" : ""}
      views={["year", "month", "day"]}
      inputVariant="outlined"
      inputFormat="dd MMMM yyyy"
      value={value ? value : null}
      onChange={(date, value) => {
        dispatch(
          setOnboardingContactField({
            id: "birthday_at",
            value: moment(date).isValid() ? moment(date) : "",
            contactIndex: props.index,
          })
        );
      }}
      renderInput={(params) => (
        <TextField fullWidth error={false} {...params} />
      )}
    />
  );
};

export default CustomKeyBoardDatePicker;
