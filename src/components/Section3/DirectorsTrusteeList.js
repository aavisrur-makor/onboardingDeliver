import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "../../styles/UiForm";
import DynamicList from "./DynamicList";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";
import { addManagmentContant } from "../../redux/slices/singleOnboardingSlice";
import { useDispatch } from "react-redux";

const DirectorsTrusteeList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stateList = useSelector(
    (state) => state.onboarding.current.contacts
  );
  const companyType = useSelector(
    (state) => state.onboarding.current.company_type_uuid
  );
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap);
  return (
    <>
      {stateList?.map((director, index) => {
        return (
          <Grid item container alignContent="center" spacing={3}>
            <DynamicList
              index={index}
              data={
                companyTypeMap[companyType] === "Non profit / Foundation" ||
                companyTypeMap[companyType] === "Charity" ||
                companyTypeMap[companyType] === "Trust"
                  ? "roles"
                  : ""
              }
            />
          </Grid>
        );
      })}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.addButtonParent}>
          <IconButton
            className={classes.addButton}
            onClick={() => dispatch(addManagmentContant())}
            disableRipple
            disableTouchRipple
            focusRipple={false}
          >
            <AddIcon style={{ marginRight: "20px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(addManagmentContant());
            }}
          >
            {companyTypeMap[companyType] === "Company Limited by Shares"
              ? "Add Director"
              : companyTypeMap[companyType] === "Non profit / Foundation" ||
                companyTypeMap[companyType] === "Charity" ||
                companyTypeMap[companyType] === "Trust"
              ? "Add Trustee/Protector"
              : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default DirectorsTrusteeList;
