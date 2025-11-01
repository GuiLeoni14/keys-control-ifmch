'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock, Mail, Key } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });

    if (!email) {
      setErrors(prev => ({ ...prev, email: 'E-mail é obrigatório' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Senha é obrigatória' }));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }));
      router.push('/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-sm relative z-10 animate-fadeInUp">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition duration-300">
            <Lock className="text-white" size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent mb-2">
            Controle de Chaves
          </h1>
          <p className="text-gray-400 text-sm tracking-widest uppercase font-semibold">Campus Machado - IFMg</p>
        </div>

        {/* Form Card */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-700">
          {/* Email Input */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Mail size={16} className="text-green-500" />
              E-mail Institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@ifmg.edu.br"
              required
              className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition duration-200 text-white placeholder-gray-500 group-hover:bg-slate-700/70"
            />
            {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <Key size={16} className="text-green-500" />
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-5 py-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30 transition duration-200 text-white placeholder-gray-500 group-hover:bg-slate-700/70"
            />
            {errors.password && <p className="text-red-400 text-xs mt-2">{errors.password}</p>}
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 rounded-xl transition duration-200 mt-8 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-green-500/50 relative overflow-hidden"
          >
            <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              <Lock size={18} />
              Acessar Sistema
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              </div>
            )}
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
