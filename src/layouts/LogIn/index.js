import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { compose } from 'recompose';
import {withFirebase} from "../../functions/Firebase";
import * as ROUTES from '../../constants/routes';
import SignInWithGoogle from "../../components/GoogleLogIn";
import RecentReviews from "../../components/RecentReviews";
import { SignUpLink } from '../SignUp';
import {PassForgetLink} from "../PassForget";

import './style.scss';

const LogInPage = () => (
    <div className="login-page container">
        <section className="intro-section">
            <div className="pic-container">
                <div className="pic-logo"></div>
                <div className="photo-container">
                    <div className="pic-photo pic-1"></div>
                    <div className="pic-photo pic-2"></div>
                    <div className="pic-photo pic-3"></div>
                </div>
                
            </div>
            <div className="page-name" id="login">
            <span className="page-name__wolbib">WOLNA BIBLIOTEKA</span>
            <span className="page-name__czytelnia">CZYTELNIA</span>
            </div>
        </section>
        <section className="bussines_section container">
        <div className='log-in__panel'>
            <LogInForm/>
            <PassForgetLink/>
        </div>
            <div className='sign-up__panel'>
                <p className='sign-up__text'>Nie masz konta?</p>
                <SignInWithGoogle/>
                <p className='sign-up__text'>lub</p>
                <SignUpLink/>
             </div>
        </section>
        <section className="recRev__section">
            <RecentReviews/>
        </section>
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
            <div className="form-body">
            <input
                className="input_field"
                name='email'
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email"
                autoComplete="off"
            /><br/>
            <input
                className="input_field"
                name='password'
                value={password}
                onChange={onChange}
                type='password'
                placeholder="Hasło"
            /><br/>
            <button disabled={isInvalid} type='submit' className="login-btn btn">Zaloguj się</button>
            { error && <p className="error-message">{error.message}</p>}
            </div>
        </form>
    )
}

const LogInForm = compose(
    withRouter,
    withFirebase,
)(LogInFormBase)

export default LogInPage;

