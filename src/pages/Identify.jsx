import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Identify.css'

function Identify({ user }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [useCamera, setUseCamera] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const navigate = useNavigate()

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setUseCamera(true)
      }
    } catch (err) {
      alert('Tidak dapat mengakses kamera: ' + err.message)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
      videoRef.current.srcObject = null
      setUseCamera(false)
    }
  }

  const capturePhoto = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    
    if (video && canvas) {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' })
        setSelectedImage(file)
        setImagePreview(canvas.toDataURL())
        stopCamera()
      }, 'image/jpeg')
    }
  }

  const handleIdentify = async () => {
    if (!selectedImage) {
      alert('Pilih atau ambil foto terlebih dahulu')
      return
    }

    setIsProcessing(true)
    
    // Simulate processing - in production, this would be API call to model
    setTimeout(() => {
      // Save to localStorage for demonstration
      const result = {
        cattleId: 'SP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        image: imagePreview,
        timestamp: new Date().toISOString(),
        user: user.username,
        status: 'Identified'
      }
      
      localStorage.setItem('lastResult', JSON.stringify(result))
      
      // Add to history
      const history = JSON.parse(localStorage.getItem('history') || '[]')
      history.unshift(result)
      localStorage.setItem('history', JSON.stringify(history))
      
      setIsProcessing(false)
      navigate('/result')
    }, 2000)
  }

  const handleReset = () => {
    setSelectedImage(null)
    setImagePreview(null)
    stopCamera()
  }

  return (
    <div className="identify-page">
      <div className="header">
        <div className="container">
          <button onClick={() => navigate('/')} className="btn-back">← Kembali</button>
          <h1>Identifikasi Sapi</h1>
        </div>
      </div>

      <div className="container">
        <div className="identify-container">
          {!imagePreview && !useCamera && (
            <div className="upload-section">
              <div className="upload-options">
                <button 
                  className="btn btn-primary btn-large btn-full"
                  onClick={startCamera}
                >
                  <span className="btn-icon">📷</span>
                  Ambil Foto dengan Kamera
                </button>

                <div className="divider">
                  <span>atau</span>
                </div>

                <button 
                  className="btn btn-secondary btn-large btn-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="btn-icon">🖼️</span>
                  Upload Foto dari Galeri
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="info-box">
                <p>📌 Tips untuk hasil terbaik:</p>
                <ul>
                  <li>Pastikan pencahayaan cukup</li>
                  <li>Foto dari jarak yang jelas</li>
                  <li>Ambil dari sisi samping sapi</li>
                </ul>
              </div>
            </div>
          )}

          {useCamera && (
            <div className="camera-section">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="camera-preview"
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
              
              <div className="camera-controls">
                <button 
                  className="btn btn-danger btn-large"
                  onClick={stopCamera}
                >
                  Batal
                </button>
                <button 
                  className="btn btn-success btn-large"
                  onClick={capturePhoto}
                >
                  📸 Ambil Foto
                </button>
              </div>
            </div>
          )}

          {imagePreview && !isProcessing && (
            <div className="preview-section">
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>

              <div className="preview-controls">
                <button 
                  className="btn btn-secondary btn-large"
                  onClick={handleReset}
                >
                  Foto Ulang
                </button>
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleIdentify}
                >
                  Identifikasi Sekarang
                </button>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="processing-section">
              <div className="spinner"></div>
              <h3>Memproses Gambar...</h3>
              <p>Mohon tunggu, sistem sedang mengidentifikasi sapi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Identify
