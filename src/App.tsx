import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home/Home";
import Portfolio from "./Pages/Portfolio/Portfolio";
import About from "./Pages/About/About";
import { HeaderProvider } from "./Component/Header/HeaderContext";
import categories from "./Component/Video/Categories";
import NotFound from "./Component/NotFound/NotFound";
import Modal from "./Component/Modal/Modal";

function App() {
  const closeModal = () => {
    return;
  };

  return (
    <>
      <Router>
        <HelmetProvider>
          <div className="App">
            <HeaderProvider>
              <Header />
              <div className="contentWrapper">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/modal"
                    element={<Modal onClose={closeModal} />}
                  />
                  <Route
                    path="/portfolio"
                    element={<Portfolio categories={categories} />}
                  />

                  <Route
                    path="/portfolio/:categoryName"
                    element={<Portfolio categories={categories} />}
                  />
                  <Route path="/aboutus" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </HeaderProvider>
          </div>
        </HelmetProvider>
      </Router>
    </>
  );
}

export default App;
