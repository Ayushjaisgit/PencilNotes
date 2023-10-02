import './App.css';
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";
import Navbar from '../src/Components/Navbar';
import { Home } from '../src/Components/Home';
import About from '../src/Components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from '../src/Components/Alert';
import Signup from '../src/Components/Signup';
import Login from '../src/Components/Login';
import Notes from '../src/Components/Notes';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes >
              <Route exact path="/" element = { <Home />}>
               
              </Route>
              <Route exact path="/notes" element = {  <Notes />} >
              
              </Route>
              <Route exact path="/login" element = {  <Login />}>
              
              </Route> 
              <Route exact path="/signup" element = {  <Signup />}>
              
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
