'use client';

import { LogOut } from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function Header({ user, onLogout }: HeaderProps) {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div>
          <h1 className="text-lg font-bold">Olá, {user?.name}!</h1>
          <p className="text-green-100 text-sm">{user?.email}</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}