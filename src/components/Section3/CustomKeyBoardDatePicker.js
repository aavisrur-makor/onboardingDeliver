import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../../redux/slices/singleOnboardingSlice";
import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDebouncedCallback } from "use-debounce/lib";
import { makeStyles } from "@material-ui/core";

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
  const debounce = useDebouncedCallback(props.handleDynamicListChange, 400);

  return (
    <KeyboardDatePicker
      id={props.id}
      //   className={classes.root}
      fullWidth
      disableToolbar
      index={props.index}
      label="Date of Birth"
      inputVariant="outlined"
      format="dd MMMM yyyy"
      value={value ? value : ""}
      onChange={(date, value) => {
        dispatch(
          setOnboardingContactField({
            id: "birthday_at",
            value: moment(date).isValid() ? moment(date) : "",
            contactIndex: props.index,
          })
        );
        debounce();
      }}
      error={!moment(value).isValid}
      helperText={!moment(value).isValid ? "Invalid date" : null}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};

export default CustomKeyBoardDatePicker;
