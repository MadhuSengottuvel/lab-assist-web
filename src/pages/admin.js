import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  GridList,
  Button,
  Fab,
  Tooltip,
} from "@material-ui/core";
import { VpnKey, Add, Visibility } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import hardware from "../assets/hardware.svg";
import software from "../assets/software.svg";
import empty from "../assets/empty.svg";
import remoteA from "../assets/remote.svg";
import fire from "../config/firebase";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    height: "25em",
    width: "25em",
  },
});
const Admin = (props) => {
  const db = fire.firestore();

  const [hardwares, setHardwares] = useState([]);
  const [softwares, setSoftwares] = useState([]);
  const [remote, setRemote] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const hw = [];
    const sw = [];
    const rm = [];
    db.collection("HardwareRequests")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((hardw) => {
          let appObj = {
            ...hardw.data(),
          };
          hw.push(appObj);
        });
        setHardwares(hw);
      });
    db.collection("SoftwareRequests")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((softw) => {
          // let currentID = snapshot.PCID;
          let appObj = {
            ...softw.data(),
          };
          sw.push(appObj);
        });
        setSoftwares(sw);
      });

    db.collection("RemoteAccess")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((remt) => {
          // let currentID = snapshot.PCID;
          let appObj = {
            ...remt.data(),
          };
          rm.push(appObj);
        });
        setRemote(rm);
      });
  }, []);

  var hwCount = Object.keys(hardwares).length;
  var swCount = Object.keys(softwares).length;
  var rmCount = Object.keys(remote).length;
  return (
    <div style={{ marginTop: "8em" }}>
      <div>
        <Tooltip title="Reset Password">
          <Fab
            color="primary"
            aria-label="add"
            style={{
              float: "right",
              marginRight: "2em",
              backgroundColor: "#D64550",
            }}
            onClick={() => props.history.push("/resetPassword")}
          >
            <VpnKey />
          </Fab>
        </Tooltip>
        <Tooltip title="Add Student">
          <Fab
            color="primary"
            aria-label="add"
            style={{
              float: "right",
              marginRight: "2em",
              backgroundColor: "#D64550",
            }}
            onClick={() => props.history.push("/addStudent")}
          >
            <Add />
          </Fab>
        </Tooltip>
        <Tooltip title="View All Student">
          <Fab
            color="primary"
            aria-label="add"
            style={{
              float: "right",
              marginRight: "2em",
              backgroundColor: "#D64550",
            }}
            onClick={() => props.history.push("/viewStudents")}
          >
            <Visibility />
          </Fab>
        </Tooltip>
      </div>
      <div style={{ height: "30em" }}>
        <Typography variant="h4" gutterBottom>
          Hardware Requests
        </Typography>
        <div style={{ margin: "1em" }}>
          <div>
            <div>
              {hwCount < 1 ? (
                <div style={{ margin: "5em" }}>
                  <img style={{ height: "15em" }} src={empty} alt="" />
                </div>
              ) : (
                <GridList className={classes.gridList} cols={4.5}>
                  {hardwares.map((data) => {
                    return (
                      <Card
                        style={{ margin: "1em", height: "20em", width: "18em" }}
                        className={classes.root}
                        // onClick={handleHardware(data.requestedBy)}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="150"
                            image={hardware}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {data.PCID}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.requestedBy}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            color="inherit"
                            component={Link}
                            to={{
                              pathname: "/approveHardware",
                              state: {
                                roll: data.requestedBy,
                                request: data.request,
                                pcID: data.PCID,
                                item1: data.items,
                                item2: data.item2,
                                item3: data.item3,
                                item4: data.item4,
                                item5: data.item5,
                              },
                            }}
                          >
                            view
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
                </GridList>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "30em" }}>
        <Typography variant="h4" gutterBottom>
          Software Requests
        </Typography>
        <div style={{ margin: "5em" }}>
          <div>
            <div>
              {swCount < 1 ? (
                <div style={{ margin: "5em" }}>
                  <img style={{ height: "15em" }} src={empty} alt="" />
                </div>
              ) : (
                <GridList className={classes.gridList} cols={4.5}>
                  {softwares.map((data) => {
                    return (
                      <Card
                        style={{ margin: "1em", height: "20em" }}
                        className={classes.root}
                        // onClick={handleHardware(data.requestedBy)}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="150"
                            image={software}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {data.PCID}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.requestedBy}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            color="inherit"
                            component={Link}
                            to={{
                              pathname: "/approveSoftware",
                              state: {
                                roll: data.requestedBy,
                                request: data.request,
                                pcID: data.PCID,
                                item1: data.items,
                                item2: data.item2,
                                item3: data.item3,
                                item4: data.item4,
                                item5: data.item5,
                              },
                            }}
                          >
                            view
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
                </GridList>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "18em" }}>
        <Typography variant="h4" gutterBottom>
          Remote Access Requests
        </Typography>
        <div style={{ margin: "1em" }}>
          <div>
            <div>
              {rmCount < 1 ? (
                <div style={{ margin: "5em" }}>
                  <img style={{ height: "15em" }} src={empty} alt="" />
                </div>
              ) : (
                <GridList className={classes.gridList} cols={4.5}>
                  {remote.map((data) => {
                    return (
                      <Card
                        style={{ margin: "1em", height: "20em" }}
                        className={classes.root}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="100"
                            image={remoteA}
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {data.reason}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {data.userName}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button
                            color="inherit"
                            component={Link}
                            to={{
                              pathname: "/approveRemote",
                              state: {
                                roll: data.userName,
                                request: data.reason,
                              },
                            }}
                          >
                            view
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
                </GridList>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Admin);
