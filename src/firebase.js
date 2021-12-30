const firebaseConfig = {
    apiKey: "AIzaSyCLFYV8XdBeK93FUvPfy_DtJUppBW-rfeo",
    authDomain: "collaborative-notes-40556.firebaseapp.com",
    projectId: "collaborative-notes-40556",
    storageBucket: "collaborative-notes-40556.appspot.com",
    messagingSenderId: "839274914110",
    appId: "1:839274914110:web:d831824d64d0aba8cc8c6f"
  };
  
  Object.freeze(firebaseConfig);
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export const signinUser = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };
  
  export const signoutUser = () => {
    firebase.auth().signOut();
  };

  export const AUTH = firebase.auth();
  