import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "../../../assets/icons/Group46.svg";
import { useStyles } from "../../../styles/UiForm";
import { useDispatch } from "react-redux";
import { addOnboardingContact } from "../../../redux/slices/singleOnboardingSlice";
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
    <>
      <Grid item xs={12} container style={{ marginBottom: "2rem" }}>
        <Typography>{`Name of shareholders/beneficial owners over ${
          riskCategory === "medium" ? "25%" : "10%"
        }`}</Typography>
      </Grid>
      {data?.map((line, lineIndex) => {
        return line.section === "shareholder" ? (
          <Grid
            item
            container
            // justifyContent="center"
            alignItems="center"
            style={{ marginBottom: "3rem" }}
            spacing={3}
            xs={12}
            md={12}
          >
            <ShareHolderDynamicList
              arrLength={
                data.filter(
                  (contactLine) => contactLine.section === line.section
                ).length
              }
              index={lineIndex}
            />
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
    </>
  );
};

export default ShareHolderList;
