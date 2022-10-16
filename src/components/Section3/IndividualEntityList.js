import { Grid, Typography, IconButton } from "@material-ui/core";
import React from "react";
import IndividualEntityDynamicList from "./IndividualEntityDynamicList";
import { useSelector } from "react-redux";
import { ReactComponent as AddIcon } from "../../assets/icons/Group46.svg";
import { useStyles } from "../../styles/UiForm";
import { useDispatch } from "react-redux";
import { addOnboardingContact } from "../../redux/slices/singleOnboardingSlice";
import { addSingleContact } from "../../redux/slices/validationSlice";

const IndividualEntityList = () => {
  const classes = useStyles();
  const data = useSelector((state) => state.onboarding.current.contacts);
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    dispatch(addOnboardingContact("ownership"));
    dispatch(addSingleContact({type:"ownership"}))
  };



  return (
    <Grid container spacing={2}>
      {data?.map((line, lineIndex) => {
        return line.section === "ownership" ? (
          <Grid
            item
            container
            alignItems="center"
            style={{ marginBottom: "3rem" }}
            spacing={2}
            md={12}
            xs={12}
          >
            <IndividualEntityDynamicList
              arrLength={
                data.filter((ownerLine) => ownerLine.section === line.section)
                  .length
              }
              index={lineIndex}
              type="individual"
            />
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
            Add Partner
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IndividualEntityList;
