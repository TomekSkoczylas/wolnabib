import React, {useState, useEffect} from 'react';
import {withFirebase} from "../../functions/Firebase";


const ReviewSection = (props) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        setLoading(true)
        props.firebase
            .book(props.bookId + '/reviews')
            .on('value', snap => {
                if(snap.val()) {
                    const revObj = snap.val();
                    const revList = Object.keys(revObj).map(key => ({
                        ...revObj[key],
                        userId: key, 
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



    return (
        <div>
            <h2>Wasze recenzje</h2>
            {loading && <div>Ładuje się...</div>}
            <ul>
                {reviews.map(rev => (
                    <li key={rev.userId}>
                        <span>Autor: {rev.author} </span>
                        <span>Ocena: {rev.rating} </span>
                        <DeleteButton/><br/>
                        <p>{rev.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const DeleteButton = () => {
    return (
        <button>Usuń</button>
    )
}


export default withFirebase(ReviewSection);
