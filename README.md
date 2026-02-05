
# 🚀 Crypto Pulse Dashboard

Dashboard pemantauan harga Cryptocurrency secara *real-time* yang dibangun dengan teknologi web terbaru. Proyek ini mendemonstrasikan integrasi data *live stream* menggunakan WebSocket untuk memberikan pembaruan harga instan tanpa perlu memuat ulang halaman.

## ✨ Fitur Utama

* **Live Price Streaming**: Pembaruan harga instan menggunakan Binance WebSocket API (`@kline_1m`).
* **Real-time Candlestick Chart**: Visualisasi pergerakan harga yang interaktif menggunakan `lightweight-charts`.
* **Multi-Asset Support**: Beralih dengan mudah antara Bitcoin (BTC), Ethereum (ETH), dan Solana (SOL).
* **24h Statistics**: Menampilkan data harga tertinggi (High) dan terendah (Low) dalam siklus kline yang aktif.
* **Responsive Design**: Antarmuka modern yang dibangun dengan Tailwind CSS v4.

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
* **Charts**: [Lightweight Charts v5](https://tradingview.github.io/lightweight-charts/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Data Source**: [Binance WebSocket API](https://www.google.com/search?q=https://binance-docs.github.io/apidocs/spot/en/%23websocket-market-streams)

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone Repository**
```bash
git clone [https://github.com/USERNAME/crypto-dashboard.git](https://github.com/USERNAME/crypto-dashboard.git)
cd crypto-dashboard

```

2. **Instal Dependensi**
Pastikan Anda menginstal paket `@tailwindcss/postcss` untuk mendukung Tailwind v4.

```bash
npm install

```

3. **Jalankan Development Server**

```bash
npm run dev

```

4. **Build untuk Produksi**

```bash
npm run build

```

## 📂 Struktur Proyek

```text
src/
├── assets/             # Aset statis (gambar/ikon)
├── components/         # Komponen UI (PriceChart, dll)
├── App.jsx             # Logika utama & integrasi WebSocket
├── main.jsx            # Entry point aplikasi
└── index.css           # Konfigurasi global Tailwind v4

```

## 📝 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan portofolio. Bebas digunakan dan dimodifikasi.

```
