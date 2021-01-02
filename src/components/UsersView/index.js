import React, { useEffect, useState } from "react";

import { withFirebase } from '../../functions/Firebase';

import './style.scss';

const UsersView = props => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setIsLoading(true);

        props.firebase
            .users()
            .on('value', snap => {
                const userObject = snap.val();
                const userList = Object.keys(userObject).map(key => ({
                   ...userObject[key],
                   uid: key,     
                }));
                setUsers(userList);
                setIsLoading(false);
            })

        return()=> {
            props.firebase.users().off();
        }    
    }, [props.firebase])

    return (
        <div className="users">
            <span className="users--title">Lista użytkowników</span>
            {isLoading && <div>Loading...</div>}

            <ul className="users--list">
                {users.map(user => (
                    <li className="users--item" key={user.uid}>
                        <span className="users--content">Imię użytkownika: {user.username}</span><br/>
                        <span className="users--content">Mail użytkownika: {user.email}</span>
                    </li>    
                ))}
            </ul>
        </div>
    )

}



export default withFirebase(UsersView);

