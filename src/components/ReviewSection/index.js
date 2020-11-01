import React, {useState, useEffect} from 'react';
import {withFirebase} from "../../functions/Firebase";


const ReviewSection = (props) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(()=>{
        setLoading(true)
        props.firebase
            .book(props.bookId + '/reviews')
            .on('value', snap => {
                if(snap.val()) {
                    const revObj = snap.val();
                    const revList = Object.keys(revObj).map(key => ({
                        ...revObj[key],
                        authId: key, 
                    })); 
                    setReviews(revList)
                } else {
                    setReviews([]);
                }  
                setLoading(false);
            });      
        return ()=> {
            props.firebase.book(props.bookId + '/reviews').off();
        }
    }, [props.firebase, props.bookId]);


    const onDelete = () => {
        props.firebase.book(props.bookId + '/reviews/' + props.authUser.uid)
        .remove()
        .catch(error => {
            setError(error);
        })
    }
 

    return (
        <div>
            <h2>Wasze recenzje</h2>
            {loading && <div>Ładuje się...</div>}
            <ul>
                {reviews.map(rev => (
                    <li key={rev.authId}>
                        <span>Autor: {rev.author} </span>
                        <span>Ocena: {rev.rating} </span>
                        { props.authUser.uid === rev.authId ? <button onClick={onDelete}>Usuń</button> : null}
                        <p>{rev.text}</p>
                    </li>
                ))}
            </ul>
                {error && <p>{error.message}</p>}
        </div>
    )
}



export default withFirebase(ReviewSection);
