import React, {useState} from "react";

import { withFirebase} from "../../functions/Firebase";

const INITIAL_STATE = {
    displayName: '',
    error: null,
};

const NameAddForm = (props) => {
    const [name, setName] = useState(INITIAL_STATE);

    let onSubmit = event => {
        const { displayName } = name;

        props.firebase
            .doUpdateProfile({displayName: displayName})
            .then(()=> {
                setName(INITIAL_STATE);
            })
            .catch(err => {
                setName(prevState => {
                    return {
                        ...prevState,
                        error: err,
                    }
                } )
            });

        event.preventDefault();

    }

    let onChange = event => {
        const {name, value} = event.target;
        setName(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const {  displayName, error } = name;

    let isInvalid = displayName === '';

    return (
        <div>
            <h3>Zmiana imienia</h3>
        <form onSubmit={onSubmit}>
            <input
                name="displayName"
                value={displayName}
                onChange={onChange}
                type="text"
                placeholder="Nowe imię"
            />
            <button disabled={isInvalid} type="submit">
                Zmień moje imię 
            </button>

            {error && <p>{error.message}</p>}
        </form>
        </div>
    );
}

export default withFirebase(NameAddForm);