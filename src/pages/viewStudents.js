import React, { useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import fire from "../config/firebase";
import userImg from "../assets/users.svg";

const ViewStudents = () => {
  const [users, setUsers] = useState([]);
  const db = fire.firestore();

  useEffect(() => {
    const std = [];
    db.collection("Students")
      .orderBy("userName", "asc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((hardw) => {
          let appObj = {
            ...hardw.data(),
          };
          std.push(appObj);
        });
        setUsers(std);
      });
  });
  return (
    <div>
      <div style={{ marginTop: "10em" }}>
        <img style={{ height: "10em" }} src={userImg} alt="" />
      </div>
      <div>
        <Box
          display="flex"
          flexWrap="wrap"
          p={1}
          m={1}
          css={{ maxWidth: "200em" }}
        >
          {" "}
          {users.map((data) => {
            return (
              <Box p={1} css={{ marginLeft: "5em", marginTop: "2em" }}>
                {data.userName}{" "}
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default ViewStudents;
