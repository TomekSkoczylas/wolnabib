import React, { useState } from 'react';
import {withFirebase} from "../../functions/Firebase";
import StarRatingComponent from 'react-star-rating-controlled-component';

const ReviewAdd = (props) => {
    const [review, setReview] = useState({
                author: props.authUser.username,
                rating: 0,
                text: '',
                });
    const [error, setError] = useState(null);

    const {
        rating,
        text,
    } = review;

    const onSubmit = e => {
        props.firebase //dodaje recenzje do informacji o książce
            .book(props.bookId + '/reviews/' + props.authUser.uid)
            .set(review)
            .then(()=> {
                const data = {
                    ...review,
                    bookID: props.bookId,
                    userID: props.authUser.uid,
                    date: Date.now(),
                }
                props.firebase //dodaje recenzje do Archiwum
                .archive()
                .push(data);

                setReview({
                    author: props.authUser.username,
                    rating: 0,
                    text: '',
                });
                console.log(review.rating);
            })
            // .then(()=> { 
                
            // })
            .catch(error => {
                setError(error);
            }) 
            
        e.preventDefault();

    }

    const onChange = e => {
        const { name, value } = e.target;

        setReview(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onRatingChange = (rate) => {
        setReview(prevState => ({
            ...prevState,
            rating: rate,
        }));
    };


    const isInvalid = text === '' || rating === 0;

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>Twoja recenzja</h2>
                <div style={{fontSize: 36 }}>
                <StarRatingComponent
                    name="rating"
                    value={rating}
                    starCount={6}
                    onStarClick={onRatingChange}
                    starColor={'red'}
                    emptyStarColor={'black'}
                />
                </div>
                    <textarea
                        name="text" 
                        value={text} 
                        onChange={onChange}
                        placeholder="Napisz swoją recenzję"
                        /><br/>
                <button disabled={isInvalid} type="submit">Dodaj swoją recenzję</button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )

}

export default withFirebase(ReviewAdd);
