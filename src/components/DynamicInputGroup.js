import { IconButton, Grid, makeStyles } from "@material-ui/core";
import _ from "lodash";
import { useEffect, useContext } from "react";
import FileContext from "../context/files";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";

import axios from "axios";
import DynamicUploaderField from "./DynamicUploaderField";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
  dynamicContainer: {
    marginTop: "32px",
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
  },
  subDynamicContainer: {
    border: "1px solid #B9C6CD",
    width: "600px",
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
});

function DynamicInputGroup() {
  const { fileState, setFileState } = useContext(FileContext);
  const { f_proofs, extraProofs } = fileState;
  // const proofFiles = [
  //   { name: 'moshe' },
  //   { name: 'moshe 2' },
  //   { name: 'moshe 3' },
  // ];
  const classes = useStyles();

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
          <Grid item xs={12} className={classes.subDynamicContainer}>
            <DynamicUploaderField
              // key={supposedFileName}
              id={supposedFileName}
            />
            {/* <Box>
            <AttachFileIcon />
            <Typography>Attach File</Typography>
            </Box> */}
            <IconButton>
              <TrashIcon onClick={() => deleteField(supposedFileName)} />
            </IconButton>
          </Grid>
        );
      })}
      <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default DynamicInputGroup;

// pathname for file backend api /api/file/id/f_....
