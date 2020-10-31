import React, {useState, useEffect} from 'react';
import { withFirebase } from "../../functions/Firebase";
import ReviewAdd from '../../components/ReviewAdd';
import ReviewSection from '../../components/ReviewSection';

const BookDetail = (props) => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
           setLoading(true);

        //    console.log(props.match.params.id)

           props.firebase
            .book(props.match.params.id)
            .on('value', snap => {
                // const bookObject = snap.val();
                setBook({...snap.val()});
                setLoading(false);
            })
        
        return () => {
            props.firebase.book(props.match.params.id).off();
        }


    }, [props.firebase, props.match.params]);

    // console.log(book);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {book && (
            <div>
                <h2>{book.title}</h2>
                <span><strong>Autor: {book.author_firstname} {book.author_surname}</strong></span><br/> 
                <span>Kategoria: {book.category}</span><br/>
                <span>Edycja: {book.editor}, {book.edition_year}</span>
            </div>
            )}
            <ReviewAdd bookId={props.match.params.id}/>
            <ReviewSection bookId={props.match.params.id}/>
        </div>
    );
};

export default withFirebase(BookDetail);