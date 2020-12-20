import React, { useEffect, useState } from "react";


import { withFirebase } from "../../functions/Firebase";




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

    const {author, text} = props.item;

    useEffect(()=> {
        props.firebase
            .book(props.item.bookID)
            .on("value", snap => {
                setBook({...snap.val()})
                console.log(snap.val());
            })
           
   
    }, [props.firebase, props.item.bookID])


    return (
        <>
            <span>Użytkownik: {author}</span>
            <span>Książka: {book.title}</span>
            <span>Treść recenzji: {text}</span>
        </>

    )
}

const ArchItem = withFirebase(ArchItemBase);


export default withFirebase(ArchiveView); 
