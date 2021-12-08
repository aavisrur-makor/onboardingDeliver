import {
  IconButton,
  Grid,
  makeStyles,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import _ from "lodash";
import { useEffect, useContext } from "react";
import FileContext from "../context/files";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";

import axios from "axios";
import DynamicUploaderField from "./DynamicUploaderField";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  dynamicContainer: {
    marginTop: "32px",
    [theme.breakpoints.down("sm")]: { justifyContent: "center" },
    "&.MuiBox-root": {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: "40px",
    },
    "& .MuiTypography": {
      color: "red",
    },
    "& .MuiIconButton-root": {
      padding: "0",
      marginLeft: "10px",
    },
  },
  addButton: {
    "& .MuiIconButton-label": {
      marginTop: "20px",
    },
  },
  subDynamicContainer: {
    border: "1px solid #B9C6CD",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    "& .MuiBox-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
    },
  },
}));

function DynamicInputGroup() {
  const { fileState, setFileState } = useContext(FileContext);
  const { f_proofs, extraProofs } = fileState;
  // const proofFiles = [
  //   { name: 'moshe' },
  //   { name: 'moshe 2' },
  //   { name: 'moshe 3' },
  // ];
  const classes = useStyles();
  const query = useMediaQuery("(max-width:600px)");
  console.log(query);
  useEffect(() => {
    ////////might not be ok
    const fineTunedExtraProofs = extraProofs
      ? extraProofs
      : f_proofs.length
      ? 0
      : 1;
    setFileState({ ...fileState, extraProofs: fineTunedExtraProofs });
  }, []);
  useEffect(() => {
    const { f_proofs, extraProofs } = fileState;
    console.log("filestate rerender", f_proofs, extraProofs);
  }, [fileState]);

  const handleAdd = () => {
    console.log("adding dynamic nput");
    setFileState({ ...fileState, extraProofs: extraProofs + 1 });
    // setInputIDs((prev) => [`PROOF-IDENTITY-ADDRESS-${prev.length}`, ...prev]);
  };

  const deleteField = (id) => {
    axios
      .delete("url", {
        fileId: id,
      })
      .then((res) => {
        ////////TAKE CARE OF DELETING LOCALLY
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid
      container
      xs={query ? 12 : 9}
      // justifyContent='space-between'
      // wrap
      className={classes.dynamicContainer}
    >
      {[...f_proofs, ...new Array(extraProofs)].map((file, i) => {
        const supposedFileName = file
          ? file
          : String(Math.round(Math.random() * 100));
        //////change back to proofFiles
        return (
          <Grid item xs={11} sm={10} className={classes.subDynamicContainer}>
            <DynamicUploaderField
              // key={supposedFileName}
              id={supposedFileName}
            />
          </Grid>
        );
      })}
      <IconButton className={classes.addButton} onClick={handleAdd}>
        <AddIcon style={{ marginRight: "20px" }} />
      </IconButton>
    </Grid>
  );
}

export default DynamicInputGroup;

// pathname for file backend api /api/file/id/f_....
