import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiTrash2, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

export default function RunningTextManager() {
  const { runningTexts, setRunningTexts } = useData();
  const [newText, setNewText] = useState('');

  const addText = () => {
    if (!newText.trim()) return;
    setRunningTexts([...runningTexts, { id: Date.now(), text: newText.trim(), active: true }]);
    setNewText('');
  };

  const toggleActive = (id) => {
    setRunningTexts(runningTexts.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
  };

  const deleteText = (id) => {
    setRunningTexts(runningTexts.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="flex gap-3">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Tambah teks baru..."
          onKeyDown={(e) => e.key === 'Enter' && addText()}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary outline-none text-sm"
        />
        <button onClick={addText} className="btn-primary !py-2 !px-4 flex items-center gap-2">
          <FiPlus className="w-4 h-4" /> Tambah
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {runningTexts.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              item.active ? 'bg-dark-card border-white/10' : 'bg-dark-card/50 border-white/5 opacity-60'
            }`}
          >
            <span className="text-white text-sm flex-1 mr-4">{item.text}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleActive(item.id)}
                className={`p-2 rounded-lg transition-colors ${
                  item.active ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-500 hover:bg-white/5'
                }`}
                title={item.active ? 'Aktif' : 'Nonaktif'}
              >
                {item.active ? <FiToggleRight className="w-5 h-5" /> : <FiToggleLeft className="w-5 h-5" />}
              </button>
              <button
                onClick={() => deleteText(item.id)}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
