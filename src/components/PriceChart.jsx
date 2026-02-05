// src/components/PriceChart.jsx
import React, { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts"; // Import CandlestickSeries

const PriceChart = ({ data }) => {
  const chartContainerRef = useRef();
  const seriesRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: { background: { color: "#1e293b" }, textColor: "#94a3b8" },
      grid: { vertLines: { color: "#334155" }, horzLines: { color: "#334155" } },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    // PERBAIKAN DI SINI: Gunakan addSeries dengan CandlestickSeries
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#4ade80",
      downColor: "#f87171",
      borderVisible: false,
      wickUpColor: "#4ade80",
      wickDownColor: "#f87171",
    });

    seriesRef.current = candleSeries;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && data) {
      seriesRef.current.update(data);
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
};

export default PriceChart;
