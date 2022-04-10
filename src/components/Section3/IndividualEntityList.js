import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import ToggleButton from "../../utils/CustomToggleButton";
import IndividualEntityDynamicList from "./IndividualEntityDynamicList";
import { useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";
import { useStyles } from "../../styles/UiForm";
import { useDispatch } from "react-redux";
import {
  addManagmentContant,
  addOnboardingContact,
} from "../../redux/slices/singleOnboardingSlice";

const IndividualEntityList = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.onboarding.current.contacts);
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    dispatch(addOnboardingContact("ownership"));
  };

  return (
    <Grid container spacing={2}>
      {data?.map((line, lineIndex) => {
        return line.contact_type === "ownership" ? (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            md={12}
            xs={12}
          >
            <IndividualEntityDynamicList index={lineIndex} />
          </Grid>
        ) : null;
      })}
      <Grid item container justifyContent="center" alignItems="center">
        <Grid
          item
          style={{ alignSelf: "center" }}
          className={classes.addButtonParent}
        >
          <IconButton
            className={classes.addButton}
            onClick={handleAdd}
            disableRipple
            disableTouchRipple
            focusRipple={false}
          >
            <AddIcon style={{ marginRight: "20px" }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography style={{ cursor: "pointer" }} onClick={handleAdd}>
            Add Trustee/protector
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IndividualEntityList;
