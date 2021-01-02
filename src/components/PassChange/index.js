import React, {useState} from "react";

import { withFirebase } from "../../functions/Firebase";

import './style.scss';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

const PassChangeForm = (props) => {
    const [password, setPassword] = useState({...INITIAL_STATE});

    const {
        passwordOne,
        passwordTwo,
        error,
    } = password;

    const onSubmit = event => {
        props.firebase
            .doPasswordUpdate(passwordOne)
            .then(()=> {
                setPassword({...INITIAL_STATE});
            })
            .catch(error => {
                setPassword(prevState => {
                    return {
                        ...prevState,
                        error: error,
                    }
                })
            })
        event.preventDefault();
    }

    const onChange = event => {
        const { name, value } = event.target;
        setPassword(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
        <div className="passChange">
        <h3 className="passChange--title">Zmiana hasła</h3>
        <form className="passChange--form" onSubmit={onSubmit}>
            <input
                className="passChange--input input_field"
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Nowe hasło"
            />
            <input
                className="passChange--input input_field"
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Potwierdź hasło"
            />
            <button className="passChange--btn btn"disabled={isInvalid} type="submit">
                Zmień moje hasło
            </button>
            {error && <p>{error.message}</p>}
        </form>
        </div>
    );
}

export default withFirebase(PassChangeForm);