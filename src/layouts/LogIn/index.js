import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import { compose } from 'recompose';
import {withFirebase} from "../../components/Firebase";
import * as ROUTES from '../../constants/routes';
import SignInWithGoogle from "../../elements/GoogleLogIn";
import {PassForgetLink} from "../PassForget";

const LogInPage = () => (
    <div>
        <h1>Strona Logowania</h1>
        <LogInForm/>
        <SignInWithGoogle/>
        <PassForgetLink/>
        <SignUpLink/>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

const LogInFormBase = (props) => {
    const [user, setUser] = useState({...INITIAL_STATE});

    const {
        email,
        password,
        error,
    } = user

    const isInvalid = email === '' || password === '';

    const onSubmit = event => {
        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(()=> {
                setUser({...INITIAL_STATE});
                props.history.push(ROUTES.MAIN)
            })
            .catch(err => {
                setUser(prevState => {
                    return {
                        ...prevState,
                        error: err,
                    }
                })
            })

        event.preventDefault();

    }

    const onChange = event => {
        const {name, value} = event.target;
        setUser(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                name='email'
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Podaj swój adres email"
            />
            <input
                name='password'
                value={password}
                onChange={onChange}
                type='password'
                placeholder="Podaj hasło logowania"
            />
            <button disabled={isInvalid} type='submit'>Zaloguj się</button>
            { error && <p>{error.message}</p>}
        </form>
    )
}

const LogInForm = compose(
    withRouter,
    withFirebase,
)(LogInFormBase)

export default LogInPage;

