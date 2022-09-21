
import './App.css';
import { Routes, Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Puppy from './Components/Puppy';
import Search from './Components/Search';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/puppy/:breed" element={<Puppy/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>
     
    </div>
  );
}

export default App;
