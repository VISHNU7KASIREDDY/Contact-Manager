import React from "react";
import { HashRouter as Router, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import ContactList from "./pages/ContactList";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<ContactList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
