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

const PassForgetForm = (props) => {
    const [mail, setMail] = useState({...INITIAL_STATE});

    const onSubmit = event => {

    }

    const onChange = event => {

    }

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


        </form>

    )



}


export default PassForgetPage;

