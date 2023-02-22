import React, { useState } from 'react'
import noteContext from "./noteContext"

const NoteState = (props) =>{
    const s1={
        "name":"Ayush",
        "class":"6th"
    }

    const [state, setState] = useState(s1)
    const update=() =>{
        setTimeout(() => {
            setState({
                "name":"lary",
                "class":"10th"
            })
        }, 1000);
    }

    return(
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState