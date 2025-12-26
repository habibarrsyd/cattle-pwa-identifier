import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import Identify from './pages/Identify'
import Result from './pages/Result'
import History from './pages/History'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (username) => {
    const user = { username, loginTime: new Date().toISOString() }
    localStorage.setItem('currentUser', JSON.stringify(user))
    setCurrentUser(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/" replace /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Home user={currentUser} onLogout={handleLogout} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/identify" 
          element={
            isAuthenticated ? 
            <Identify user={currentUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/result" 
          element={
            isAuthenticated ? 
            <Result user={currentUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/history" 
          element={
            isAuthenticated ? 
            <History user={currentUser} /> : 
            <Navigate to="/login" replace />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
