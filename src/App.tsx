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
import components from "./Pages/About/Components";
import ProjectInformation from "./Component/ProjectInformation/ProjectInformation";
import VideoHover from "./Component/Video/VideoHover/VideoHover";
import VideoRilsHover from "./Component/Video/VideoRilsHover/VideoRilsHover";
import VideoOtherHover from "./Component/Video/VideoOtherHover/VideoOtherHover";

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
                  <Route
                    path="/aboutus"
                    element={<About components={components} />}
                  />
                  <Route
                    path="/aboutus/:componentName"
                    element={<About components={components} />}
                  />
                  <Route
                    path="/portfolio/kino/informatcia_o_proekte"
                    element={<ProjectInformation />}
                  />
                  {categories.map((category) =>
                    category.content.map((video) => {
                      const videoComponent = (() => {
                        if (category.name === "КИНО") {
                          return <VideoHover video={video} />;
                        } else if (category.name === "РИЛС") {
                          return <VideoRilsHover video={video} />;
                        } else {
                          return <VideoOtherHover video={video} />;
                        }
                      })();

                      return (
                        <Route
                          key={video.id}
                          path={`/portfolio/${category.route}/${video.id}/${video.description}`}
                          element={videoComponent}
                        />
                      );
                    })
                  )}
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
