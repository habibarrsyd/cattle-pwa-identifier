import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, ClipboardList, ScanLine, Edit2, Beef, Clock } from 'lucide-react'
import './History.css'

function History({ user }) {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('history') || '[]')
    setHistory(savedHistory)
  }, [])

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true
    if (filter === 'identify') return item.status === 'Identified'
    if (filter === 'update') return item.action === 'Update Data'
    return true
  })

  const clearHistory = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
      localStorage.setItem('history', JSON.stringify([]))
      setHistory([])
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="history-page">
      <div className="header">
        <div className="container">
          <button onClick={() => navigate('/')} className="btn-back">← Kembali</button>
          <h1>Riwayat Aktivitas</h1>
        </div>
      </div>

      <div className="container">
        <div className="history-container">
          {/* Filter Section */}
          <div className="filter-section">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Semua ({history.length})
              </button>
              <button
                className={`filter-btn ${filter === 'identify' ? 'active' : ''}`}
                onClick={() => setFilter('identify')}
              >
                Identifikasi ({history.filter(h => h.status === 'Identified').length})
              </button>
              <button
                className={`filter-btn ${filter === 'update' ? 'active' : ''}`}
                onClick={() => setFilter('update')}
              >
                Update ({history.filter(h => h.action === 'Update Data').length})
              </button>
            </div>

            {history.length > 0 && (
              <button onClick={clearHistory} className="btn-clear">
                <Trash2 size={16} />
                Hapus Semua
              </button>
            )}
          </div>

          {/* History List */}
          {filteredHistory.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <ClipboardList size={64} />
              </div>
              <h3>Belum Ada Riwayat</h3>
              <p>Riwayat aktivitas Anda akan muncul di sini</p>
              <button
                onClick={() => navigate('/identify')}
                className="btn btn-primary"
              >
                Mulai Identifikasi
              </button>
            </div>
          ) : (
            <div className="history-list">
              {filteredHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="item-header">
                    <div className="item-title">
                      {item.status === 'Identified' ? (
                        <>
                          <ScanLine size={18} className="icon" />
                          <span>Identifikasi Sapi</span>
                        </>
                      ) : (
                        <>
                          <Edit2 size={18} className="icon" />
                          <span>Update Data</span>
                        </>
                      )}
                    </div>
                    <span className="item-time">{formatDate(item.timestamp)}</span>
                  </div>

                  <div className="item-body">
                    <div className="item-info">
                      <span className="label">ID Sapi:</span>
                      <span className="value">{item.cattleId}</span>
                    </div>
                    <div className="item-info">
                      <span className="label">Pengguna:</span>
                      <span className="value">{item.user}</span>
                    </div>

                    {item.status === 'Identified' && item.image && (
                      <div className="item-image">
                        <img src={item.image} alt="Sapi" />
                      </div>
                    )}

                    {item.action === 'Update Data' && item.changes && (
                      <div className="item-changes">
                        <p className="changes-label">Perubahan:</p>
                        <ul>
                          {item.changes.weight && <li>Berat: {item.changes.weight}</li>}
                          {item.changes.healthStatus && <li>Status: {item.changes.healthStatus}</li>}
                          {item.changes.notes && <li>Catatan: {item.changes.notes}</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default History
