import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCLrOVayyVs789lbmdfqIV_HmY0KCMjyHo",
    authDomain: "firedux-todo-d001f.firebaseapp.com",
    databaseURL: "https://firedux-todo-d001f.firebaseio.com",
    projectId: "firedux-todo-d001f",
    storageBucket: "firedux-todo-d001f.appspot.com",
    messagingSenderId: "62973711247"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    this.auth = app.auth();
    this.db = app.database();

  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  
  doSignOut = () => this.auth.signOut();

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

 
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  page = uid => this.db.ref(`pages/${uid}`);

  pages = () => this.db.ref('pages');
}

export default Firebase;
