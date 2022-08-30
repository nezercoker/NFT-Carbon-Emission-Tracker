import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Wallet from './Wallet';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/wallet/:walletId' element={<Wallet />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
