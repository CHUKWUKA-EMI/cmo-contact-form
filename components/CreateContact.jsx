import React, { useState } from "react";
import { Input, Select, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "7em",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: "1rem",
  },
  submit: {
    fontSize: "bold",
    marginTop: "2rem",
  },
  profileInfo: {
    border: "1.5px solid #32506D",
    padding: "0.3em 1em",
    borderRadius: "5px",
  },
}));

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  location: "",
  birthday: "",
  gender: "",
};

const CreateContact = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [birthdate, setBirthdate] = useState("");
  const [state, setState] = useState(initialState);
  const [message, setMessage] = useState({ failure: "", success: "" });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const clearMessages = () => {
    const timer = setTimeout(() => {
      setMessage({ failure: "", success: "" });
    }, 1000 * 3);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async () => {
    if (!noErrors()) {
      setMessage({ failure: "Please fill out all fields" });
      clearMessages();
      return;
    }
    const data = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      telephone: state.telephone,
      location: state.location,
      birthday: state.birthday,
      gender: state.gender,
    };

    try {
      setLoading(true);
      const response = await fetch(process.env.API_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        await response.json();
        setLoading(false);
        setMessage({ success: "Your data has been saved successfully. Bye!" });
        setState(initialState);
        clearMessages();
      } else {
        setLoading(false);
        setMessage({ failure: "Operation failed" });
        clearMessages();
      }
    } catch (error) {
      setLoading(false);
      setMessage({ failure: "An error occurred. Please retry" });
      clearMessages();
    }
  };

  const noErrors = () => {
    const valid =
      state.firstName.trim().length > 0 &&
      state.lastName.trim().length > 0 &&
      state.email.trim().length > 0 &&
      state.birthday.trim().length > 0 &&
      state.location.trim().length > 0 &&
      state.gender.trim().length > 0 &&
      state.telephone.trim().length > 0;
    return valid;
  };

  return (
    <Grid className={classes.root} spacing={2} justify="center" container>
      <Grid item xs={12} sm={6}>
        <Typography style={{ color: "#32506D" }} component="h1" variant="h5">
          Enter your details below
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid container spacing={2}>
            {message.failure && (
              <Alert severity="error">{message.failure}</Alert>
            )}
            {message.success && (
              <Alert severity="success">{message.success}</Alert>
            )}
            <Grid item xs={12} sm={6}>
              <Typography style={{ color: "#32506D" }}>
                First Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                name="firstName"
                disableUnderline={true}
                value={state.firstName}
                onChange={handleChange}
                required
                fullWidth
                id="firstName"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ color: "#32506D" }}>
                Last Name <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                onChange={handleChange}
                value={state.lastName}
                id="lastName"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ color: "#32506D" }}>
                Birthdate
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                onChange={handleChange}
                value={state.birthday}
                id="birthday"
                name="birthday"
                autoComplete="birthday"
                placeholder="format: July 4th"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography style={{ color: "#32506D" }}>
                Email Address <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                onChange={handleChange}
                value={state.email}
                id="email"
                name="email"
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ color: "#32506D" }}>
                Phone Number <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                onChange={handleChange}
                value={state.telephone}
                id="phone"
                name="telephone"
                autoComplete="telephone"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ color: "#32506D" }}>
                Gender <span style={{ color: "red" }}>*</span>
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.gender}
                onChange={handleChange}
                variant="outlined"
                name="gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ color: "#32506D" }}>
                Location <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                onChange={handleChange}
                value={state.location}
                id="location"
                name="location"
                autoComplete="location"
                placeholder="E.g Lagos"
              />
            </Grid>
            {message.failure && (
              <Alert severity="error">{message.failure}</Alert>
            )}
            {message.success && (
              <Alert severity="success">{message.success}</Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="#32506D"
              style={{
                background: !noErrors() ? "#cfdce6" : "#32506D",
                border: !noErrors() ? "1px solid #cfdce6" : "1px solid #32506D",
                color: !noErrors() ? "#fff" : "#fff",
              }}
              disabled={!noErrors() || loading ? true : false}
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress size="2em" style={{ color: "#fff" }} />
              ) : (
                "Submit"
              )}
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default CreateContact;
