import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth";
import CheckBoxOutlineBlankSharpIcon from "@material-ui/icons/CheckBoxOutlineBlankSharp";

const TermsForm = () => {
  const { authState, setAuthState } = useContext(AuthContext);
  const handleApprove = () => {
    setApproved(true);
  };
  const handleReject = () => {
    setApproved(false);
  };

  const toggleAgree = (e) => {
    const isAccepted = e.target.checked;
    console.log("accepting ", isAccepted);
    setAuthState((prev) => ({ isAccepted }));
  };

  useEffect(() => {
    console.log("authState", authState);
  }, [authState]);
  const [isApproved, setApproved] = useState(false);
  return (
    <Box>
      <Typography variant="h4">Terms of Use</Typography>
      <Box sx={{ border: "1px solid #5f3c2b " }}>
        here should come the terms of use
      </Box>
      <Grid
        container
        style={{
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #5f3c2b ",
        }}
      >
        <Typography variant="h6">
          Would you like to use our electronic trading platform and services?
        </Typography>
        <Box>
          <Button onClick={handleApprove}>Yes</Button>
          <Button onClick={handleReject}>No</Button>
        </Box>
        <Box hidden={isApproved ? false : true}>
          <Typography variant="h3">AML Terms Appendix</Typography>
        </Box>
      </Grid>
      <FormControlLabel
        sx={{ color: "white" }}
        control={
          <Checkbox
            onChange={toggleAgree}
            icon={<CheckBoxOutlineBlankSharpIcon />}
          />
        }
        label={
          <Typography>
            Before you can submit application, you must aggree with Terms of Use
          </Typography>
        }
      />
      <Box>
        <Typography>
          The sumitted documentation will be rewviwews bby the Cinokuance
          deoartment.
        </Typography>
        <Typography>This process might take up to 14 business days.</Typography>
      </Box>
    </Box>
  );
};
export default TermsForm;
