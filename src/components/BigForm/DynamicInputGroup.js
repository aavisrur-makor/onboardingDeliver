import { Box,IconButton,Grid ,Card, makeStyles } from "@material-ui/core";
import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";

import UploaderField from "./UploaderField";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import {ReactComponent as AddIcon} from './../../assets/icons/Group46.svg';
import {ReactComponent as TrashIcon} from './../../assets/icons/trashIcon.svg';

import axios from "axios";
// import { useStyles } from "../../styles";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",

  },
  boxContainer:{
    marginTop:"32px",
    "&.MuiBox-root":{
      display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop:"40px"
    },"& .MuiTypography":{
      color:"red"
    },
  },subBoxContainer:{
    border:"1px solid #B9C6CD",
    width:"600px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    

    "& .MuiBox-root":{
    
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    padding:"10px"
    }
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
  
    <Grid container justifyContent = "space-between"  className = {classes.boxContainer}>
    <Grid item xs ={6} className = {classes.subBoxContainer}>
      {inputIDs.map((id) => {
        return (
          <>
            <UploaderField id={id} label={"Proof of Identity/Address"} />
            {/* <Box>
            <AttachFileIcon />
            <Typography>Attach File</Typography>
            </Box> */}
            <IconButton>
            <TrashIcon
              onClick={() => deleteField(id)}
            />
            </IconButton>
            </>
        );
      })}
    </Grid>
     <Grid item  xs ={6} onClick={handleAdd}>
     <IconButton>
       <AddIcon/>
     </IconButton>
   </Grid>
   </Grid>
  );
}

export default DynamicInputGroup;

// pathname for file backend api /api/file/id/f_....
