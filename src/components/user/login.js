import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "../../assets/imgs/login.jpg";
import Logo from "../../assets/imgs/logo.jpg";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.europesnacks.com/">
        Zimson
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Banner})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const submit = async () => {
    const collect = {};
    collect.userGroupId = 1;
    collect.username = username;
    collect.password = password;

    if (username === "reports" && password === "reports123") {
      localStorage.setItem("user", username);
      window.location.href = "/";
    } else {
      alert("Username and Password Incorrect");
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img alt="Remy Sharp" src={Logo} style={{ width: 120 }} />
          <Typography
            component="h1"
            variant="h5"
            className="mt-2"
            style={{ color: "#0e5751" }}
          >
            <b>Sign in</b>
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="filled"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              variant="filled"
              margin="normal"
              fullWidth
              type={"password"}
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              style={{ backgroundColor: "black", color: "white" }}
              onClick={submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
