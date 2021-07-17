import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import {
  Card,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  CardMedia,
  GridList,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SoftwareSVG from "../assets/software.svg";
import HardwareSVG from "../assets/hardware.svg";
import RemoteSVG from "../assets/remote.svg";
import empty from "../assets/empty.svg";
import fire from "../config/firebase";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
});

const Home = (props) => {
  const [hardwares, setHardwares] = useState([]);
  const [softwares, setSoftwares] = useState([]);
  const [remote, setRemote] = useState([]);
  const classes = useStyles();
  const db = fire.firestore();

  useEffect(() => {
    const hw = [];
    const sw = [];
    const rm = [];
    db.collection("HardwareRequests")
      .where("requestedBy", "==", localStorage.getItem("authState"))
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
      .where("requestedBy", "==", localStorage.getItem("authState"))

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
      .where("requestedBy", "==", localStorage.getItem("authState"))

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
    <Fragment>
      <div style={{ margin: "10em" }}>
        <GridList className={classes.gridList} cols={3}>
          <Card
            style={{ margin: "1em", height: "20em", width: "18em" }}
            className={classes.root}
            onClick={() => props.history.push("/createHardware")}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="150"
                image={HardwareSVG}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                  Hardware Request
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            style={{ margin: "1em", height: "20em", width: "18em" }}
            className={classes.root}
            onClick={() => props.history.push("/createSoftware")}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="150"
                image={SoftwareSVG}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                  Software Request
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            style={{ margin: "1em", height: "20em", width: "18em" }}
            className={classes.root}
            onClick={() => props.history.push("/createRemote")}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="150"
                image={RemoteSVG}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h4" color="textSecondary" component="p">
                  Remote Request
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GridList>
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
                            image={HardwareSVG}
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
                                type: "true",
                              },
                            }}
                          >
                            View
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
                            image={SoftwareSVG}
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
                                type: "true",
                              },
                            }}
                          >
                            View
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
                            image={RemoteSVG}
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
                                type: "true",
                              },
                            }}
                          >
                            View
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
    </Fragment>
  );
};

export default Home;
