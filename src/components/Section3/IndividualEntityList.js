import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import ToggleButton from "../../utils/CustomToggleButton";
import IndividualEntityDynamicList from "./IndividualEntityDynamicList";
import { useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";
import { useStyles } from "../../styles/UiForm";
const IndividualEntityList = () => {
  const classes = useStyles();
  const [alignment, setAlignment] = React.useState("individual");
  const data = useSelector(
    (state) => state.onboarding.current[`${alignment}_list`]
  );
  return (
    <Grid container spacing={2}>
      {data?.map((line) => {
        return (
          <Grid item container alignItems="center" spacing={2} xs={12}>
            <IndividualEntityDynamicList setAlignmentToRender={setAlignment} />
          </Grid>
        );
      })}
      <Grid item container justifyContent="center" alignItems="center">
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
            Add somethin
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IndividualEntityList;
