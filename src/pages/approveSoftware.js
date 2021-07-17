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
} from "@material-ui/core";
import fire from "../config/firebase";
import software from "../assets/software.svg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
});

export const ApproveSoftware = (props) => {
  const db = fire.firestore();
  const [softwares, setSoftwares] = useState([]);
  const [ID, setID] = useState();
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const sw = [];
    db.collection("SoftwareRequests")
      .where("PCID", "==", props.location.state.pcID)
      .where("requestedBy", "==", props.location.state.roll)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((hardw) => {
          let appObj = {
            ...hardw.data(),
          };
          setID(hardw.id);
          sw.push(appObj);
        });
        setSoftwares(sw);
      });
  });

  const pushToHistory = () => {
    setLoading(true);
    {
      softwares.map((data) => {
        db.collection("SoftwareResponse")

          .add({
            userName: data.requestedBy,
            request: data.request,
            pcID: data.PCID,
            items: {
              item1: data.items.item1,
              item2: data.items.item2,
              item3: data.items.item3,
              item4: data.items.item4,
              item5: data.items.item5,
            },
          })
          .then((value) =>
            db.collection("History").add({
              reason: data.request,
              userName: data.requestedBy,
              request: "software",
            })
          )
          .then((value) =>
            db
              .collection("SoftwareRequests")
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
      {softwares.map((data) => {
        return (
          <Card
            style={{ margin: "5em", height: "35em" }}
            className={classes.root}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="250"
                image={software}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {data.PCID}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.requestedBy}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.request}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.items.item1}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.items.item2}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.items.item3}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.items.item4}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                  {data.items.item5}
                </Typography>
              </CardContent>
            </CardActionArea>
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
          </Card>
        );
      })}
    </div>
  );
};

export default ApproveSoftware;
