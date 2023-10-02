import React from 'react'

export const Alert = ({ message, onClose }) => {
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                {message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
            {/* <button className="alert-close-button" > X</button> */}
            </div>
        </div>
    )
}
