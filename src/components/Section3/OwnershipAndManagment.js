import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import DynamicList from "./DynamicList";

const OwnershipAndManagment = () => {
  const directors = useSelector(
    (state) => state.onboarding.current.directors_list
  );

  console.log("DIRECTORS", directors);
  return (
    <Grid container spacing={3}>
      {directors?.map((director) => {
        return (
          <Grid item container spacing={3}>
            <DynamicList />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default OwnershipAndManagment;
