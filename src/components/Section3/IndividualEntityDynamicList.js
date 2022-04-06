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
import { deleteManagmentContact } from "../../redux/slices/singleOnboardingSlice";

const IndividualEntityDynamicList = (props) => {
  const [alignment, setAlignment] = React.useState("individual");
  const dispatch = useDispatch();
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
            <DynamicTextField label="First Name" />
          </Grid>
          <Grid item md={2}>
            <DynamicTextField label="Last Name" />
          </Grid>
          <Grid item md={2}>
            <DynamicTextField label="Date of Birth" />
          </Grid>
          <Grid item md={2}>
            <GoogleApiAutoComplete label="Address" />
          </Grid>
          <Grid item md={1}>
            <RoleSelectBox label="Role" data="roles" />
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
