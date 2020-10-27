import React, {useState} from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../../components/Firebase";
import * as ROUTES from '../../constants/routes';

const PassForgetPage = () => (
    <div>
        <h1>Zapomniałem Hasła</h1>
        <PassForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
}

const PassForgetFormBase = (props) => {
    const [mail, setMail] = useState({...INITIAL_STATE});

    const { email, error } = mail;

    const onSubmit = event => {
        props.firebase
            .doPasswordReset(email)
            .then(()=> {
                setMail({...INITIAL_STATE});
            })
            .catch(error => {
                setMail(prevState => {
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
        setMail(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={mail.email}
                onChange={onChange}
                type="text"
                placeholder="Podaj adres e-mail"
            />
            <button disabled={isInvalid} type="submit">
                Zresetuj moje hasło
            </button>

            {error && <p>{error.message}</p>}
        </form>

    );

}

const PassForgetLink = () => (
    <p>
        <Link to={ROUTES.PASS_FORGET}>Zapomniałem hasła</Link>
    </p>
);

const PassForgetForm = withFirebase(PassForgetFormBase);

export default PassForgetPage;

export { PassForgetForm, PassForgetLink };