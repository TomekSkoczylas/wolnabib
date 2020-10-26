import React, {useState,  useEffect} from "react";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import { withFirebase } from "../../components/Firebase";

import AccountPage from "../Account";
import LogInPage from "../LogIn";
import MainPage from "../Main";
import PassForgetPage from "../PassForget";
import SignUpPage from "../SignUp";
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../../components/Session';


const App = (props) => {
    const [user, setUser] = useState({authUser: null});

    useEffect(()=> {
        const listener = props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? setUser({authUser}) : setUser({authUser: null});
        });

        return () => {
            listener();
        }

    }, [props.firebase.auth])

    return (
        <AuthUserContext.Provider value={user}>
        <Router>
            <div>
                <Route exact path={ROUTES.LOGIN} component={LogInPage}/>
                <Route path={ROUTES.ACCOUNT} component={AccountPage}/>
                <Route path={ROUTES.MAIN} component={MainPage}/>
                <Route path={ROUTES.PASS_FORGET} component={PassForgetPage}/>
                <Route path={ROUTES.SIGNUP} component={SignUpPage}/>
            </div>
        </Router>
        </AuthUserContext.Provider>
    );
}

export default withFirebase(App);

