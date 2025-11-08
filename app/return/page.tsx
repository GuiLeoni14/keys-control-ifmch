'use client';

import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, Zap, BookOpen, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const labs = [
  { id: 1, name: 'Lab. Informática', floor: '2º Andar', icon: '💻', color: 'from-blue-600 to-blue-700' },
  { id: 2, name: 'Lab. Eletrônica', floor: '2º Andar', icon: '⚡', color: 'from-yellow-600 to-yellow-700' },
  { id: 3, name: 'Lab. Física', floor: '1º Andar', icon: '🔬', color: 'from-purple-600 to-purple-700' },
  { id: 4, name: 'Lab. Química', floor: '1º Andar', icon: '🧪', color: 'from-green-600 to-emerald-700' },
  { id: 5, name: 'Lab. Mecânica', floor: '3º Andar', icon: '⚙️', color: 'from-orange-600 to-red-700' },
];

export default function Return() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingLabId, setLoadingLabId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string; labName: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string, labName: string) => {
    setToast({ type, message, labName });
    
    if (type === 'success') {
      setTimeout(() => router.push('/dashboard'), 2500);
    } else {
      setTimeout(() => setToast(null), 4000);
    }
  };

  const handleReturn = async (lab: typeof labs[0]) => {
    setLoading(true);
    setLoadingLabId(lab.id);

    try {
      const response = await fetch('/api/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ labName: lab.name }),
      });

      if (!response.ok) {
        showToast('error', 'Erro ao registrar devolução', lab.name);
        return;
      }

      showToast('success', 'Chave devolvida com sucesso!', lab.name);
    } catch (error) {
      showToast('error', 'Erro de conexão', lab.name);
    } finally {
      setLoading(false);
      setLoadingLabId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 text-white px-6 py-6 shadow-2xl sticky top-0 z-20 animate-slideInDown">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            disabled={loading}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <Zap size={28} />
              Devolver Chaves
            </h1>
            <p className="text-red-100 text-sm">Escolha um laboratório</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-20">
        {/* Alert */}
        <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-600/50 rounded-2xl p-5 mb-8 flex gap-3 animate-fadeInUp">
          <AlertCircle className="text-orange-400 flex-shrink-0" size={20} />
          <p className="text-orange-300 text-sm leading-relaxed">
            Selecione um laboratório para registrar a devolução da chave. O sistema Arduino será notificado automaticamente.
          </p>
        </div>

        {/* Labs Grid */}
        <div className="space-y-4">
          {labs.map((lab, idx) => (
            <button
              key={lab.id}
              onClick={() => handleReturn(lab)}
              disabled={loading}
              className="w-full group relative overflow-hidden rounded-2xl animate-fadeInUp transform hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{animationDelay: `${(idx + 1) * 0.08}s`}}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-20 group-hover:opacity-30 transition`}></div>
              <div className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 ${lab.color === 'from-blue-600 to-blue-700' ? 'border-blue-600 group-hover:border-blue-500' : lab.color === 'from-yellow-600 to-yellow-700' ? 'border-yellow-600 group-hover:border-yellow-500' : lab.color === 'from-purple-600 to-purple-700' ? 'border-purple-600 group-hover:border-purple-500' : lab.color === 'from-green-600 to-emerald-700' ? 'border-green-600 group-hover:border-green-500' : 'border-orange-600 group-hover:border-orange-500'} transition p-5 flex items-center gap-4`}>
                <div className="text-4xl">
                  {loadingLabId === lab.id ? (
                    <Loader size={40} className="animate-spin text-red-400" />
                  ) : (
                    lab.icon
                  )}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-white group-hover:text-gray-100 transition">
                    {loadingLabId === lab.id ? 'Processando...' : lab.name}
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-1">
                    <BookOpen size={14} />
                    {lab.floor}
                  </p>
                </div>
                <div className={`text-2xl transition transform ${loadingLabId === lab.id ? 'opacity-0' : 'group-hover:translate-x-2'}`}>
                  →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <div className={`fixed top-6 left-6 right-6 max-w-md mx-auto rounded-2xl p-4 flex items-center gap-3 animate-slideInDown z-50 shadow-2xl ${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 border border-emerald-500' 
            : 'bg-gradient-to-r from-red-600 to-red-700 border border-red-500'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={24} className="text-white flex-shrink-0" />
          ) : (
            <XCircle size={24} className="text-white flex-shrink-0" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">{toast.message}</p>
            <p className="text-white/80 text-sm truncate">{toast.labName}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-white/60 hover:text-white transition text-lg flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading Overlay (Mobile-friendly) */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-slate-800 rounded-2xl p-8 flex flex-col items-center gap-4 mx-6 max-w-sm">
            <Loader size={48} className="animate-spin text-red-400" />
            <p className="text-white font-semibold text-center">Devolvendo chave...</p>
            <p className="text-gray-400 text-sm text-center">Aguarde a confirmação do Arduino</p>
          </div>
        </div>
      )}
    </div>
  );
}