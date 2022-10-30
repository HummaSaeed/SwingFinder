import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQK_7YBVtiv0AXroJ3arg6SKQVZXfdQyE",
  authDomain: "swingfinderproject.firebaseapp.com",
  projectId: "swingfinderproject",
  storageBucket: "swingfinderproject.appspot.com",
  messagingSenderId: "104339284493",
  appId: "1:104339284493:web:fb43aed81e08b77a626b44"
};
let app;
if(firebase.apps.length ===0){
  app = firebase.initializeApp(firebaseConfig);
}else{
  app = firebase.app();
}
const auth = firebase.auth();
export {auth};