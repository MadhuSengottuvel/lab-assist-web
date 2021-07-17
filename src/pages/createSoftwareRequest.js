import React, { Fragment, useState } from "react";
import {
  Input,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { createSoftware } from "../services/requests";

export const CreateSoftwareRequest = (props) => {
  const [PCID, setPCID] = useState("");
  const [request, setRequest] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [softwareName, setSoftwareName] = useState("");
  const [items, setItems] = useState({
    install_new: false,
    admin_rights: false,
    os_issue: false,
    boot_up: false,
    login: false,
  });
  const handleChange = (event) => {
    setItems({ ...items, [event.target.name]: event.target.checked });
  };

  const handleSoftware = (e) => {
    e.preventDefault();
    createSoftware(
      PCID,
      request,
      requestedBy,
      softwareName,
      items.install_new,
      items.admin_rights,
      items.os_issue,
      items.boot_up,
      items.login,
      props
    );
  };

  return (
    <div style={{ margin: "10em" }}>
      <form onSubmit={handleSoftware}>
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
        <div style={{ marginLeft: "12em", position: "relative" }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.install_new}
                  onChange={handleChange}
                  name="install_new"
                />
              }
              label="Install New"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={items.admin_rights}
                  onChange={handleChange}
                  name="admin_rights"
                  color="secondary"
                />
              }
              label="Admin Rights"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.os_issue}
                  onChange={handleChange}
                  name="os_issue"
                />
              }
              label="OS Issue"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={items.boot_up}
                  onChange={handleChange}
                  name="boot_up"
                  color="secondary"
                />
              }
              label="Boot Up"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={items.login}
                  onChange={handleChange}
                  name="login"
                  color="secondary"
                />
              }
              label="Login"
            />
          </FormGroup>
        </div>
        <br />
        <br />
        {items.install_new ? (
          <Fragment>
            <Input
              style={{ width: "30em" }}
              value={softwareName}
              name="softwareName"
              placeholder="Software Name"
              type="text"
              required="true"
              inputProps={{ "aria-label": "description" }}
              onChange={(e) => setSoftwareName(e.target.value)}
            />
            <br />
            <br />
          </Fragment>
        ) : (
          ""
        )}

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

export default CreateSoftwareRequest;
