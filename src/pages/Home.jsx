import { useNavigate } from 'react-router-dom'
import { Camera, History as HistoryIcon, LogOut, Beef } from 'lucide-react'
import './Home.css'

function Home({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <div className="header">
        <div className="container">
          <div className="logo">
            <Beef size={28} />
            <h1>Sapi ID</h1>
          </div>
          <div className="user-info">
            <span>Halo, {user.username}</span>
            <button onClick={onLogout} className="btn-logout">
              <LogOut size={18} />
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="welcome-card">
          <h2>Selamat Datang di Aplikasi Identifikasi Sapi</h2>
          <p>Aplikasi untuk membantu peternak mengidentifikasi dan mengelola data ternak sapi</p>
        </div>

        <div className="menu-grid">
          <button
            className="menu-card menu-primary"
            onClick={() => navigate('/identify')}
          >
            <div className="menu-icon">
              <Camera size={40} />
            </div>
            <h3>Identifikasi Sapi</h3>
            <p>Ambil atau upload foto sapi untuk identifikasi</p>
          </button>

          <button
            className="menu-card menu-secondary"
            onClick={() => navigate('/history')}
          >
            <div className="menu-icon">
              <HistoryIcon size={40} />
            </div>
            <h3>Riwayat Aktivitas</h3>
            <p>Lihat riwayat identifikasi dan update data</p>
          </button>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h4>Cara Menggunakan:</h4>
            <ol>
              <li>Klik "Identifikasi Sapi" untuk mulai</li>
              <li>Ambil foto atau upload gambar sapi</li>
              <li>Sistem akan mengidentifikasi sapi</li>
              <li>Lihat hasil dan update data jika perlu</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
