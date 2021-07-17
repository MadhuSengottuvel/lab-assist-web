import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const logout = () => {
  localStorage.clear();
};
const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{ backgroundColor: "#D64550" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Lab Assist
          </Typography>
          {localStorage.getItem("authState") != null ? (
            localStorage.getItem("authState") === "admin" ? (
              <Fragment>
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Fragment>
            )
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
