# PWA Cattle Identification App 🐄

Progressive Web App untuk identifikasi sapi, dirancang untuk peternak konvensional dengan UI ramah seluler.

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Buka browser di `http://localhost:5173`

### Build Production
```bash
npm run build
npm run preview
```

## ✨ Fitur

- ✅ **Autentikasi Pengguna**: Login system
- 📸 **Identifikasi Sapi**: Ambil foto dengan kamera atau upload dari galeri
- 📊 **Tampilan Hasil**: Lihat informasi sapi yang teridentifikasi
- ✏️ **Update Data**: Perbarui kondisi kesehatan dan data sapi
- 📜 **Riwayat Aktivitas**: Track semua identifikasi dan update
- 📱 **PWA Support**: Install sebagai aplikasi mobile
- 🎨 **Mobile-First UI**: Elemen besar untuk kemudahan penggunaan

## 🛠️ Tech Stack

- React 18 + Vite
- React Router DOM v6
- Vite Plugin PWA (Workbox)
- LocalStorage (temporary, untuk demo)

## 📱 Cara Penggunaan

1. **Login** dengan username dan password (minimal 4 karakter)
2. Pilih **"Identifikasi Sapi"** dari dashboard
3. **Ambil foto** atau **upload gambar** sapi
4. Sistem akan **mengidentifikasi** sapi
5. **Lihat hasil** dan **update data** jika perlu
6. **Cek riwayat** untuk melihat aktivitas sebelumnya

## 📁 Struktur Folder

```
src/
├── pages/
│   ├── Login.jsx       # Halaman login
│   ├── Home.jsx        # Dashboard
│   ├── Identify.jsx    # Kamera/upload
│   ├── Result.jsx      # Hasil & update
│   └── History.jsx     # Riwayat
├── App.jsx             # Router & auth
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## 🔮 Future Development

- Integrasi ML Model untuk identifikasi
- Backend API & Database  
- Cloud storage untuk gambar
- Real-time sync
- Offline mode improvements

## 📝 Development Notes

Fokus saat ini pada pembangunan UI/UX yang ramah untuk peternak konvensional. Integrasi model ML dan database akan diimplementasikan di fase berikutnya.

---
Dibuat untuk membantu peternak konvensional mengelola ternak dengan mudah! 🐄

