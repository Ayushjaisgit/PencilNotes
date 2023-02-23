import React, { useContext} from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context
    const { note } = props;
    return (<>
        <div className="col-md-3">
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                    <div className="d-flex align-items-center justify-content-end">

                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>[deleteNote(note._id)]}></i>
                        <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                        <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                        <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    </>
    )
}

export default Noteitem