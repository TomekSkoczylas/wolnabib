import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import { withFirebase } from '../../functions/Firebase';

import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";
import "./style.scss";

const SignInWithGoogleBase = (props) => {
    const [error, setError] = useState({error: null});

    const onSubmit = event => {
        props.firebase
            .doSignInWithGoogle()
            .then(socialAuthUser => {
                return props.firebase
                    .user(socialAuthUser.user.uid)
                    .set({
                        username: socialAuthUser.user.displayName,
                        email: socialAuthUser.user.email,
                        roles: {}
                    });
            })
            .then(() => {
                setError({error:null});
                props.history.push(ROUTES.MAIN);
            })
            .catch(error => {
                setError({error: error});
            })
        event.preventDefault();
    }

    return (
        <div className="google-login-wraper">
        <form onSubmit={onSubmit}>
            <button type='submit' className="google-login-btn btn">Zaloguj się przez Google</button>

            {error.error && <p className="error-message">{error.error.message}</p>}
        </form>
        </div>
    )
}

const SignInWithGoogle = compose(
    withRouter,
    withFirebase,
)(SignInWithGoogleBase);

export default SignInWithGoogle;
