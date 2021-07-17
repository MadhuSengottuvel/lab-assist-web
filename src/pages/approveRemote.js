import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Input,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import fire from "../config/firebase";
import remoteA from "../assets/remote.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
});

export const ApproveRemote = (props) => {
  const db = fire.firestore();
  const [remote, setRemote] = useState([]);
  const [ID, setID] = useState();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [pcID, setPCID] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const rm = [];
    db.collection("RemoteAccess")
      .where("userName", "==", props.location.state.roll)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((rem) => {
          let appObj = {
            ...rem.data(),
          };
          setID(rem.id);
          rm.push(appObj);
        });
        setRemote(rm);
      });
  });

  const pushToHistory = () => {
    setLoading(true);
    {
      remote.map((data) => {
        db.collection("RemoteAccessResponse")
          .add({
            pcID: data.reason,
            password: data.userName,
          })
          .then((value) =>
            db.collection("History").add({
              userName: data.userName,
              reason: data.reason,
              request: "remote",
            })
          )
          .then((value) =>
            db
              .collection("RemoteAccess")
              .doc(ID)
              .delete()
              .then((value) => console.log("Success"))
          );
      });
    }
    props.history.push("/admin");
  };

  return (
    <div>
      {remote.map((data) => {
        return (
          <Card
            style={{ margin: "5em", height: "32em" }}
            className={classes.root}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="250"
                image={remoteA}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.userName}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.reason}
                </Typography>
              </CardContent>
            </CardActionArea>
            <form>
              <Input
                placeholder="PCID"
                name="pcID"
                value={pcID}
                style={{ width: "30em" }}
                required="true"
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => setPCID(e.target.value)}
              />
              <br />
              <br />
              <Input
                style={{ width: "30em" }}
                value={pass}
                name="password"
                placeholder="Password"
                type="password"
                required="true"
                inputProps={{ "aria-label": "description" }}
                onChange={(e) => setPass(e.target.value)}
              />
              <br />
              <br />
              {props.location.state.type === "true" ? (
                ""
              ) : (
                <CardActions style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{
                      width: "15em",
                      backgroundColor: "#D64550",
                      color: "white",
                    }}
                    onClick={pushToHistory}
                  >
                    mark as done
                  </Button>
                  {loading ? (
                    <CircularProgress style={{ color: "#D64550" }} />
                  ) : (
                    ""
                  )}
                </CardActions>
              )}
            </form>
          </Card>
        );
      })}
    </div>
  );
};

export default ApproveRemote;
