import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/map/Map";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Departement from "./components/chart/ChartBande";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Map />} />
        <Route path={"/departement/:id"} element={<Departement />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
