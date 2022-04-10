import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DynamicList from "./DynamicList";
import { useStyles } from "../../styles/UiForm";
import DirectorsTrusteeList from "./DirectorsTrusteeList";
import IndividualEntityList from "./IndividualEntityList";
import ShareHolderList from "./ShareHolder/ShareHolderList";

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
          Ownership and Managment
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        {companyTypeMap[companyType] === "Company Limited by Shares" ||
        companyTypeMap[companyType] === "Non profit / Foundation" ||
        companyTypeMap[companyType] === "Charity" ||
        companyTypeMap[companyType] === "Trust" ? (
          <DirectorsTrusteeList id="ownership" />
        ) : companyTypeMap[companyType] === "Partnership" ||
          companyTypeMap[companyType] === "Limited Liability Partnership" ? (
          <IndividualEntityList />
        ) : null}
      </Grid>
      <Grid item container>
        <Grid item>
          <ShareHolderList />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default OwnershipAndManagment;
