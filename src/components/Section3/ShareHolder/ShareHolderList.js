import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "../../../assets/icons/Group46.svg";
import { useStyles } from "../../../styles/UiForm";
import { useDispatch } from "react-redux";
import {
  addManagmentContant,
  addOnboardingContact,
} from "../../../redux/slices/singleOnboardingSlice";
import ShareHolderDynamicList from "./ShareHolderDynamicList";

const ShareHolderList = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.onboarding.current.contacts);
  const riskCategory = useSelector(
    (state) => state.onboarding.current.risk_category
  );
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    dispatch(addOnboardingContact("shareholder"));
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography>{`Name of shareholders/beneficial owners over ${
          riskCategory === "medium" ? "25%" : "10%"
        }`}</Typography>
      </Grid>
      {data?.map((line, lineIndex) => {
        return line.contact_type === "shareholder" ? (
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
            xs={12}
          >
            <ShareHolderDynamicList index={lineIndex} />
          </Grid>
        ) : null;
      })}
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item className={classes.addButtonParent}>
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
            Add Shareholder/Beneficial owners
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShareHolderList;
