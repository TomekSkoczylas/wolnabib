import React, { useState, useEffect } from "react";

import { withFirebase } from "../../functions/Firebase";

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
                setRecRev(snapList);
                setLoading(false);
            })

        return()=> {
            props.firebase.archive().off();
        }      
    }, [props.firebase, setLoading])

    return (
        <div className="recRev">
            <span className="recRev--itle">Ostatnio dodane recenzje</span>
            <ul className="recRev--list">
                {recRev.reverse().map( item => (
                    <li className="recRev--list-item" key={item.itemID}>
                           <RecRevItem item={item}/> 
                    </li>
                ))}
            </ul>
        </div>

    )
}

const RecRevItemBase = props => {
    const [book, setBook] = useState([]);

    const {author, date, bookID, text } = props.item;

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
            <span className="recRevItem--author">{author}</span>
            <span className="recRevItem--date">{newDate.toGMTString()}</span>
            <span className="recRevItem--book">{book.title}</span>
            <span className="recRevItem--text">{text}</span>
        </div>
    )

}

const RecRevItem = withFirebase(RecRevItemBase);

export {RecRevItem};

export default withFirebase(RecentReviews);
