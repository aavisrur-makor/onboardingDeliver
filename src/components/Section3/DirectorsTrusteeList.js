import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "../../styles/UiForm";
import DynamicList from "./DynamicList";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";

const DirectorsTrusteeList = (props) => {
  const classes = useStyles();

  const stateList = useSelector((state) => state.onboarding.current[props.id]);
  const companyType = useSelector(
    (state) => state.onboarding.current.company_type_uuid
  );
  const companyTypeMap = useSelector((state) => state.meta.company_typesMap);
  return (
    <>
      {stateList?.map((director) => {
        return (
          <Grid item container alignContent="center" spacing={3}>
            <DynamicList
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
            //   onClick={handleAddDirector}
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
            //   onClick={handleAdd}
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
