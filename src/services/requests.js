import fire from "../config/firebase";
const db = fire.firestore();

export async function createHardware(
  PCID,
  request,
  requestedBy,
  monitor,
  mouse,
  keyboard,
  cpu,
  lan,
  props
) {
  await db.collection("HardwareRequests").add({
    PCID: PCID,
    request: request,
    requestedBy: requestedBy.toUpperCase(),
    items: {
      item1: monitor ? "Monitor" : "",
      item2: mouse ? "Mouse" : "",
      item3: keyboard ? "Keyboard" : "",
      item4: cpu ? "CPU" : "",
      item5: lan ? "LAN" : "",
    },
  });
  props.history.push("/home");
}

export async function createSoftware(
  PCID,
  request,
  requestedBy,
  softwareName,
  install_new,
  admin_rights,
  os_issue,
  boot_up,
  login,
  props
) {
  await db.collection("SoftwareRequests").add({
    PCID: PCID,
    request: request,
    requestedBy: requestedBy.toUpperCase(),
    softwareName: softwareName,
    items: {
      item1: install_new ? "Install New" : "",
      item2: admin_rights ? "Admin Rights" : "",
      item3: os_issue ? "OS Issue" : "",
      item4: boot_up ? "Boot Up" : "",
      item5: login ? "Login" : "",
    },
  });
  props.history.push("/home");
}

export async function createRemote(request, requestedBy, date, props) {
  await db.collection("RemoteAccess").add({
    reason: request,
    userName: requestedBy.toUpperCase(),
    createdAt: date,
  });
  props.history.push("/home");
}
