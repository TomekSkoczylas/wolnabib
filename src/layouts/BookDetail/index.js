import React, {useState, useEffect} from 'react';
import { withFirebase } from "../../functions/Firebase";
import {AuthUserContext} from '../../functions/Session';
import ReviewAdd from '../../components/ReviewAdd';
import ReviewSection from '../../components/ReviewSection';
import StarRatingComponent from 'react-star-rating-controlled-component';
import randomBook from './book.png';
import "./style.scss";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';

const BookDetail = (props) => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const [average, setAverage] = useState(0);
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(prevState => {
            return !prevState
        })
    }


    useEffect(()=> {
           setLoading(true);

           props.firebase
            .book(props.match.params.id)
            .on('value', snap => {
                //dodajemy książkę do stanu
                    const bookObj = snap.val()
                    const pubyear = bookObj.pubdate.toString().slice(0,4);
                    // console.log(pubyear);
                setBook({...snap.val(), pubyear});
                // console.log(book);
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
            <div className="book-details">
                {loading && <div className="loading-msg">Ładujemy dane...</div>}
                {book && (
                <div className="book-details__container">
                    <h2 className="book-title">{book.title}</h2>
                    <div className="metadata">
                        <img src={book.thumburl ? book.thumburl : randomBook} alt="okładka zastępcza" className="metadata__cover" />
                        <div className="metadata__info">
                            <span className="book-data__item b-author">{book.author}</span>
                            <span className="book-data__item b-rating">Wasza ocena: ({average}/6)<br/>
                              { average ? <span className="book-rating__stars">
                                  <StarRatingComponent
                                      name="rating"
                                      value={average}
                                      starCount={6}
                                      editing={false}
                                      starColor={'red'}
                                      emptyStarColor={'black'}
                                  /> 
                              </span> : <span className="book-rating--text"> jeszcze nie ma ocen </span>}
                          </span>
                          <span className="book-data__item b-category">Kategoria: {book.subject} </span><br/>
                          <span className="book-data__item b-edtion">
                              Wydanie: {book.publisher}, <br/>
                              {book.publocation} {book.pubyear} <br/>
                              ISBN: {book.isbn} 
                           </span>
                        </div>
                        
                    </div>
                    <div className="description">
                        <p className={expanded ? "text_long dscr-text" : "text_short dscr-text"}>Opis: {book.description}</p>
                        <div onClick={toggleExpanded} className="book-dscr--buton">
                            {expanded ? <IoMdArrowRoundUp className="dscr-icon"/> : <IoMdArrowRoundDown className="dscr-icon"/> }
                        </div>
                    </div>
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