import React, { useEffect, useState, useRef } from "react";
import { TrendingUp, Activity, DollarSign } from "lucide-react";
import PriceChart from "./components/PriceChart";

function App() {
  const [symbol, setSymbol] = useState("btcusdt");
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [stats, setStats] = useState({ h: 0, l: 0, v: 0 });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_1m`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const k = data.k;

      setPrice((prev) => {
        setPrevPrice(prev);
        return parseFloat(k.c).toFixed(2);
      });

      setStats({
        h: parseFloat(k.h).toFixed(2),
        l: parseFloat(k.l).toFixed(2),
        v: parseFloat(k.v).toFixed(2),
      });

      setChartData({
        time: k.t / 1000,
        open: parseFloat(k.o),
        high: parseFloat(k.h),
        low: parseFloat(k.l),
        close: parseFloat(k.c),
      });
    };

    return () => ws.close();
  }, [symbol]);

  const priceColor = price >= prevPrice ? "text-green-400" : "text-red-400";

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Activity className="text-blue-500" /> Crypto Pulse Dashboard
        </h1>
      </header>

      {/* 1. TAMBAHKAN: Navigasi Pemilih Aset */}
      <div className="flex gap-4 mb-6">
        {["btcusdt", "ethusdt", "solusdt"].map((coin) => (
          <button key={coin} onClick={() => setSymbol(coin)} className={`px-4 py-2 rounded-lg font-bold uppercase transition ${symbol === coin ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
            {coin.replace("usdt", "")}
          </button>
        ))}
      </div>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-400 font-medium text-sm uppercase">{symbol.replace("usdt", " / USDT")}</span>
            <DollarSign size={20} className="text-slate-500" />
          </div>
          <div className={`text-4xl font-mono font-bold transition-colors duration-300 ${priceColor}`}>${price}</div>

          {/* 2. TAMBAHKAN: Statistik 24 Jam */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-700">
            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">24h High</p>
              <p className="text-sm font-semibold text-green-400">${stats.h}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">24h Low</p>
              <p className="text-sm font-semibold text-red-400">${stats.l}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 italic">
            <TrendingUp size={14} />
            <span>Live updates via Binance Stream</span>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 md:col-span-2 shadow-xl">
          <h2 className="text-slate-400 mb-4 font-medium uppercase">{symbol.replace("usdt", "")} / USDT 1m Chart</h2>
          <PriceChart data={chartData} />
        </div>
      </main>
    </div>
  );
}

export default App;
