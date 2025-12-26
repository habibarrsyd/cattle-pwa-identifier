import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Username dan password harus diisi')
      return
    }

    // Simple validation - in production, this would be API call
    if (password.length < 4) {
      setError('Password minimal 4 karakter')
      return
    }

    onLogin(username)
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <div className="logo">🐄</div>
            <h1>Identifikasi Sapi</h1>
            <p>Aplikasi untuk Peternak Konvensional</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="label">Username</label>
              <input
                type="text"
                id="username"
                className="input"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError('')
                }}
                placeholder="Masukkan username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label">Password</label>
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Masukkan password"
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn btn-primary btn-full">
              Masuk
            </button>
          </form>

          <div className="login-footer">
            <p>PWA untuk kemudahan identifikasi ternak</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
