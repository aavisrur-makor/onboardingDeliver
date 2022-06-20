import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "../../styles/UiForm";
import DirectorsTrusteeList from "./DirectorsTrusteeList";
import IndividualEntityList from "./IndividualEntityList";
import ShareHolderList from "./ShareHolder/ShareHolderList";

const OwnershipAndManagment = () => {
  const classes = useStyles();

  const companyType = useSelector(
    (state) => state.onboarding.current.client_type_uuid
  );
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap);
  const renderSubTitle = (companyType) => {
    switch (companyType) {
      case "Company Limited by Shares":
        return "Please enter the names and details of all company Directors";
      case "Non profit / Foundation":
      case "Charity":
      case "Trust":
        return "Please enter the names and details of all Trustees/Protectors";
      case "Limited Liability Partnership":
      case "Partnership":
        return "Please provide names of all partners";
      default:
        return null;
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item container>
        <Grid item>
          <Typography className={classes.titleText}>
            Ownership and Management
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{renderSubTitle(companyTypeMap[companyType])}</Typography>
        </Grid>
        <Grid item></Grid>
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
        <Grid item xs={12}>
          <ShareHolderList />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default OwnershipAndManagment;
