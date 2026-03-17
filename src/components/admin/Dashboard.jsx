import { useData } from '../../context/DataContext';
import { FiUsers, FiCalendar, FiMail, FiFileText, FiTrendingUp, FiEye } from 'react-icons/fi';

export default function Dashboard() {
  const { messages, blogPosts, testimonials, services } = useData();

  const stats = [
    { label: 'Total Layanan', value: services.length, icon: FiCalendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Pesan Masuk', value: messages.length, icon: FiMail, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Artikel Blog', value: blogPosts.length, icon: FiFileText, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Testimoni', value: testimonials.length, icon: FiUsers, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Pengunjung (dummy)', value: '1,234', icon: FiEye, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Booking (dummy)', value: '56', icon: FiTrendingUp, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  ];

  return (
    <div className="space-y-6">
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
