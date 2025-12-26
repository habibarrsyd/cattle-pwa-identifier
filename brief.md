# Gemini Workspace

## Ringkasan Proyek

Proyek ini adalah Progressive Web App (PWA) yang dirancang untuk peternak konvensional, dengan antarmuka yang ramah seluler dan elemen UI yang besar untuk kemudahan penggunaan. Aplikasi ini akan memungkinkan pengguna untuk mengidentifikasi sapi dengan mengambil atau mengunggah foto.

## Fitur Utama

*   **Autentikasi Pengguna:** Pengguna dapat masuk ke dalam aplikasi.
*   **Pengenalan Sapi Melalui Gambar:** Pengguna dapat mengambil foto secara langsung atau mengunggah foto sapi untuk diidentifikasi.
*   **Integrasi Model:** Aplikasi akan memproses gambar menggunakan model yang telah dibuat sebelumnya untuk mengidentifikasi sapi dan mengambil datanya dari database.
*   **Tampilan Hasil:** Hasil identifikasi (ID sapi dan informasi dari database) akan ditampilkan di halaman baru atau pop-up.
*   **Pembaruan Data:** Pengguna dapat memperbarui kondisi sapi di database melalui aplikasi.
*   **Riwayat Aktivitas:** Aplikasi akan melacak dan menyimpan riwayat aktivitas yang dilakukan oleh setiap pengguna.

## Fokus Pengembangan

Fokus awal adalah pada pembangunan antarmuka pengguna (UI). Integrasi model dan database akan diimplementasikan kemudian.

## Membangun dan Menjalankan

### Install Dependencies
```bash
npm install
```

### Menjalankan Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Struktur Proyek
```
pwa-moving/
├── public/              # Static assets
├── src/
│   ├── pages/          # Halaman aplikasi
│   │   ├── Login.jsx   # Halaman login
│   │   ├── Home.jsx    # Dashboard utama
│   │   ├── Identify.jsx # Identifikasi sapi
│   │   ├── Result.jsx  # Hasil & update data
│   │   └── History.jsx # Riwayat aktivitas
│   ├── App.jsx         # Router & auth logic
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── vite.config.js      # Vite & PWA config
└── package.json
```

### Cara Menggunakan Aplikasi

1. **Login**: Masukkan username dan password (minimal 4 karakter)
2. **Dashboard**: Pilih menu untuk identifikasi atau lihat riwayat
3. **Identifikasi**: 
   - Ambil foto dengan kamera, atau
   - Upload foto dari galeri
   - Klik "Identifikasi Sekarang"
4. **Hasil**: Lihat data sapi dan update kondisinya jika perlu
5. **Riwayat**: Lihat semua aktivitas identifikasi dan update

## Konvensi Pengembangan

### Stack Teknologi
- **Framework**: React 18 dengan Vite
- **Routing**: React Router DOM v6
- **PWA**: Vite Plugin PWA dengan Workbox
- **Styling**: CSS Modules (vanilla CSS)
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: LocalStorage untuk demo (akan diganti dengan API)

### Gaya Pengkodean
- Gunakan functional components dengan Hooks
- File JSX untuk components, CSS terpisah untuk styling
- Naming: PascalCase untuk components, camelCase untuk functions
- Mobile-first responsive design
- Touch-friendly UI elements (min 44px tap targets)

### Fitur PWA
- ✅ Service Worker untuk offline support
- ✅ Web App Manifest untuk installable app
- ✅ Responsive design untuk semua ukuran layar
- ✅ Camera API untuk akses kamera
- ✅ File upload support

### To-Do untuk Integrasi
- [ ] Integrasi dengan ML Model untuk identifikasi sapi
- [ ] Koneksi ke Backend API/Database
- [ ] Implementasi authentication yang proper
- [ ] Upload gambar ke cloud storage
- [ ] Real-time notifications
- [ ] Offline data sync