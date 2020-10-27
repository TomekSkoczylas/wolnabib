import React, {useState} from "react";

import { withFirebase } from "../../components/Firebase";

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
        <form onSubmit={onSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Nowe hasło"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Potwierdź nowe hasło"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
}

export default withFirebase(PassChangeForm);