import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Map from "./components/map/Map"
import Header from "./components/header/Header";


function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route path={"/"} element={<Map/>}/>
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
