// import React, {useEffect, useState} from "react";
//
// import AuthUserContext from "./context";
// import { withFirebase } from "../Firebase";
//
// const withAuthentication = Component => props => {
//     const [user, setUser] = useState({authUser: null});
//
//     useEffect(()=> {
//         const listener = props.firebase.auth.onAuthStateChanged(authUser => {
//             authUser ? setUser({authUser}) : setUser({authUser: null});
//         });
//
//         return () => {
//             listener();
//         }
//
//     }, [props.firebase.auth])
//
//     return (
//         <AuthUserContext.Provider value={user} >
//             <Component {...props}/>
//         </AuthUserContext.Provider>
//
//     )
// }
//
//
// export default  withFirebase(withAuthentication)
