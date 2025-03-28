import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inscription from "./components/Inscription.jsx";
import Login from "./components/Login.jsx";
import CreateCompte from './components/CreateCompte.jsx';
import EmailVerif from "./components/EmailVerif.jsx";
import CreatePassword from './components/CreatePassword.jsx';
import Profile from './components/ProfilePage.jsx';
import MainPage from "./components/MainPage.jsx";


function App() {
  return (
    <Router> 
      <Routes> 
      <Route path="/" element={<Inscription />} />
      <Route path="/login" element={<Login />} />
        <Route path="/CreateCompte" element={<CreateCompte />} /> 
        <Route path="/EmailVerif" element={<EmailVerif />} /> 
        <Route path="/CreatePassword" element={<CreatePassword />} /> 
         <Route path="/ProfilePage" element={<Profile />} />
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;