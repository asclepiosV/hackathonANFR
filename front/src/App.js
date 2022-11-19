import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/map/Map";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Region from "./components/chart/ChartBande";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<Map />} />
        <Route path={"/region"} element={<Region />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
