import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/task" 
          element={
            <PrivateRoute>
              <TasksPage/>
             
            </PrivateRoute>
          } 
        />

        
      </Routes>
  );
}

export default App
