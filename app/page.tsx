"use client";

import { Lock } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob">
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000">
      </div>

      <div className="w-full max-w-sm relative z-10 animate-fadeInUp">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition duration-300">
            <Lock className="text-white" size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
            Controle de Chaves
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">
            Campus Machado - IFMg
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-700">
          <button
            onClick={() => signIn("google", {
              redirect: true,
              redirectTo: "/dashboard",
            })}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition duration-200 mt-8 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 relative overflow-hidden"
          >
            <span className={`flex items-center justify-center gap-2`}>
              <Lock size={18} />
              Acessar Sistema
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8 tracking-wide">
          Use suas credenciais institucionais para acessar
        </p>
      </div>
    </div>
  );
}
