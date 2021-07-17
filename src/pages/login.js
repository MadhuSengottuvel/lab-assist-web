import { Input, makeStyles, Button, Radio } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import auth from "../assets/auth.svg";
import fire from "../config/firebase";

const db = fire.firestore();
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

const Login = (props) => {
  const classes = useStyles();

  const [accountNumber, setAccountNumber] = useState("");
  const [PIN, setPIN] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "" || role === "")
      alert("All fields are required");
    else authentication(userName, password, role, props);
  };

  async function authentication(userName, password, role, props) {
    const snapshot = await db.collection("Students").get();
    snapshot.forEach((doc) => {
      if (role === "admin") {
        if (role === doc.data()["role"]) {
          if (
            userName === doc.data()["userName"] &&
            password === doc.data()["password"]
          ) {
            localStorage.setItem("authState", "admin");
            props.history.push("/admin");
          } else setResponse("Invalid Credentials");
        }
      } else if (role === "student") {
        if (role === doc.data()["role"]) {
          if (
            userName === doc.data()["userName"] &&
            password === doc.data()["password"]
          ) {
            localStorage.setItem("authState", userName.toUpperCase());
            props.history.push({
              pathname: "/home",
              userName: userName,
            });
          } else setResponse("Invalid Credentials");
        }
      } else setResponse("Invalid Credentials");
    });
  }

  return (
    <div>
      <div style={{ marginTop: "5em" }}>
        <img style={{ height: "10em" }} src={auth} alt="" />
      </div>
      <div style={{ margin: "5em" }}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
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
          <Radio
            checked={role === "admin"}
            onChange={(e) => setRole("admin")}
            value="admin"
            name="admin"
          ></Radio>
          Admin
          <Radio
            checked={role === "student"}
            onChange={(e) => setRole("student")}
            value="student"
            name="student"
          ></Radio>
          Student
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
            Login
          </Button>
          {response == "" ? (
            ""
          ) : (
            <div
              style={{ marginLeft: "27em", marginTop: "0.5em", width: "15em" }}
            >
              <Alert severity="error">{response}</Alert>
            </div>
          )}
        </form>
      </div>
      <Button
        variant="contained"
        type="submit"
        onClick={() => props.history.push("/requestPassword")}
        style={{
          width: "20em",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Forgot password
      </Button>
    </div>
  );
};

export default Login;
