import { useState } from 'react'
import noteContext from "./noteContext"

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "63f5521eccd4af8ac7fdd99ba16",
          "user": "63efea77887af454795a2cb3",
          "title": "My title",
          "description": "Please Wake up and Early",
          "tag": "Personal",
          "date": "2023-02-21T23:22:06.205Z",
          "__v": 0
        },
        
        {
          "_id": "63f55353d3e7bdfddbad3ad846be",
          "user": "63efea77887af454795a2cb3",
          "title": "My title",
          "description": "Please Wake up and Early",
          "tag": "Personal",
          "date": "2023-02-21T23:27:15.315Z",
          "__v": 0
        },
        {
          "_id": "63f55353d3e7bbadsd3ad846c0",
          "user": "63efea77887af454795a2cb3",
          "title": "My title",
          "description": "Please Wake up and Early",
          "tag": "Personal",
          "date": "2023-02-21T23:27:15.526Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState
















// it was a demonstration for the sake of the understanding of Context API
// const s1={
    //     "name":"Ayush",
    //     "class":"6th"
    // }
    
    // const [state, setState] = useState(s1)
    // const update=() =>{
        //     setTimeout(() => {
            //         setState({
                //             "name":"lary",
                //             "class":"10th"
//         })
//     }, 1000);
// }




{/* <noteContext.Provider value={{state, update}}> */}