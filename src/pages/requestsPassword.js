import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { resetPassword } from "../services/authService";

const RequestPassword = (props) => {
  const [roll, setRoll] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (roll === "") alert("All fields are required");
    else resetPassword(roll, props);
  };

  return (
    <div>
      <div style={{ marginTop: "15em" }}>
        <form noValidate autoComplete="off" onSubmit={handleResetPassword}>
          <Input
            placeholder="User Roll"
            name="userRoll"
            value={roll}
            style={{ width: "20em" }}
            required="true"
            inputProps={{ "aria-label": "description" }}
            onChange={(e) => setRoll(e.target.value)}
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
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RequestPassword;
