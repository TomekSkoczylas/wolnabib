import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import { compose } from "recompose";


import { withFirebase } from "../../functions/Firebase";
import * as ROUTES from '../../constants/routes';
import './style.scss';
import img from '../../images/zauszkonto.jpg'


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};


const SignUpPage = () => (
    <div className="signup-page">
        <div className="signup-page__container">
            <div className='signup-photo__container'>
                <img src={img} className='signup-photo' alt="ludzie czytający ksiązki"/>
            </div>
            <SignUpForm/>
        </div>
        <div className="signup-page__footer"></div>
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
        <section className="signup-form__container">
            <div className="signup-form__text">Podaj swoje dane</div>
            <form onSubmit={onSubmit}>
                <div className="signup-form__fields">
                    <input
                        className="singup-input__field"
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Twoje imię"
                autoComplete="off"
                    />
                    <input
                        className="singup-input__field"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Twój adres email"
                autoComplete="off"
                    />
                    <input
                        className="singup-input__field"
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Twoje hasło"
                    />
                    <input
                        className="singup-input__field"
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
        </section>
    );
};

const SignUpLink = () => (
    <p className="signup-link__wraper">
        <Link to={ROUTES.SIGNUP} className="signup-link__link">Zapisz się</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SingUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };