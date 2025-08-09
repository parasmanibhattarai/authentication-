import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import './App.css' 
import Home from './components/home'
import Login from './components/login'  
import Register from './components/register'
import { useState } from 'react'
import RefreshHandle from './RefreshHandler'


function App() {
  // Check if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  }


  return (
    <div>
      <RefreshHandle setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path="/home" element={<PrivateRoute element={<Home/>}/>} />
      <Route path="/" element={<Navigate to='/login'/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    
    </Routes>
    </div>
  )
}

export default App