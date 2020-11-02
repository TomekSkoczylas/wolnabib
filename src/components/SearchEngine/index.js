import React, {useState} from "react";

import { withFirebase } from "../../functions/Firebase";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


const SearchEngine = props => {
    const [criterion, setCriterion] = useState("title");
    const [searchWord, serSearchWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [error, setError] = useState(null);


    const onCritChange = e => {
        setCriterion(e.target.value);
    }

    const onSearchWordChange = e => {
        serSearchWord(e.target.value);
    }


    const onSubmit = e => {
        setError(null);
        setBookList([]);
        if (searchWord) {
            // const searchWordToLower = searchWord.toLowerCase();
            // const searchWordToUpper = searchWord.toUpperCase();
            props.firebase.books()
                .orderByChild(`${criterion}`)
                .startAt(`${searchWord}`)
                .endAt(`${searchWord}\uf8ff`)
                .limitToFirst(5)
                .once('value')
                .then(snap => {
                    const snapObject = snap.val()
                    // console.log(snapObject);
                    const snapList = Object.keys(snapObject).map(key => ({
                            ...snapObject[key],
                            book_id: key,
                        }))
                    // console.log(snapList);
                    setBookList(snapList);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                });
        } else {
            // *** w przypadku braku hasła wyszukiwania pokazuje pierwsze 10 książek z listy *** 
            props.firebase.books()
                .limitToFirst(10)
                .once('value')
                .then (snap => {
                    const snapObject = snap.val()
                    const snapList = Object.keys(snapObject).map(key => ({
                        ...snapObject[key],
                        book_id: key,
                    }));
                    // console.log(snapList);
                    setBookList(snapList);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error)
                });
        }
        e.preventDefault();
        // console.log(bookList)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Kryterium wyszukiwania
                <select value={criterion} onChange={onCritChange}>
                    <option value="title">Tytuł</option>
                    <option value="author">Autor</option>
                    <option value="subject">Temat</option>
                </select>
                </label>
                <input
                    name="searchPhrase"
                    value={searchWord}
                    onChange={onSearchWordChange}
                    type="text"
                    placeholder="wyszukaj..."
                />
                <button type="submit">Wyszukaj Książkę</button>
                {error && <p> {
                    (error.message === "Cannot convert undefined or null to object") ? "Sorry, nic nie znaleziono" : error.message
                } </p>}
            </form>
            <h2>Wyniki</h2>
            {loading && <p>Ładujemy dane...</p>}
            <ul>
                {bookList.map(book => (
                    <li key={book.book_id}>
                        <Link to={`${ROUTES.MAIN}/${book.book_id}`}>
                            <div>
                            <span><strong>Tytuł: {book.title} </strong></span><br/>
                            <span>Autor: {book.author} </span><br/>
                            <span>Wydawnictwo: { book.publisher} </span>
                            </div>
                        </Link>
                
                    </li>
                ))}
                </ul>

        </div>
    )
}               
    

export default withFirebase(SearchEngine);