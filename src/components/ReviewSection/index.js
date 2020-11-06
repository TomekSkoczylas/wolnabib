import React, {useState, useEffect} from 'react';
import {withFirebase} from "../../functions/Firebase";
import StarRatingComponent from 'react-star-rating-controlled-component';
import './style.scss';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';


const ReviewSection = (props) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prevState => {
            return !prevState
        })
    }

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
        <div className="review-view">
            <h2 className="rev-view__text">Wasze recenzje</h2>
            {loading && <div className="loading-msg">Ładuje się...</div>}
            <ul className='rev-view__list'>
                {reviews.map(rev => (
                    <li key={rev.authId} className="rev-item">
                        <div className="rev-item__head">
                            <div className="rev-item__id">
                                <span className="rev-item__author"> {rev.author} </span>
                                <div className="rev-item__stars">
                                <StarRatingComponent
                                    name="rating"
                                    value={rev.rating}
                                    starCount={6}
                                    editing={false}
                                    starColor={'#FA8072'}
                                    emptyStarColor={'#293039'}
                                />
                                </div>
                            </div>
                        { props.authUser.uid === rev.authId ? <button onClick={onDelete} className="rev-item__delete">
                            <FaRegTrashAlt className="delete-icon"/>
                            </button> : null}
                        </div>
                        <div className="rev-item__text">
                            <p className={ expanded ? "text--long" : "text--short"}>{rev.text}</p>
                            <div onClick={toggleExpanded} className="rev-item__text--toggle-btn">
                                { expanded ? <IoMdArrowRoundUp/> : <IoMdArrowRoundDown/> }
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
                {error && <p>{error.message}</p>}
        </div>
    )
}



export default withFirebase(ReviewSection);
