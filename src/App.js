import "./App.css";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Admin from "./pages/admin";
import Home from "./pages/home";
import ApproveHardware from "./pages/approveHardware";
import ApproveSoftware from "./pages/approveSoftware";
import ApproveRemote from "./pages/approveRemote";
import ViewStudents from "./pages/viewStudents";
import AddStudent from "./pages/addStudent";
import ResetPassword from "./pages/resetPassword";
import CreateHardwareRequest from "./pages/createHardwareRequest";
import CreateSoftwareRequest from "./pages/createSoftwareRequest";
import CreateRemoteRequest from "./pages/createRemoteAccess";
import RequestPassword from "./pages/requestsPassword";

const authentication = {
  isLoggedIn: localStorage.getItem("authState"),
  getLogInStatus() {
    return this.isLoggedIn;
  },
};
function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() != null ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

function SecuredAdminRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() === "admin" ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    ></Route>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/login" component={Login} />
        <Route exact path="/requestPassword" component={RequestPassword} />
        <SecuredAdminRoute path="/admin" component={Admin} />
        <SecuredRoute path="/home" component={Home} />
        <SecuredRoute path="/approveHardware" component={ApproveHardware} />
        <SecuredRoute path="/approveSoftware" component={ApproveSoftware} />
        <SecuredRoute path="/approveRemote" component={ApproveRemote} />
        <SecuredRoute path="/viewStudents" component={ViewStudents} />
        <SecuredRoute path="/addStudent" component={AddStudent} />
        <SecuredRoute path="/resetPassword" component={ResetPassword} />
        <SecuredRoute
          path="/createHardware"
          component={CreateHardwareRequest}
        />
        <SecuredRoute
          path="/createSoftware"
          component={CreateSoftwareRequest}
        />
        <SecuredRoute path="/createRemote" component={CreateRemoteRequest} />
      </div>
    </BrowserRouter>
  );
}

export default App;
