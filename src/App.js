import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert messege={"This is an alert component"} />
        <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about"
            element={<About />} />
        </Routes>
            </div>
      </Router>
    </NoteState>
  );
}

export default App;
