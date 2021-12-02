import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Modal, Typography, makeStyles } from "@material-ui/core";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const useStyles = makeStyles({
  simpleForm: {
    boxShadow: "0 0 1rem rgba(0,0,0,.3)",
    textAlign: "center",
  },
});

const SimpleForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [company, setCompany] = useState();
  const [isLogged, setLogged] = useState(false);
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      client_name: name,
      client_email: email,
      client_phone: phone,
      client_company: company,
    };

    console.log("data", data);
    axios
      .post("http://10.0.0.197:3030/api/contact", data)
      .then((res) => {
        console.log("login res", res);
        if (res.status === 200) {
          setLogged(true);
          ////////////////save uuid in redux
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    switch (id) {
      case "client_name":
        setName(value);
      case "client_email":
        setEmail(value);
      case "client_phone":
        setPhone(value);
      case "client_company":
        setCompany(value);
      default:
        return null;
    }
  };

  return (
    <>
      <Box onSubmit={handleSubmit} className={classes.simpleForm}>
        <Grid
          container
          justifyContent="center"
          sx={{ display: "flex", flexGrow: "1", marginTop: "100px" }}
          spacing={24}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_name"
              label="Name"
              margin="normal"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_email"
              label="Email"
              margin="normal"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_phone"
              label="Phone"
              multiline
              maxRows={9}
              rows="9"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              variant="outlined"
              required
              onChange={handleChange}
              id="client_company"
              label="Company"
              multiline
              maxRows={9}
              rows="9"
              sx={{ border: "solid 1px grey" }}
              InputLabelProps={{
                style: { color: "white" },
              }}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            color: "#f1783f",
            width: "100px",
            border: "solid 3px #f1783f",
            margin: "2px",
            display: "block",
            margintop: "24px",
            marginLeft: "auto",
          }}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>

      <Modal open={isLogged}>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You can now proceed to the link sent to you number you provided
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default SimpleForm;
