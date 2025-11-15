import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import ListingPage from "./pages/ListingPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/list" element={<ListingPage />} />
      </Routes>
    </>
  );
}

export default App;
