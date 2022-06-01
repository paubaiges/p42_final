import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Game from './Game';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="game/*" element={<Game />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

