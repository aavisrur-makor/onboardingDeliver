import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardingContactField } from "../../redux/slices/singleOnboardingSlice";
import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useDebouncedCallback } from "use-debounce/lib";

const CustomKeyBoardDatePicker = (props) => {
  const dispatch = useDispatch();
  const value = useSelector(
    (state) => state.onboarding.current.contacts[props.index][props.id]
  );
  const debounce = useDebouncedCallback(props.handleDynamicListChange, 400);

  return (
    <KeyboardDatePicker
      id={props.id}
      disableToolbar
      index={props.index}
      inputVariant="outlined"
      format="dd MMMM yyyy"
      value={value ? value : ""}
      onChange={(date, value) => {
        dispatch(
          setOnboardingContactField({
            id: "birthday_at",
            value: moment(date),
            contactIndex: props.index,
          })
        );
        debounce();
      }}
      KeyboardButtonProps={{
        "aria-label": "change date",
      }}
    />
  );
};

export default CustomKeyBoardDatePicker;
