import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import WinnersPage from "./pages/WinnersPage";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/winners" element={<WinnersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
