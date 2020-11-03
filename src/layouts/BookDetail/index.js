import React, {useState, useEffect} from 'react';
import { withFirebase } from "../../functions/Firebase";
import {AuthUserContext} from '../../functions/Session';
import ReviewAdd from '../../components/ReviewAdd';
import ReviewSection from '../../components/ReviewSection';
import StarRatingComponent from 'react-star-rating-controlled-component';
import logo from './logo.png';


const BookDetail = (props) => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [average, setAverage] = useState(0);

    useEffect(()=> {
           setLoading(true);

           props.firebase
            .book(props.match.params.id)
            .on('value', snap => {
                //dodajemy książkę do stanu
                setBook({...snap.val()});
                //obliczamy średnią ocen czytelników
                const revObject = snap.val().reviews
                if(revObject){
                    const ratesArr = Object.keys(revObject).map(key => (
                        revObject[key].rating 
                        ))
                    const averageRate = ratesArr.reduce((a,b)=> a+b) / ratesArr.length;
                    setAverage(averageRate);
                }
                setLoading(false);    
            })
        
            

        return () => {
            props.firebase.book(props.match.params.id).off();
        }


    }, [props.firebase, props.match.params]);



    return (
        <AuthUserContext.Consumer>
            {authUser => (
            <div>
                {loading && <div>Loading...</div>}
                {book && (
                <div>
                    <h2>{book.title}</h2>
                    <span><strong>Autor: {book.author} </strong></span><br/>
                    <img src={book.thumburl ? book.thumburl : logo} alt="okładka zastępcza" />
                    {/* // <img src={book.thumburl} alt="okładka zastępcza"/>  */}
                    <p>Opis: {book.description}</p><br/>
                    <span>Kategoria: {book.subject} </span><br/>
                    <span>Wydanie: {book.publisher} <br/> {book.pubdate}, {book.publocation}</span><br/>
                    <span>ISBN: {book.isbn}</span><br/>
                    <span>Wasza ocena:
                        { average ? <span style={{fontSize: 32 }}>
                            <StarRatingComponent
                                name="rating"
                                value={average}
                                starCount={6}
                                editing={false}
                                starColor={'red'}
                                emptyStarColor={'black'}
                            /> 
                        </span> : <span> jeszcze nie ma ocen </span>}
                        ({average})
                    </span>
                </div>
                )}
                <ReviewAdd bookId={props.match.params.id} authUser={authUser}/>
                <ReviewSection bookId={props.match.params.id} authUser={authUser}/>
            </div>
            )}
        </AuthUserContext.Consumer>
    );
};

export default withFirebase(BookDetail);