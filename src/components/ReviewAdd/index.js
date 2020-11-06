import React, { useState } from 'react';
import {withFirebase} from "../../functions/Firebase";
import StarRatingComponent from 'react-star-rating-controlled-component';
import './style.scss';

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
        <div className="rev-add">
            <h2 className="rev-add__text">Twoja recenzja:</h2>
            <form onSubmit={onSubmit}>
                <div className="rev-add__form">
                    <div className="rev-add__stars">
                    <StarRatingComponent
                        name="rating"
                        value={rating}
                        starCount={6}
                        onStarClick={onRatingChange}
                        starColor={'#FA8072'}
                        emptyStarColor={'#404b59'}
                    />
                    </div>
                        <textarea 
                            className="rev-add__input"
                            name="text" 
                            value={text} 
                            onChange={onChange}
                            placeholder="Napisz swoją recenzję"
                            /><br/>
                    <button disabled={isInvalid} type="submit" className="rev-add__btn btn">Dodaj recenzję</button>
                    {error && <p className="error-message">{error.message}</p>}
                </div>
            </form>
        </div>
    )

}

export default withFirebase(ReviewAdd);
