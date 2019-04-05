import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import * as CONFIG from './../../constants/firebase';

const config = {
    apiKey: CONFIG.apiKey,
    authDomain: CONFIG.authDomain,
    databaseURL: CONFIG.databaseURL,
    projectId: CONFIG.projectId,
    storageBucket: CONFIG.storageBucket,
    messagingSenderId: CONFIG.messagingSenderId
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
  
  doSignOut = () => {
    this.auth.signOut(); 
    window.location.href='/login';
    localStorage.removeItem('authUser');
  };

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

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
