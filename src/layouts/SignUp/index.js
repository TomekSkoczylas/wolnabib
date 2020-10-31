import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";


import { withFirebase } from "../../functions/Firebase";
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


const SignUpPage = () => (
    <div>
        <h1>Zausz Konto!</h1>
        <SignUpForm/>
    </div>
);

const SingUpFormBase = (props) => {
    const [signee, setSignee] = useState({...INITIAL_STATE});

    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = signee;

    let onSubmit = event => {
        props.firebase
            .doCreateUserWithEmailAndPassword(email,  passwordOne)
            .then(authUser => {
                return props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles: {},
                    });
            } )
            .then(()=> {
                setSignee({...INITIAL_STATE});
                props.history.push(ROUTES.MAIN);
            })
            .catch(err => {
                setSignee(prevState => {
                    return {
                        ...prevState,
                        error: err,
                    }
                })
            })
        event.preventDefault();

    };

    let onChange = event => {
        const { name, value } = event.target;
        setSignee(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    };

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Zausz!</button>

            {error && <p>{error.message}</p>}
        </form>
    );
};

const SignUpLink = () => (
    <p>
        Nie masz konta? <Link to={ROUTES.SIGNUP}>Zausz konto!</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SingUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };