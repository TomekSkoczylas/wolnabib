import React, { useState } from "react";

import { withRouter } from "react-router-dom";
import { withFirebase } from '../../components/Firebase';

import { compose } from "recompose";

import * as ROUTES from "../../constants/routes";

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
        <form onSubmit={onSubmit}>
            <button type='submit'>Sign In With Google</button>

            {error.error && <p>{error.error.message}</p>}
        </form>
    )
}

const SignInWithGoogle = compose(
    withRouter,
    withFirebase,
)(SignInWithGoogleBase);

export default SignInWithGoogle;
