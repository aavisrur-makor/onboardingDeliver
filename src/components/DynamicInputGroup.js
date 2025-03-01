import {
  IconButton,
  Grid,
  makeStyles,
  Input,
  useMediaQuery,
} from "@material-ui/core";
import _ from "lodash";
import { useEffect, useContext, useState } from "react";
import FileContext from "../context/files";
import AuthContext from "../context/auth";
import { ReactComponent as AddIcon } from "./../assets/icons/Group46.svg";
import { ReactComponent as TrashIcon } from "./../assets/icons/trashIcon.svg";

import axios from "axios";
import DynamicUploaderField from "./DynamicUploaderField";
import { useTheme } from "@material-ui/core/styles";
import { END_POINT, BASE_URL } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  dynamicContainer: {
    marginTop: "32px",
    gap: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      gap: "1.05rem",
    },
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
      marginLeft: "20px",
    },
  },
  addButton: {
    "& .MuiIconButton-label": {
      marginLeft: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      transform: "translateY(15px)",
    },
    [theme.breakpoints.up("md")]: {
      position: "relative",
      left: "100%",
      transform: "translate(4px,-242%)",
    },
  },
  subDynamicContainer: {
    border: "1px solid #B9C6CD",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    "& .MuiBox-root": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiGrid-root:first-child": {},
    "& .MuiGrid-root:nth-child(3)": {},
    [theme.breakpoints.down("md")]: {
      padding: ".5rem",
    },
  },
}));

const DynamicInputGroup = () => {
  const { fileState, setFileState } = useContext(FileContext);
  const { proof_of_identity_or_address } = fileState;
  const { authState, setAuthState } = useContext(AuthContext);
  const [extraProofs, setExtraProofs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fineTunedExtraProofs = proof_of_identity_or_address.length
      ? []
      : [
          {
            fileName: "",
            id: `custom-uuid-${Math.round(Math.random() * 10000)}`,
            state: "empty",
          },
        ];
    setExtraProofs(fineTunedExtraProofs);
  }, []);

  const handleAdd = () => {
    setExtraProofs([
      ...extraProofs,
      {
        fileName: "",
        id: `custom-uuid-${Math.round(Math.random() * 10000)}`,
        state: "empty",
      },
    ]);
  };

  const handleDelete = (state, id) => {
    if (state === "occupied") {
      axios
        .delete(`${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.DOCUMENT}${id}`)
        .then((res) => {
          setFileState((prev) => ({
            ...prev,
            proof_of_identity_or_address:
              prev.proof_of_identity_or_address.filter((file) => {
                return file.document_uuid !== id;
              }),
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (state === "empty") {
      setExtraProofs((prev) => [...prev.filter((file) => file.id !== id)]);
    }
  };

  const handleUpload = async (e, state, id) => {
    const { target } = e;

    if (target.files[0]) {
      const formData = new FormData();
      formData.append("field", "proof_of_identity_or_address");
      formData.append("file", target.files[0]);

      const fileType = target.files[0].type;

      if (
        fileType.includes("image") ||
        fileType.includes("text") ||
        fileType.includes("pdf")
      ) {
        await axios
          .post(
            `${BASE_URL}${END_POINT.EXTERNAL}${END_POINT.DOCUMENT}${authState.uuid}`,
            formData
          )
          .then((res) => {
            if (res.status === 200) {
              setAuthState((prev) => ({
                ...authState,
                progress: res.data.progress,
              }));
              if (state === "empty") {
                setFileState((prev) => ({
                  ...prev,
                  proof_of_identity_or_address: [
                    ...prev.proof_of_identity_or_address,
                    {
                      fileName: target.files[0].name,
                      document_uuid: res.data.document_uuid,
                      state: "occupied",
                    },
                  ],
                }));
                setExtraProofs((prev) => [...prev.filter(() => id !== id)]);
              } else if (state === "occupied") {
                setFileState((prev) => ({
                  ...prev,
                  proof_of_identity_or_address: [
                    ...prev.proof_of_identity_or_address.filter(
                      () => id !== id
                    ),
                    {
                      fileName: target.files[0].name,
                      document_uuid: res.data.document_uuid,
                      state: "occupied",
                    },
                  ],
                }));

                setExtraProofs((prev) => [
                  ...prev.filter((file) => file.id !== id),
                ]);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <Grid container xs={12} md={11} className={classes.dynamicContainer}>
      {[...proof_of_identity_or_address, ...extraProofs].map(
        (supposedFile, i) => {
       

          const showTrash = extraProofs.length > 1 || i > 0;

          return (
            <Grid
              item
              xs={12}
              className={classes.subDynamicContainer}
              key={supposedFile.document_uuid}
            >
              <DynamicUploaderField
                extraProofs={extraProofs}
                id={supposedFile.document_uuid}
                showTrash={showTrash}
                onDelete={() =>
                  handleDelete(
                    supposedFile.state,
                    supposedFile.state === "empty"
                      ? supposedFile.id
                      : supposedFile.document_uuid
                  )
                }
                onUploadFile={(e) => handleUpload(e, supposedFile.state)}
                proofItem={supposedFile}
                info={["affress", "identity"]}
              />
            </Grid>
          );
        }
      )}
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
  );
};

export default DynamicInputGroup;
