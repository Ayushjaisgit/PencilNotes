import React, { useState } from 'react'
import noteContext from "./noteContext"

const NoteState = (props) =>{
    
    return(
        <noteContext.Provider value={{}}>
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