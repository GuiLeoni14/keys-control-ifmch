'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, RotateCcw, History, Unlock, Clock } from 'lucide-react';

interface User {
  email: string;
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
    } else {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-6 py-8 shadow-2xl sticky top-0 z-20 animate-slideInDown">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">Bem-vindo! 👋</h1>
            <p className="text-green-100 text-sm mt-1">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition transform hover:scale-110 active:scale-95 shadow-lg"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-32">
        {/* Status Card with Glow */}
        <div className="relative mb-8 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Status do Sistema</p>
                <h2 className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-2">0</h2>
              </div>
              <div className="p-4 bg-green-600/20 rounded-full border border-green-600/50">
                <Unlock className="text-green-400" size={32} />
              </div>
            </div>
            <p className="text-gray-400 text-sm">Chaves em sua posse</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4 mb-8 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
          <h3 className="text-lg font-black text-gray-200 uppercase tracking-wider mb-4">Ações Rápidas</h3>
          
          <button
            onClick={() => router.push('/withdrawal')}
            className="w-full group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-600 hover:border-green-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/10 to-green-600/0 group-hover:from-green-600/10 group-hover:via-green-600/20 group-hover:to-green-600/10 transition duration-500"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-4 bg-green-600/30 rounded-xl group-hover:bg-green-600/50 transition">
                <Plus className="text-green-400 group-hover:text-green-300" size={28} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-white group-hover:text-green-200 transition">Retirar Chaves</h4>
                <p className="text-green-200/70 text-sm">Solicitar acesso ao laboratório</p>
              </div>
              <div className="text-green-600 group-hover:text-green-400 transition transform group-hover:translate-x-1">→</div>
            </div>
          </button>

          <button
            onClick={() => router.push('/return')}
            className="w-full group relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-red-600/20 to-orange-600/20 border-2 border-red-600 hover:border-red-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 group-hover:from-red-600/10 group-hover:via-red-600/20 group-hover:to-red-600/10 transition duration-500"></div>
            <div className="relative flex items-center gap-4">
              <div className="p-4 bg-red-600/30 rounded-xl group-hover:bg-red-600/50 transition">
                <RotateCcw className="text-red-400 group-hover:text-red-300" size={28} />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-bold text-white group-hover:text-red-200 transition">Devolver Chaves</h4>
                <p className="text-red-200/70 text-sm">Registrar devolução</p>
              </div>
              <div className="text-red-600 group-hover:text-red-400 transition transform group-hover:translate-x-1">→</div>
            </div>
          </button>
        </div>

        {/* History Button */}
        <button
          onClick={() => router.push('/history')}
          className="w-full group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-slate-500 transition-all duration-300 mb-8 animate-fadeInUp"
          style={{animationDelay: '0.3s'}}
        >
          <div className="relative flex items-center justify-center gap-3">
            <History className="text-gray-400 group-hover:text-gray-300" size={20} />
            <span className="font-semibold text-gray-300 group-hover:text-white transition">Ver Histórico de Movimentações</span>
          </div>
        </button>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-600/50 rounded-2xl p-6 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
          <div className="flex gap-4">
            <Clock className="text-blue-400 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-blue-200 mb-1">Dica</h4>
              <p className="text-blue-300/80 text-sm">Solicitações são processadas em tempo real pelo sistema Arduino. Aguarde a confirmação de desbloqueio.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
