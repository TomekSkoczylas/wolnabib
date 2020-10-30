import React, {useState, useEffect} from 'react';

const BookDetail = (props) => {
    const [book, setBook] = useState({
        book: null,
        ...props.location.state,
    });
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
           console.log(book);
    }, []);

    return (
        <div>
            <h2>Książka ({props.match.params.id})</h2>
        </div>
    );
};

export default BookDetail;