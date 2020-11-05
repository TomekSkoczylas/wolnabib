import React, {useState} from "react";

import { withFirebase } from "../../functions/Firebase";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import "./style.scss";



const SearchEngine = props => {
    // const [criterion, setCriterion] = useState("title");
    const [searchWord, setSearchWord] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [error, setError] = useState(null);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const onSubmit = e => {
        setError(null);
        setBookList([]);
        if (searchWord) {
            const upperSearchWord = capitalize(searchWord);
            console.log(searchWord);
            console.log(upperSearchWord);
            props.firebase.books()
                .orderByChild(`title`)
                .startAt(`${upperSearchWord}`)
                .endAt(`${upperSearchWord}\uf8ff`)
                .limitToFirst(7)
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
                .limitToLast(15)
                .once('value')
                .then (snap => {
                    const snapObject = snap.val()
                    const snapList = Object.keys(snapObject).map(key => ({
                        ...snapObject[key],
                        book_id: key,
                    }));
                    // console.log(snapList);
                    setBookList(snapList.reverse());
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
        <section className="search-and-display">
            <div className="search--container">
            <form onSubmit={onSubmit}>
                <div className="search-form--container">
                {/* <label>Kryterium wyszukiwania
                <select value={criterion} onChange={onCritChange}>
                    <option value="title">Tytuł</option>
                    <option value="author">Autor</option>
                    <option value="subject">Temat</option>
                </select>
                </label> */}
                <input
                    className="search--input-field"
                    name="searchPhrase"
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    type="text"
                    placeholder="Wpisz tytuł książki..."
                    autoComplete="off"
                />
                <button type="submit" className="search--btn btn">Wyszukaj Książkę</button>
                {error && <p className="error-message"> {
                    (error.message === "Cannot convert undefined or null to object") ? "Sorry, nic nie znaleziono" : error.message
                } </p>}
                </div>
            </form>
            </div>
            <div className="display--container">
            {loading && <p>Ładujemy dane...</p>}
                <ul className="display--list">
                    <h2 className="display--header">Znalezione tytuły:</h2>
                    {bookList.map(book => (
                        <li key={book.book_id} className="display-list--item">
                            <Link to={`${ROUTES.MAIN}/${book.book_id}`} className="display-item--link">
                                <div className="display-item--content">
                                    <span className="display-content--title content">{book.title}</span>
                                    <span className="display-content--author content">  Autorstwa: {book.author} </span>
                                    <span className="display-content--publisher content">Wydana: { book.publisher} </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}               
    

export default withFirebase(SearchEngine);