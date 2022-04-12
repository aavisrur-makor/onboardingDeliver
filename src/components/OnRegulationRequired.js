import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import StyledButton from "./StyledButton";
import {
  addOnboardingContact,
  removeOnboardingContact,
  setCurrentOnboardingFields,
  setManagmentList,
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import CustomSelect from "./CustomSelect";
import { useStyles } from "../styles/UiForm";

const OnRegulationRequired = () => {
  const has_regulation_required = useSelector(
    (state) => state.onboarding.current.has_regulation_required
  );
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const handleActivitiesYes = (e) => {
    dispatch(
      setCurrentOnboardingFields({ id: "has_regulation_required", value: true })
    );
    dispatch(updateFieldOnboarding({ ["has_regulation_required"]: true }));
  };
  const handleActivitiesNo = (e) => {
    dispatch(
      setCurrentOnboardingFields({
        id: "has_regulation_required",
        value: false,
      })
    );
    dispatch(updateFieldOnboarding({ ["has_regulation_required"]: false }));
  };
  const handleAddField = (e, child) => {
    console.log("HANDLEADD", e.target.value);
    dispatch(
      setCurrentOnboardingFields({ id: e.target.name, value: child.props.id })
    );
    dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
  };
  return (
    <>
      <Grid item>
        <Typography>
          Do your activities require you to be regulated/hold a licence?
        </Typography>
      </Grid>
      <Grid item xs={querySelector ? 12 : null}>
        <Grid container direction="row" justifyContent="center" spacing={4}>
          <Grid item>
            <StyledButton
              style={{
                backgroundColor: has_regulation_required && "#3E2F72",
                color: has_regulation_required && "#FFFF",
              }}
              id="Yes"
              onClick={handleActivitiesYes}
            >
              Yes
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              style={{
                backgroundColor: !has_regulation_required && "#3E2F72",
                color: !has_regulation_required && "#FFFF",
              }}
              onClick={handleActivitiesNo}
              id="No"
            >
              No
            </StyledButton>
          </Grid>
        </Grid>
      </Grid>
      {has_regulation_required && (
        <Grid item md={12} xs={12}>
          <CustomSelect
            id="regulator_uuid"
            label="Name of Regulator/authority"
            stateData={"regulators"}
            stateDataMap={"regulatorsMap"}
            handleChange={handleAddField}
          />
        </Grid>
      )}
    </>
  );
};

export default OnRegulationRequired;
