'use client';

import { useRouter } from 'next/navigation';
import { Lock, ArrowLeft, RotateCcw } from 'lucide-react';

export default function Return() {
  const router = useRouter();
  const activeKeys = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 text-white px-6 py-6 shadow-2xl sticky top-0 z-20 animate-slideInDown">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition transform hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <RotateCcw size={28} />
              Devolver Chaves
            </h1>
            <p className="text-red-100 text-sm">Registre suas devoluções</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-20 flex flex-col items-center justify-center min-h-[70vh]">
        {activeKeys.length === 0 ? (
          <div className="text-center animate-fadeInUp">
            <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full border-2 border-slate-600">
              <Lock className="text-gray-500" size={48} />
            </div>
            <h2 className="text-2xl font-black text-gray-300 mb-3">Nenhuma Chave em Posse</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              Você não possui chaves para devolver no momento. Retirar chaves de um laboratório para testá-las.
            </p>
            <button
              onClick={() => router.push('/withdrawal')}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl transition transform hover:scale-105 active:scale-95"
            >
              Ir para Retirada
            </button>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {activeKeys.map((key: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-red-600/50 hover:border-red-600 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{key.lab}</h3>
                    <p className="text-gray-400 text-sm">Pronto para devolver</p>
                  </div>
                  <RotateCcw className="text-red-500" size={24} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}