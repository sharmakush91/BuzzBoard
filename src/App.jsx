import { Header } from "./components/Header/Header";
import { Postlist } from "./features/posts/Postlist";
import { Popular } from "./components/Header/Popular";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Postlist />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </div>
  );
}

export default App;
