import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { getAnalyticsData, getLast7Days } from '../../utils/analytics';
import {
  FiUsers, FiMail, FiFileText, FiEye,
  FiExternalLink, FiMessageCircle, FiInstagram,
} from 'react-icons/fi';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';

export default function Dashboard() {
  const { messages, blogPosts, testimonials, products } = useData();
  const [analytics, setAnalytics] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setAnalytics(getAnalyticsData());
    setChartData(getLast7Days());
  }, []);

  if (!analytics) return null;

  const stats = [
    { label: 'Total Pengunjung', value: analytics.totalVisits.toLocaleString(), icon: FiEye, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Dari Google', value: analytics.googleReferrals.toLocaleString(), icon: FiExternalLink, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Klik WhatsApp', value: (analytics.clicks?.whatsapp || 0).toLocaleString(), icon: FaWhatsapp, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Klik Instagram', value: (analytics.clicks?.instagram || 0).toLocaleString(), icon: FiInstagram, color: 'text-pink-400', bg: 'bg-pink-400/10' },
    { label: 'Klik TikTok', value: (analytics.clicks?.tiktok || 0).toLocaleString(), icon: FaTiktok, color: 'text-white', bg: 'bg-white/10' },
    { label: 'Klik sadux.my.id', value: (analytics.clicks?.sadux || 0).toLocaleString(), icon: FiExternalLink, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
    { label: 'Klik Google Maps', value: (analytics.clicks?.googlemaps || 0).toLocaleString(), icon: FiExternalLink, color: 'text-red-400', bg: 'bg-red-400/10' },
  ];

  const siteStats = [
    { label: 'Total Produk', value: products.length, icon: FiFileText, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pesan Masuk', value: messages.length, icon: FiMail, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Artikel Blog', value: blogPosts.length, icon: FiFileText, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Testimoni', value: testimonials.length, icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  const maxVisit = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="space-y-6">
      {/* Analytics Stats */}
      <div>
        <h3 className="text-white font-heading font-semibold mb-3 flex items-center gap-2">
          <FiEye className="w-4 h-4 text-purple-400" />
          Statistik Pengunjung & Klik
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-2xl bg-dark-card border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="rounded-2xl bg-dark-card border border-white/5 p-5">
        <h3 className="text-white font-heading font-semibold mb-4">Pengunjung 7 Hari Terakhir</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {chartData.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">{day.count}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-purple-600/80 to-purple-400/40 transition-all duration-500"
                style={{
                  height: `${Math.max((day.count / maxVisit) * 100, 4)}%`,
                  minHeight: '4px',
                }}
              />
              <span className="text-[10px] text-gray-500 whitespace-nowrap">{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Site Content Stats */}
      <div>
        <h3 className="text-white font-heading font-semibold mb-3 flex items-center gap-2">
          <FiMessageCircle className="w-4 h-4 text-green-400" />
          Konten Website
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {siteStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-2xl bg-dark-card border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Messages */}
      <div className="rounded-2xl bg-dark-card border border-white/5 p-5">
        <h3 className="text-white font-heading font-semibold mb-4">Pesan Terbaru</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada pesan masuk.</p>
        ) : (
          <div className="space-y-3">
            {messages.slice(-5).reverse().map((msg) => (
              <div key={msg.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{msg.name}</span>
                  <span className="text-gray-600 text-xs">
                    {new Date(msg.date).toLocaleDateString('id-ID')}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{msg.message?.substring(0, 100)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
