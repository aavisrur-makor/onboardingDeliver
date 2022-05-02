import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "../../styles/UiForm";
import DynamicList from "./DynamicList";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";
import { addOnboardingContact } from "../../redux/slices/singleOnboardingSlice";
import { useDispatch } from "react-redux";

const DirectorsTrusteeList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stateList = useSelector((state) => state.onboarding.current.contacts);
  const companyType = useSelector(
    (state) => state.onboarding.current.client_type_uuid
  );
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap);
  return (
    <>
      {stateList?.map((director, index) => {
        return director.section === "ownership" ? (
          <Grid
            item
            container
            alignItems="center"
            xs={12}
            spacing={2}
            style={{ marginBottom: "3rem" }}
          >
            <DynamicList
              arrLength={
                stateList.filter((line) => line.section === director.section)
                  .length
              }
              index={index}
              data={
                companyTypeMap[companyType] === "Non profit / Foundation" ||
                companyTypeMap[companyType] === "Charity" ||
                companyTypeMap[companyType] === "Trust"
                  ? "roles"
                  : ""
              }
              companyType={companyTypeMap[companyType]}
            />
          </Grid>
        ) : null;
      })}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item className={classes.addButtonParent}>
          <IconButton
            className={classes.addButton}
            onClick={() => dispatch(addOnboardingContact("ownership"))}
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
              dispatch(addOnboardingContact("ownership"));
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
