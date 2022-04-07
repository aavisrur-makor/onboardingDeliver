import React from "react";
import GoogleApiAutoComplete from "../../utils/GoogleApiAutoComplete";
import DispatcherField from "../DispatcherField";
import DynamicTextField from "./DynamicTextField";
import { Grid, IconButton } from "@material-ui/core";
import RoleSelectBox from "./RoleSelectBox";
import CountryAutoComplete from "../CountryAutoComplete";
import CustomToggleButton from "../../utils/CustomToggleButton";
import { ReactComponent as TrashIcon } from "../../assets/icons/trashIcon.svg";
import { useDispatch } from "react-redux";
import { deleteManagmentContact, updateContactFieldOnboarding } from "../../redux/slices/singleOnboardingSlice";
import CustomKeyBoardDatePicker from "./CustomKeyBoardDatePicker";

const IndividualEntityDynamicList = (props) => {
  const [alignment, setAlignment] = React.useState("individual");
  const dispatch = useDispatch();

  const handleDynamicListChange = (e) => {
    dispatch(updateContactFieldOnboarding(props.index));
  };
  return (
    <>
      {alignment === "individual" ? (
        <>
          <Grid item md={2}>
            <CustomToggleButton
              setAlignmentToRender={props.setAlignmentToRender}
              setAlignment={setAlignment}
              value={alignment}
            />
          </Grid>
          <Grid item md={2}>
            <DynamicTextField
              id="first_name"
              index={props.index}
              label="First Name"
            />
          </Grid>
          <Grid item md={2}>
            <DynamicTextField
              id="last_name"
              index={props.index}
              label="Last Name"
            />
          </Grid>
          <Grid item md={2}>
            <CustomKeyBoardDatePicker
              id="birthday_at"
              index={props.index}
              label="Date of Birth"
              handleDynamicListChange={handleDynamicListChange}
            />
          </Grid>
          <Grid item md={2}>
            <GoogleApiAutoComplete
              id="address"
              index={props.index}
              label="Address"
            />
          </Grid>
          <Grid item md={1}>
            <RoleSelectBox
              index={props.index}
              id={"position_uuid"}
              label="Role"
              data="roles"
            />
          </Grid>
          <Grid item md={1}>
            <IconButton
              onClick={(e) => dispatch(deleteManagmentContact(props.index))}
            >
              {<TrashIcon />}
            </IconButton>
          </Grid>
        </>
      ) : (
        <>
          <Grid item md={2}>
            <CustomToggleButton
              setAlignmentToRender={props.setAlignmentToRender}
              setAlignment={setAlignment}
              value={alignment}
            />
          </Grid>
          <Grid item md={3}>
            <DynamicTextField label="Company Name" />
          </Grid>
          <Grid item md={3}>
            <DynamicTextField label="Company Number" />
          </Grid>
          <Grid item md={3}>
            <CountryAutoComplete label="Country of incorporation" />
          </Grid>
          <Grid item md={1}>
            <IconButton
              onClick={(e) => dispatch(deleteManagmentContact(props.index))}
            >
              {<TrashIcon />}
            </IconButton>
          </Grid>
        </>
      )}
    </>
  );
};

export default IndividualEntityDynamicList;
