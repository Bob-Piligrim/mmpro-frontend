import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home/Home";
import Portfolio from "./Pages/Portfolio/Portfolio";
import About from "./Pages/About/About";

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <div className="contentWrapper">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/aboutus" element={<About />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
