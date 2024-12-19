import React from "react";
import "./App.css";
import Header from "./Component/Header/Header";
import Home from "./Pages/Home/Home";
import SplitBackground from "./Component/SplitBackground/SplitBackground";

function App() {
  return (
    <>
      <SplitBackground />
      <div className="App">
        <Header />
        <Home />
      </div>
    </>
  );
}

export default App;
