import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDB0ERt_Coert3BzmswepmG8cp6Xqxmw_o",
  authDomain: "labassist-207.firebaseapp.com",
  projectId: "labassist-207",
  storageBucket: "labassist-207.appspot.com",
  messagingSenderId: "185746094858",
  appId: "1:185746094858:web:a304d23d753e112567d8f3",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
