import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Actuacion from "./pages/Actuacion";
import Actuaciones from "./pages/Actuaciones";

export default function App () {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} key={1} />
        <Route path="/about" element={<AboutPage />} key={2}/>
        <Route path="/actuaciones" element={<Actuaciones />} key={3}/>
        <Route path="/actuaciones/:id" element={<Actuacion />} key={4} />
        <Route path="*" element={<NotFoundPage />} key={6}/>
      </Routes>
    </BrowserRouter>
  );
}
