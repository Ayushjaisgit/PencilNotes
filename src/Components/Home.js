import React, { useContext } from 'react'
import Notes from './Notes'



const Home = () => {

  return (
    <>
      <div className="container my-3">
        <h1>Add Your Notes</h1>
        <form className="container my-3">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>  
        <Notes/>
    </>
  )
}

export default Home