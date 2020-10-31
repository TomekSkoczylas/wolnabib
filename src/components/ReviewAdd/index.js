import React, { useState } from 'react';
import {withFirebase} from "../../functions/Firebase";


const ReviewAdd = (props) => {
    const [review, setReview] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = e => {
        props.firebase
            .book(props.bookId + '/reviews')
            .push(review)
            .then(()=> {
                setReview('');
                })
            .catch(error => {
                setError(error);
            }) 

        e.preventDefault();

    }

    const onChange = e => {
        setReview(e.target.value);
    }

    const isInvalid = review === '';

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    <textarea value={review} onChange={onChange}/>
                </label>
                <button disabled={isInvalid} type="submit">Dodaj swoją recenzję</button>
                {error && <p>error.message</p>}
            </form>
        </div>
    )

}

export default withFirebase(ReviewAdd);
