import React, { useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { createHardware } from "../services/requests";

export const CreateHardwareRequest = (props) => {
  const [PCID, setPCID] = useState("");
  const [request, setRequest] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [items, setItems] = useState({
    monitor: false,
    mouse: false,
    keyboard: false,
    cpu: false,
    lan: false,
  });
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setItems({ ...items, [event.target.name]: event.target.checked });
  };

  const handleHardware = (e) => {
    e.preventDefault();
    createHardware(
      PCID,
      request,
      requestedBy,
      items.monitor,
      items.mouse,
      items.keyboard,
      items.cpu,
      items.lan,
      props
    );
  };
  return (
    <div style={{ margin: "10em" }}>
      <form onSubmit={handleHardware}>
        <Input
          placeholder="PCID"
          name="pcID"
          value={PCID}
          style={{ width: "30em" }}
          required="true"
          inputProps={{ "aria-label": "description" }}
          onChange={(e) => setPCID(e.target.value)}
        />
        <br />
        <br />
        <Input
          style={{ width: "30em" }}
          value={request}
          name="request"
          placeholder="Request"
          type="text"
          required="true"
          inputProps={{ "aria-label": "description" }}
          onChange={(e) => setRequest(e.target.value)}
        />
        <br />
        <br />
        <Input
          style={{ width: "30em" }}
          value={requestedBy}
          name="requestedBy"
          placeholder="Requested By"
          type="text"
          required="true"
          inputProps={{ "aria-label": "description" }}
          onChange={(e) => setRequestedBy(e.target.value)}
        />
        <br />
        <br />
        <div style={{ marginLeft: "15em", position: "relative" }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.monitor}
                  onChange={handleChange}
                  name="monitor"
                />
              }
              label="Monitor"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={items.mouse}
                  onChange={handleChange}
                  name="mouse"
                  color="secondary"
                />
              }
              label="Mouse"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.keyboard}
                  onChange={handleChange}
                  name="keyboard"
                />
              }
              label="Keyboard"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={items.cpu}
                  onChange={handleChange}
                  name="cpu"
                  color="secondary"
                />
              }
              label="CPU"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.lan}
                  onChange={handleChange}
                  name="lan"
                  color="secondary"
                />
              }
              label="LAN"
            />
          </FormGroup>
        </div>
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

export default CreateHardwareRequest;
