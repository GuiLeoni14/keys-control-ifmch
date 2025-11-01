'use client';

import { useRouter } from 'next/navigation';
import { Lock, Unlock, ArrowLeft, Clock } from 'lucide-react';

const sampleHistory = [
  { action: 'Retirada', lab: 'Lab. Informática', date: '2024-11-01', time: '14:30', icon: '💻' },
  { action: 'Devolução', lab: 'Lab. Eletrônica', date: '2024-10-31', time: '16:45', icon: '⚡' },
  { action: 'Retirada', lab: 'Lab. Física', date: '2024-10-31', time: '09:15', icon: '🔬' },
];

export default function History() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-6 py-6 shadow-2xl sticky top-0 z-20 animate-slideInDown">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition transform hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <Clock size={28} />
              Histórico
            </h1>
            <p className="text-green-100 text-sm">Suas movimentações recentes</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-20">
        <div className="space-y-4">
          {sampleHistory.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl animate-fadeInUp"
              style={{animationDelay: `${(idx + 1) * 0.1}s`}}
            >
              <div className={`absolute inset-0 ${item.action === 'Retirada' ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20' : 'bg-gradient-to-r from-red-600/20 to-orange-600/20'} group-hover:opacity-80 transition`}></div>
              <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border-l-4 ${item.action === 'Retirada' ? 'border-green-600' : 'border-red-600'} p-6 flex items-start gap-4`}>
                <div className={`p-3 rounded-xl ${item.action === 'Retirada' ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
                  {item.action === 'Retirada' ? (
                    <Unlock className={item.action === 'Retirada' ? 'text-green-400' : 'text-red-400'} size={24} />
                  ) : (
                    <Lock className={item.action === 'Retirada' ? 'text-green-400' : 'text-red-400'} size={24} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-bold text-white">{item.lab}</h3>
                      </div>
                      <p className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${item.action === 'Retirada' ? 'bg-green-600/30 text-green-200' : 'bg-red-600/30 text-red-200'}`}>
                        {item.action}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{item.date} às {item.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}