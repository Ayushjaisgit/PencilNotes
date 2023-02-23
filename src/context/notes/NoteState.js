import { useState } from 'react'
import noteContext from "./noteContext"

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial =[]
  


  const [notes, setNotes] = useState(notesInitial)

  // Get all notes function
  const getNotes = async () => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZmVhNzc4ODdhZjQ1NDc5NWEyY2IzIn0sImlhdCI6MTY3NzAxODE1Nn0.CI6o8sfJeAd5l1eJ7Q9VEW5G55vDW2oYqmrYC0RdhFc",
        'Content-Type': 'application/json'

      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
    // add note logic


  }
  // Add note function
  const addNote = async (title, description, tag) => {
    console.log("adding a new note")
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZmVhNzc4ODdhZjQ1NDc5NWEyY2IzIn0sImlhdCI6MTY3NzAxODE1Nn0.CI6o8sfJeAd5l1eJ7Q9VEW5G55vDW2oYqmrYC0RdhFc",
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({title, description, tag})
    });
    

    // add note logic


    const note = {
      "_id": "fdsdff",
      "user": "63efea77887af454795a2cb3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-02-21T23:27:15.526Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete note function
  const deleteNote = (id) => {
    // TODO API CALL
    console.log("Deleting the note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit note function
  const editNote = async (id, title, description, tag) => {
    // api call 

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZmVhNzc4ODdhZjQ1NDc5NWEyY2IzIn0sImlhdCI6MTY3NzAxODE1Nn0.CI6o8sfJeAd5l1eJ7Q9VEW5G55vDW2oYqmrYC0RdhFc",
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }



  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState