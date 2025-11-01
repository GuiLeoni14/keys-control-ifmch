'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Zap, BookOpen } from 'lucide-react';

const labs = [
  { id: 1, name: 'Lab. Informática', floor: '2º Andar', icon: '💻', color: 'from-blue-600 to-blue-700' },
  { id: 2, name: 'Lab. Eletrônica', floor: '2º Andar', icon: '⚡', color: 'from-yellow-600 to-yellow-700' },
  { id: 3, name: 'Lab. Física', floor: '1º Andar', icon: '🔬', color: 'from-purple-600 to-purple-700' },
  { id: 4, name: 'Lab. Química', floor: '1º Andar', icon: '🧪', color: 'from-green-600 to-emerald-700' },
  { id: 5, name: 'Lab. Mecânica', floor: '3º Andar', icon: '⚙️', color: 'from-orange-600 to-red-700' },
];

export default function Withdrawal() {
  const router = useRouter();

  const handleWithdrawal = (labName: string) => {
    alert(`✅ Solicitação enviada para: ${labName}\n\nAguardando liberação do Arduino...`);
    router.push('/dashboard');
  };

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
              <Zap size={28} />
              Retirar Chaves
            </h1>
            <p className="text-green-100 text-sm">Escolha um laboratório</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-20">
        {/* Alert */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-600/50 rounded-2xl p-5 mb-8 flex gap-3 animate-fadeInUp">
          <AlertCircle className="text-blue-400 flex-shrink-0" size={20} />
          <p className="text-blue-300 text-sm leading-relaxed">
            Selecione um laboratório para solicitar a liberação da caixa de chaves. O sistema Arduino fará a liberação automática.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="space-y-4">
          {labs.map((lab, idx) => (
            <button
              key={lab.id}
              onClick={() => handleWithdrawal(lab.name)}
              className="w-full group relative overflow-hidden rounded-2xl animate-fadeInUp transform hover:scale-105 active:scale-95 transition-all duration-300"
              style={{animationDelay: `${(idx + 1) * 0.08}s`}}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-20 group-hover:opacity-30 transition`}></div>
              <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 ${lab.color === 'from-blue-600 to-blue-700' ? 'border-blue-600 group-hover:border-blue-500' : lab.color === 'from-yellow-600 to-yellow-700' ? 'border-yellow-600 group-hover:border-yellow-500' : lab.color === 'from-purple-600 to-purple-700' ? 'border-purple-600 group-hover:border-purple-500' : lab.color === 'from-green-600 to-emerald-700' ? 'border-green-600 group-hover:border-green-500' : 'border-orange-600 group-hover:border-orange-500'} transition p-5 flex items-center gap-4`}>
                <div className="text-4xl">{lab.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-white group-hover:text-gray-100 transition">{lab.name}</h3>
                  <p className="text-gray-400 text-sm flex items-center gap-1">
                    <BookOpen size={14} />
                    {lab.floor}
                  </p>
                </div>
                <div className="text-2xl group-hover:translate-x-2 transition transform">→</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}