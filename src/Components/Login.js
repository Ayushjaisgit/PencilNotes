import React, { useState } from 'react'
import { Alert } from './Alert'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(credentials)
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log("===========================",json);
        console.log();
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('authtoken', json.authtoken); 
            navigate("/notes");

        }
        else {
            setAlertMessage(json.error);
            setShowAlert(true);
            // alert(json.error);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const closeAlert = () => {
        setShowAlert(false);
    };
    return (

        <div>
            {showAlert && (
                <Alert message={alertMessage} onClose={closeAlert} />
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
