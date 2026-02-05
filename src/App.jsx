// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import { TrendingUp, Activity, DollarSign } from "lucide-react";

function App() {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  // Tambahkan state baru untuk data grafik
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m"); // Gunakan stream kline/candlestick

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const kline = data.k;

      const formattedData = {
        time: kline.t / 1000, // Binance memberikan milidetik, library butuh detik
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      setPrice(formattedData.close.toFixed(2));
      setChartData(formattedData);
    };

    return () => ws.close();
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
        {/* Card Slot untuk Chart */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 md:col-span-2 shadow-xl">
          <h2 className="text-slate-400 mb-4 font-medium">BTC/USDT 1m Chart</h2>
          <PriceChart data={chartData} />
        </div>
      </main>
    </div>
  );
}

export default App;
