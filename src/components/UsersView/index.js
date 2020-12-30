import React, { useEffect, useState } from "react";

import { withFirebase } from '../../functions/Firebase';

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
        <div>
            {isLoading && <div>Loading...</div>}

            <ul>
                {users.map(user => (
                    <li key={user.uid}>
                        <span>Imię użytkownika: {user.username}</span>
                        <span>Mail użytkownika: {user.email}</span>
                    </li>    
                ))}
            </ul>
        </div>
    )

}



export default withFirebase(UsersView);

