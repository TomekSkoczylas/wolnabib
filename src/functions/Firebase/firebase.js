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

    doUpdateProfile = (data) => this.auth.currentUser.updateProfile(data);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref(`users`);

    // *** Books API ***

    book = bid => this.db.ref(`books/${bid}`);

    books = () => this.db.ref(`books`);

    // *** Activity API ***

    archive = () => this.db.ref('archive');

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) => 
        this.auth.onAuthStateChanged(authUser => {
            if(authUser) {
                this.user(authUser.uid)
                .once('value')
                .then(snap => {
                    
                    const dbUser = snap.val();
                    

                    if(!dbUser.roles) {
                        dbUser.roles = {};
                    }

                    // merging users
                    
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };

                    
                    next(authUser);
                });
            } else {
                fallback();
            }     
    });

    
    

}

export default Firebase;