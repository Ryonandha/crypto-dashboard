// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import { TrendingUp, Activity, DollarSign } from "lucide-react";

function App() {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

  useEffect(() => {
    // Membuka koneksi ke Binance WebSocket
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const newPrice = parseFloat(data.p).toFixed(2);

      setPrice((prev) => {
        setPrevPrice(prev); // Simpan harga lama untuk efek warna (naik/turun)
        return newPrice;
      });
    };

    return () => ws.close(); // Tutup koneksi saat komponen tidak dipakai
  }, []);

  // Menentukan warna berdasarkan pergerakan harga
  const priceColor = price >= prevPrice ? "text-green-400" : "text-red-400";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="text-blue-500" /> Crypto Pulse Dashboard
        </h1>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Harga Utama */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 font-medium text-sm">BTC / USDT</span>
            <DollarSign size={20} className="text-slate-500" />
          </div>
          <div className={`text-4xl font-mono font-bold transition-colors duration-300 ${priceColor}`}>${price}</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <TrendingUp size={14} />
            <span>Live updates via Binance Stream</span>
          </div>
        </div>

        {/* Card Slot untuk Fitur Lain (Misal: RSI atau Sentiment) */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 md:col-span-2">
          <p className="text-slate-400">Chart Area (Akan kita tambahkan selanjutnya)</p>
        </div>
      </main>
    </div>
  );
}

export default App;
