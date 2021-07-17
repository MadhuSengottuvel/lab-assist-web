import React, { useState, useEffect } from "react";
import resetPasswordImg from "../assets/resetPassword.svg";
import fire from "../config/firebase";
import { Box, IconButton } from "@material-ui/core";
import { DoneAllRounded } from "@material-ui/icons";

const ResetPassword = (props) => {
  const [requests, setRequests] = useState([]);
  const [ID, setID] = useState([]);

  const db = fire.firestore();
  useEffect(() => {
    const passwd = [];
    const id = [];
    db.collection("PasswordRequests")
      .orderBy("userName", "asc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((pass) => {
          let appObj = {
            ...pass.data(),
          };
          id.push(pass.id);
          setID(id);
          passwd.push(appObj);
        });
        setRequests(passwd);
      });
  });

  return (
    <div>
      <div style={{ marginTop: "8em" }}>
        <img style={{ height: "10em" }} src={resetPasswordImg} alt="" />
      </div>
      <div>
        <Box
          display="flex"
          flexWrap="wrap"
          p={1}
          m={1}
          css={{ maxWidth: "200em" }}
        >
          {requests.map((data) => {
            return (
              <div>
                <Box p={1} css={{ marginLeft: "5em", marginTop: "2em" }}>
                  {data.userName}
                  <IconButton
                    color="secondary"
                    aria-label="add an alarm"
                    style={{ marginLeft: "1em" }}
                    onClick={() => {
                      db.collection("PasswordRequests")
                        .where("userName", "==", data.userName)
                        .get()
                        .then((val) =>
                          val.docs.map((data) =>
                            db
                              .collection("PasswordRequests")
                              .doc(data.id)
                              .delete()
                          )
                        )
                        .then(() =>
                          db
                            .collection("Students")
                            .where("userName", "==", data.userName)
                            .get()
                            .then((data) =>
                              data.docs.map((stud) =>
                                db.collection("Students").doc(stud.id).update({
                                  password: "password",
                                })
                              )
                            )
                        );
                    }}
                  >
                    <DoneAllRounded />
                  </IconButton>
                </Box>
              </div>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default ResetPassword;
