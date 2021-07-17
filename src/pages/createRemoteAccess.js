import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import DatePicker from "react-date-picker";
import { createRemote } from "../services/requests";

export const CreateRemoteRequest = (props) => {
  const [request, setRequest] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [value, onChange] = useState(new Date());
  const handleSoftware = (e) => {
    e.preventDefault();
    createRemote(request, requestedBy, value, props);
  };

  return (
    <div style={{ margin: "10em" }}>
      <form onSubmit={handleSoftware}>
        <Input
          placeholder="Reason"
          name="reason"
          value={request}
          style={{ width: "30em" }}
          required="true"
          inputProps={{ "aria-label": "description" }}
          onChange={(e) => setRequest(e.target.value)}
        />
        <br />
        <br />
        <Input
          placeholder="Requested By"
          name="requestedBy"
          value={requestedBy}
          style={{ width: "30em" }}
          required="true"
          inputProps={{ "aria-label": "description" }}
          onChange={(e) => setRequestedBy(e.target.value)}
        />
        <br />
        <br />
        <DatePicker onChange={onChange} value={value} />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          style={{
            width: "25em",
            backgroundColor: "#D64550",
            color: "white",
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateRemoteRequest;
