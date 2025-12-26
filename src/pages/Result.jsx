import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ClipboardList, FileText, Edit, Save, X, ArrowLeft, History, ScanLine } from 'lucide-react'
import './Result.css'

function Result({ user }) {
  const [result, setResult] = useState(null)
  const [cattleData, setCattleData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    weight: '',
    healthStatus: '',
    lastCheckup: '',
    notes: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Load result from localStorage
    const savedResult = localStorage.getItem('lastResult')
    if (savedResult) {
      const parsed = JSON.parse(savedResult)
      setResult(parsed)

      // Simulate loading cattle data from database
      // In production, this would be an API call
      setCattleData({
        id: parsed.cattleId,
        breed: 'Sapi Limosin',
        age: '2 tahun',
        weight: '450 kg',
        healthStatus: 'Sehat',
        lastCheckup: new Date().toLocaleDateString('id-ID'),
        owner: 'Bapak Sutrisno',
        location: 'Kandang A-12',
        notes: 'Kondisi baik, nafsu makan normal'
      })

      setFormData({
        weight: '450 kg',
        healthStatus: 'Sehat',
        lastCheckup: new Date().toISOString().split('T')[0],
        notes: 'Kondisi baik, nafsu makan normal'
      })
    } else {
      navigate('/identify')
    }
  }, [navigate])

  const handleUpdate = () => {
    // Simulate updating database
    const updatedData = {
      ...cattleData,
      weight: formData.weight,
      healthStatus: formData.healthStatus,
      lastCheckup: new Date(formData.lastCheckup).toLocaleDateString('id-ID'),
      notes: formData.notes
    }

    setCattleData(updatedData)

    // Add to history
    const history = JSON.parse(localStorage.getItem('history') || '[]')
    const updateEntry = {
      cattleId: result.cattleId,
      action: 'Update Data',
      timestamp: new Date().toISOString(),
      user: user.username,
      changes: formData
    }
    history.unshift(updateEntry)
    localStorage.setItem('history', JSON.stringify(history))

    setIsEditing(false)
    alert('Data berhasil diperbarui!')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (!result || !cattleData) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="result-page">
      <div className="header">
        <div className="container">
          <button onClick={() => navigate('/')} className="btn-back">
            <ArrowLeft size={20} />
            Kembali
          </button>
          <h1>Hasil Identifikasi</h1>
        </div>
      </div>

      <div className="container">
        <div className="result-container">
          {/* Success Badge */}
          <div className="success-badge">
            <div className="badge-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Identifikasi Berhasil!</h2>
            <p>Sapi telah teridentifikasi dalam sistem</p>
          </div>

          {/* Image Preview */}
          <div className="result-image">
            <img src={result.image} alt="Sapi" />
          </div>

          {/* Cattle Information */}
          <div className="info-card">
            <h3><ClipboardList size={20} /> Informasi Sapi</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">ID Sapi:</span>
                <span className="value">{cattleData.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Jenis:</span>
                <span className="value">{cattleData.breed}</span>
              </div>
              <div className="info-item">
                <span className="label">Umur:</span>
                <span className="value">{cattleData.age}</span>
              </div>
              <div className="info-item">
                <span className="label">Pemilik:</span>
                <span className="value">{cattleData.owner}</span>
              </div>
              <div className="info-item">
                <span className="label">Lokasi:</span>
                <span className="value">{cattleData.location}</span>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="update-card">
            <div className="card-header">
              <h3><FileText size={20} /> Data Kondisi Sapi</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-edit"
                >
                  <Edit size={16} />
                  Edit
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Berat:</span>
                  <span className="value">{cattleData.weight}</span>
                </div>
                <div className="info-item">
                  <span className="label">Status Kesehatan:</span>
                  <span className="value status-healthy">{cattleData.healthStatus}</span>
                </div>
                <div className="info-item">
                  <span className="label">Terakhir Diperiksa:</span>
                  <span className="value">{cattleData.lastCheckup}</span>
                </div>
                <div className="info-item full-width">
                  <span className="label">Catatan:</span>
                  <span className="value">{cattleData.notes}</span>
                </div>
              </div>
            ) : (
              <form className="update-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="form-group">
                  <label>Berat Sapi</label>
                  <input
                    type="text"
                    name="weight"
                    className="input"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Contoh: 450 kg"
                  />
                </div>

                <div className="form-group">
                  <label>Status Kesehatan</label>
                  <select
                    name="healthStatus"
                    className="input"
                    value={formData.healthStatus}
                    onChange={handleChange}
                  >
                    <option value="Sehat">Sehat</option>
                    <option value="Sakit Ringan">Sakit Ringan</option>
                    <option value="Sakit Berat">Sakit Berat</option>
                    <option value="Dalam Perawatan">Dalam Perawatan</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tanggal Pemeriksaan</label>
                  <input
                    type="date"
                    name="lastCheckup"
                    className="input"
                    value={formData.lastCheckup}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Catatan</label>
                  <textarea
                    name="notes"
                    className="input textarea"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tambahkan catatan kondisi sapi..."
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-secondary"
                  >
                    <X size={18} />
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <Save size={18} />
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              onClick={() => navigate('/identify')}
              className="btn btn-secondary btn-full"
            >
              <ScanLine size={20} />
              Identifikasi Lagi
            </button>
            <button
              onClick={() => navigate('/history')}
              className="btn btn-outline btn-full"
            >
              <History size={20} />
              Lihat Riwayat
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
