import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Error from './pages/error';
import Profil from './pages/Profil';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/user/:id' element={<Profil/>}/>
        <Route path="*" element={<Error />} />
        


      </Routes>
    </Router>
  </React.StrictMode>
);


