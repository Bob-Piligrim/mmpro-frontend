import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home/Home";
import Portfolio from "./Pages/Portfolio/Portfolio";
import About from "./Pages/About/About";
import { HeaderProvider } from "./Component/Header/HeaderContext";
import categories from "./Component/VideoHover/Categories";

function App() {
  return (
    <>
      <HelmetProvider>
        <div className="App">
          <HeaderProvider>
            <Header />

            <div className="contentWrapper">
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/portfolio"
                    element={<Portfolio categories={categories} />}
                  />

                  <Route
                    path="/portfolio/:categoryName"
                    element={<Portfolio categories={categories} />}
                  />
                  <Route path="/aboutus" element={<About />} />
                </Routes>
              </Router>
            </div>
          </HeaderProvider>
        </div>
      </HelmetProvider>
    </>
  );
}

export default App;
