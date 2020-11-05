import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";


import { withFirebase } from "../../functions/Firebase";
import * as ROUTES from '../../constants/routes';
import './style.scss';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


const SignUpPage = () => (
    <div className="signup-page">
        <div className='signup-photo--container'>
        <div className='signup-photo'></div>
        </div>
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
        <section className="signup-form--container">
            <div className="signup-form--wraper">
            <div className="signup-form--text">Podaj swoje dane</div>
        <form onSubmit={onSubmit}>
            <div className="signup-form--fields">
            <input
                className="singup-input--field"
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Twoje imię"
                autoComplete="off"
            />
            <input
                className="singup-input--field"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Twój adres email"
                autoComplete="off"
            />
            <input
                className="singup-input--field"
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Twoje hasło"
            />
            <input
                className="singup-input--field"
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Potwierdź hasło"
            />
            <button disabled={isInvalid} type="submit" className="signup-btn btn">Zapisz się</button>

            {error && <p className="error-message">{error.message}</p>}
            </div>
        </form>
        </div>
        </section>
    );
};

const SignUpLink = () => (
    <p className="signup-link--wraper">
        <Link to={ROUTES.SIGNUP} className="signup-link--link">Zapisz się</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SingUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };