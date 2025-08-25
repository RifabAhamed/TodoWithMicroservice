import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar"
import Signup from "../src/pages/Signup"
import Login from "../src/pages/Login"
import Notifications from "../src/pages/Notifications";
import Tasks from "../src/pages/Tasks"
import { AuthProvider } from './context/AuthContext';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
