import React, {useState} from "react";
import {withFirebase} from "../../functions/Firebase";


const Admin = () => {
    return (
        <div>
            <div>Admin Site</div>
            <BookAddForm/>
        </div>
    )
}

const INITIAL_STATE = {
    title: '',
    author_firstname: '',
    author_surname: '',
    category: '',
    edition_year: '',
    editor: '',
    error: null,
}


const BookAddFormBase = props => {
    const [book, setBook] = useState({...INITIAL_STATE})

    const {
        title,
        author_firstname,
        author_surname,
        category,
        edition_year,
        editor,
        error,
    } = book;



    const onChange = event => {
        const { name, value } = event.target;
        setBook(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    };

    const onSubmit = event => {
        props.firebase
            .books()
            .push(book)
            .then(()=> {
                setBook({...INITIAL_STATE});
                })
            .catch(error => {
                setBook(prevState => {
                    return {
                        ...prevState,
                        error,
                    }
                });
            })


        event.preventDefault()

    }


    const isInvalid = title === '' || author_surname === '';

    return (
        <div>
            <form onSubmit={onSubmit}>Book Adding Form
                <br/>
                <label>Tytuł
                    <input
                        name="title"
                        value={title}
                        onChange={onChange}
                        type="text"
                    />
                </label><br/>
                <label>Imię autora
                    <input
                        name="author_firstname"
                        value={author_firstname}
                        onChange={onChange}
                        type="text"
                    />
                </label>
                <label>Nazwisko autora
                    <input
                        name="author_surname"
                        value={author_surname}
                        onChange={onChange}
                        type="text"
                />
                </label><br/>
                <label>Kategoria
                    <input
                        name="category"
                        value={category}
                        onChange={onChange}
                        type="text"
                    />
                </label><br/>
                <label>Wydawnictwo
                    <input
                        name="editor"
                        value={editor}
                        onChange={onChange}
                        type="text"
                    />
                </label>
                <label>Rok wydania
                    <input
                        name="edition_year"
                        value={edition_year}
                        onChange={onChange}
                        type="text"
                    />
                </label><br/>
                <button disabled={isInvalid} type="submit">
                    Dodaj książkę
                </button>
                {error && <p>{error.message}</p>}
            </form>
        </div>
    )
}

const BookAddForm = withFirebase(BookAddFormBase);


export default Admin;

export { BookAddForm }