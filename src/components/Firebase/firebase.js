import app from 'firebase/app';
import 'firebase/auth';

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
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

}

export default Firebase;