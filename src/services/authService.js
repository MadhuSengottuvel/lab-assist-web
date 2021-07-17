import fire from "../config/firebase";

const db = fire.firestore();

export async function authentication(userName, password, role, props) {
  const snapshot = await db.collection("Students").get();
  snapshot.forEach((doc) => {
    if (role === "admin") {
      if (role === doc.data()["role"]) {
        if (
          userName === doc.data()["userName"] &&
          password === doc.data()["password"]
        ) {
          localStorage.setItem("authState", "admin");
          // props.history.push("/admin");
          return "success";
        } else return "adminFailed";
      }
    } else if (role === "student") {
      if (role === doc.data()["role"]) {
        if (
          userName === doc.data()["userName"] &&
          password === doc.data()["password"]
        ) {
          localStorage.setItem("authState", userName.toUpperCase());
          // props.history.push({
          //   pathname: "/home",
          //   userName: userName,
          // });
          return "success";
        } else return "studentFailed";
      }
    } else return "failed";
  });
}

export async function addUser(userName, password, props) {
  await db.collection("Students").add({
    userName: userName.toUpperCase(),
    password: password,
    role: "student",
  });
  props.history.push("/admin");
}

export async function resetPassword(userName, props) {
  await db.collection("PasswordRequests").add({
    userName: userName,
  });
  props.history.push("/login");
}
