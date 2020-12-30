import React, { useEffect, useState } from "react";


import { withFirebase } from "../../functions/Firebase";

import { FaRegTrashAlt } from "react-icons/fa";


const ArchiveView = (props) => {
    const [archList, setArchList] = useState([]);

    useEffect(()=>{
        props.firebase
            .archive()
            .limitToFirst(20) 
            .on("value", snapshot => {
                const archObject = snapshot.val();

                const snapList = Object.keys(archObject).map(key => ({
                    ...archObject[key],
                    itemID: key, 
                }));

                setArchList(snapList);
            })

        return()=> {
            props.firebase.archive().off();
        }    
    })

    return (
        <div>
            <ul>
                {archList.map(item => (
                    <li key={item.itemID}>
                        <ArchItem item={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ArchItemBase = props => {
    const [book, setBook] = useState([]);

    const {author, date, bookID, text, userID } = props.item;

    const newDate = new Date(date); 

    useEffect(()=> {
        props.firebase
            .book(bookID)
            .on("value", snap => {
                setBook({...snap.val()})
                // console.log(snap.val());
            })
           
   
    }, [props.firebase, bookID])

    const onDelete = () => {
        console.log("usuwamy")
        props.firebase.book(bookID + '/reviews/' + userID)
        .remove()
    } 


    return (
        <>
            <span>Użytkownik: {author}</span>
            <span>Książka: {book.title}</span>
            <span>Data {newDate.toISOString()}</span>
            <span>Treść recenzji: {text}</span>
            <button onClick={onDelete}>Usuń
                <FaRegTrashAlt className="delete-icon"/>
            </button>
        </>

    )
}

const ArchItem = withFirebase(ArchItemBase);


export default withFirebase(ArchiveView); 
