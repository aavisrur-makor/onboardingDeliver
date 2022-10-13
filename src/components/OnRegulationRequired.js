import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  makeStyles,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  TextField,
} from "@material-ui/core";
import StyledButton from "./StyledButton";
import {
  addOnboardingContact,
  removeOnboardingContact,
  setCurrentOnboardingFields,
  setCurrentRegulatorField,
  setManagmentList,
  setOnboardingContactField,
  updateContactFieldOnboarding,
  updateFieldOnboarding,
} from "../redux/slices/singleOnboardingSlice";
import CustomSelect from "./CustomSelect";
import { useStyles } from "../styles/UiForm";
import DispatcherField from "./DispatcherField";

const OnRegulationRequired = () => {
  const has_regulation_required = useSelector(
    (state) => state.onboarding.current.has_regulation_required
  );
  const theme = useTheme();
  const querySelector = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const regulators = useSelector((state) => state.meta.regulators);
  const regulatorsNameMap = useSelector((state) => state.meta.regulatorsName);
  const [isCustom, setIsCustom] = useState(false);

  const regulator_name = useSelector(
    (state) => state.onboarding.current.regulator_name
  );
  const regulatorNames = useMemo(() => {
    return Object.values(regulators).map((regulator) =>
      regulator.name.toLowerCase()
    );
  }, [regulators]);

  const handleActivitiesYes = (e) => {
    dispatch(
      setCurrentOnboardingFields({ id: "has_regulation_required", value: true })
    );
    dispatch(updateFieldOnboarding({ "has_regulation_required": true }));
  };
  const handleActivitiesNo = (e) => {
    dispatch(
      setCurrentOnboardingFields({
        id: "has_regulation_required",
        value: false,
      })
    );
    dispatch(updateFieldOnboarding({ "has_regulation_required": false }));
  };
  const handleAddField = (e, child, isCustomIncluded) => {
    if (e.target.value === "other") {
      return setIsCustom(true);
    }
    if (e.target.value === "") {
      setIsCustom(false);
    }
    if (e.target.id === "regulator_name") {
      if (regulatorNames.includes(e.target.value.toLowerCase())) {
        setIsCustom(false);
        dispatch(
          setCurrentRegulatorField({
            id: "regulator_uuid",
            value: regulatorsNameMap[e.target.value.toLowerCase()],
          })
        );

        dispatch(
          updateFieldOnboarding({
            regulator_uuid: regulatorsNameMap[e.target.value.toLowerCase()],
          })
        );
      } else {
        dispatch(
          setCurrentRegulatorField({ id: e.target.id, value: e.target.value })
        );
        dispatch(
          updateFieldOnboarding({
            regulator_name: e.target.value,
          })
        );
      }
    } else {
      dispatch(
        setCurrentRegulatorField({ id: e.target.name, value: child.props.id })
      );
      dispatch(updateFieldOnboarding({ [e.target.name]: child.props.id }));
    }
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
      <>
        <Grid item md={6} xs={12}>
          {(isCustom &&
            !regulatorNames.includes(regulator_name?.toLowerCase())) ||
            regulator_name ? (
            <TextField
            fullWidth
            value={regulator_name}
            id="regulator_name"
            label="Name of Regulator/authority"
            onChange={handleAddField}
            />
            ) : (
              <CustomSelect
              id="regulator_uuid"
              label="Name of Regulator/authority"
              stateData={"regulators"}
              stateDataMap={"regulatorsMap"}
              handleChange={handleAddField}
              />
              )}
        </Grid>
        <Grid item md={6} xs={12}>
          <DispatcherField id="license_number" label="License/Registration number"/>
        </Grid>
      </>
      )}
    </>
  );
};

export default OnRegulationRequired;
