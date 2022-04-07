import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DynamicList from "./DynamicList";
import { useStyles } from "../../styles/UiForm";
import DirectorsTrusteeList from "./DirectorsTrusteeList";
import IndividualEntityList from "./IndividualEntityList";

const OwnershipAndManagment = () => {
  const classes = useStyles();

  const companyType = useSelector(
    (state) => state.onboarding.current.company_type_uuid
  );
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap);
  console.log("COMAPNY TYPE", companyType, companyTypeMap);
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography className={classes.titleText}>
          Ownership&Managment
        </Typography>
      </Grid>
      {companyTypeMap[companyType] === "Company Limited by Shares" ||
      companyTypeMap[companyType] === "Non profit / Foundation" ||
      companyTypeMap[companyType] === "Charity" ||
      companyTypeMap[companyType] === "Trust" ? (
        <Grid item md={12}>
          <DirectorsTrusteeList id="ownership" />
        </Grid>
      ) : companyTypeMap[companyType] === "Partnership" ||
        companyTypeMap[companyType] === "Limited Liability Partnership" ? (
        <Grid item md={12}>
          <IndividualEntityList />
        </Grid>
      ) : null}
    </Grid>
  );
};
export default OwnershipAndManagment;
