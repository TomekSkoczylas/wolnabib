import React, { useState, useEffect } from "react";

import { withFirebase } from "../../functions/Firebase";
import StarRatingComponent from 'react-star-rating-controlled-component';

import './style.scss';

const RecentReviews = (props) => {
    const [recRev, setRecRev] = useState([]);
    const [loading, setLoading] = useState(false);

    
    useEffect(()=> {
        setLoading(true);
        props.firebase
            .archive()
            .limitToFirst(10)
            .on("value", snap => {
                const archObj = snap.val();
                const snapList = Object.keys(archObj).map(key => ({
                       ...archObj[key],
                       itemID: key,
                }));
                console.log(snapList);
                setRecRev(snapList.reverse());
                setLoading(false);

            })

        return()=> {
            props.firebase.archive().off();
        }      
    }, [props.firebase, setLoading])

    return (
        <div className="recRev">
            <span className="recRev--title">Najnowsze recenzje</span>
            {loading ? <span>Loading...</span> :
            <ul className="recRev--list">
                {recRev.map( item => (
                    <li className="recRev--list-item" key={item.itemID}>
                           <RecRevItem item={item}/> 
                    </li>
                ))}
            </ul>}
        </div>

    )
}

const RecRevItemBase = props => {
    const [book, setBook] = useState([]);

    const {author, date, bookID, text, rating } = props.item;

    const newDate = new Date(date);

    useEffect(()=> {
        props.firebase
            .book(bookID)
            .on("value", snap => {
                setBook({...snap.val()});
            })
        return () => {
            props.firebase.book(bookID).off();
        }    
    }, [props.firebase, bookID])

    return (
        <div className="recRevItem">
            <div className="recRevItem--header">
            <span className="recRevItem--book">{book.title}</span>
            <div className="recRevItem--rating">
                <div className="recRevItem--stars">
                    <StarRatingComponent
                        name="rating"
                        value={rating}
                        starCount={6}
                        editing={false}
                        starColor={'#FA8072'}
                        emptyStarColor={'#293039'}
                    />
                </div>
            </div>
            </div>
            <span className="recRevItem--text">{text}</span>
            <div className="recRevItem--footer">
                <span className="recRevItem--author">Autor/ka recenzji: {author}</span>
                <span className="recRevItem--date">Dodana: {newDate.toGMTString().substring(4, 16)}</span>
            </div>
        </div>
    )

}

const RecRevItem = withFirebase(RecRevItemBase);

export {RecRevItem};

export default withFirebase(RecentReviews);
