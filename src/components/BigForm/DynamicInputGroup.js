import { Box, Card, makeStyles } from "@material-ui/core";
import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";

import UploaderField from "./UploaderField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
// import { useStyles } from "../../styles";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
});

function DynamicInputGroup() {
  // const state = useSelector((state) => state.formData);
  const [inputIDs, setInputIDs] = useState([`extra-file-1`]);
  const handleAdd = () => {
    setInputIDs((prev) => [`PROOF-IDENTITY-ADDRESS-${prev.length}`, ...prev]);
  };
  const classes = useStyles();

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
    <Box>
      {inputIDs.map((id) => {
        /////////////////////make sure setFileState is called
        return (
          <Box>
            <UploaderField id={id} label={"Proof of Identity/Address"} />
            <DeleteIcon
              className={classes.root}
              onClick={() => deleteField(id)}
            />
          </Box>
        );
      })}
      <Box onClick={handleAdd}>
        <AddCircleOutlineIcon className={classes.root} />
      </Box>
    </Box>
  );
}

export default DynamicInputGroup;

// pathname for file backend api /api/file/id/f_....
