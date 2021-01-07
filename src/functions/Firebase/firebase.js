import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
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

    doSendEmailVerification = () => 
        this.auth.currentUser.sendEmailVerification({
            url: "http://localhost:3000"
        });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref(`users`);

    // *** Books API ***

    book = bid => this.db.ref(`books/${bid}`);

    books = () => this.db.ref(`books`);

    // *** Activity API ***

    archive = () => this.db.ref('archive');
    archiveItem = itemID => this.db.ref(`archive/${itemID}`);

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

    
    

}

export default Firebase;