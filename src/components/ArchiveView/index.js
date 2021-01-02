import React, { useEffect, useState } from "react";


import { withFirebase } from "../../functions/Firebase";

import './style.scss';


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
        <div className="archive">
            <span className="archive--title">Dziennik aktywności użytkowników</span>
            <ul className="archive--list">
                {archList.reverse().map(item => (
                    <li className="archive--item" key={item.itemID}>
                        <ArchItem item={item}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const ArchItemBase = props => {
    const [book, setBook] = useState([]);

    const {author, date, bookID, text, userID, itemID } = props.item;

    const newDate = new Date(date); 

    useEffect(()=> {
        props.firebase
            .book(bookID)
            .on("value", snap => {
                setBook({...snap.val()})
                // console.log(snap.val());
            })
        
        return()=> {
            props.firebase.book(bookID).off();
        }       
   
    }, [props.firebase, bookID])

    const onDelete = () => {
        console.log("usuwamy")
        props.firebase.book(bookID + '/reviews/' + userID)
        .remove()
        .then(()=> {
            props.firebase.archiveItem(itemID)
            .remove()
        })
    } 


    return (
        <div className="item">
            <span className="item--content user">Użytkownik: {author}</span><br/>
            <span className="item--content data">Data: {newDate.toGMTString()}</span><br/>
            <span className="item--content book">Książka: {book.title}</span><br/>
            <span className="item--content review-text">Treść recenzji: {text}</span><br/>
            <button className="item--btn" onClick={onDelete}>Usuń komentarz
                {/* <FaRegTrashAlt className="delete-icon"/> */}
            </button>
        </div>

    )
}

const ArchItem = withFirebase(ArchItemBase);


export default withFirebase(ArchiveView); 
