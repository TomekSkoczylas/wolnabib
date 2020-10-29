import React, {useState} from "react";

import { withFirebase } from "../../components/Firebase";

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
        if (searchWord) {
            props.firebase.books()
                .orderByChild(`${criterion}`)
                .startAt(`${searchWord}`)
                .endAt(`${searchWord}`+`\uf8ff`)
                .limitToFirst(5)
                .once('value')
                .then(snap => {
                    const snapObject = snap.val()
                    console.log(snapObject);
                    const snapList = Object.keys(snapObject).map(key => ({
                            ...snapObject[key],
                            book_id: key,
                        }))
                    console.log(snapList);
                    setBookList(snapList);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                });
        } else {
            props.firebase.books()
                .limitToFirst(10)
                .once('value')
                .then (snap => {
                    const snapObject = snap.val()
                    const snapList = Object.keys(snapObject).map(key => ({
                        ...snapObject[key],
                        book_id: key,
                    }));
                    console.log(snapList);
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
                    <option value="author_surname">Autor</option>
                    <option value="category">Kategoria</option>
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
            {loading && <p>Ładujemy dane...</p>}

        </div>
    )

}

export default withFirebase(SearchEngine);