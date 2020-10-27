import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBlFEBqsiwqRNzXUxcg65Osyg5bEX4rMUY",
    authDomain: "wolbib-ba08f.firebaseapp.com",
    databaseURL: "https://wolbib-ba08f.firebaseio.com",
    projectId: "wolbib-ba08f",
    storageBucket: "wolbib-ba08f.appspot.com",
    messagingSenderId: "880268056068",
    appId: "1:880268056068:web:e4bd9bf927b19b87afc751"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    // ***Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref(`users`);

}

export default Firebase;