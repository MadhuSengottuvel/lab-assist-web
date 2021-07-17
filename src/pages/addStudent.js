import React, { useState } from "react";
import userImg from "../assets/addUser.svg";
import { Input, makeStyles, Button } from "@material-ui/core";
import { addUser } from "../services/authService";
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
const AddStudent = (props) => {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") alert("All fields are required");
    else addUser(userName, password, props);
  };
  return (
    <div>
      <div style={{ marginTop: "7em" }}>
        <img style={{ height: "10em" }} src={userImg} alt="" />
      </div>
      <div style={{ margin: "5em" }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleAddUser}
        >
          <Input
            placeholder="User Name"
            name="userName"
            value={userName}
            style={{ width: "20em" }}
            required="true"
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <Input
            style={{ width: "20em" }}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required="true"
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            type="submit"
            style={{
              width: "20em",
              backgroundColor: "#D64550",
              color: "white",
            }}
          >
            Add Student
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
