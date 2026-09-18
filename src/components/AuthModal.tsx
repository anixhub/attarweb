import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  darkMode: boolean;
  initialTab?: 'login' | 'register';
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  darkMode,
  initialTab = 'login',
  initialRole = 'santri'
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [loginRole, setLoginRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form States (For Santri / Wali)
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 1-Click Fast Demo Login handler
  const handleQuickDemoLogin = (role: UserRole) => {
    const demo = DEMO_USERS.find(u => u.role === role);
    if (demo) {
      setErrorMessage(null);
      setSuccessMessage(`Berhasil masuk sebagai ${demo.name} (${demo.role.toUpperCase()})`);
      setTimeout(() => {
        onLoginSuccess(demo);
        onClose();
      }, 500);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Look in demo users or localStorage users
    const localUsers: UserAccount[] = JSON.parse(localStorage.getItem('attaroqqy_users') || '[]');
    const allUsers = [...DEMO_USERS, ...localUsers];

    const found = allUsers.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase().trim()
    );

    if (found) {
      if (loginRole === 'admin' && found.role !== 'admin') {
        setErrorMessage('Akun ini terdaftar sebagai Calon Santri/Wali, bukan sebagai Pengurus/Admin.');
        return;
      }
      setSuccessMessage(`Selamat datang kembali, ${found.name}!`);
      setTimeout(() => {
        onLoginSuccess(found);
        onClose();
      }, 500);
    } else {
      // Create user on the fly if custom email entered for convenience
      const newUser: UserAccount = {
        id: `user-${Date.now()}`,
        name: loginEmail.split('@')[0],
        email: loginEmail,
        phone: '08123456789',
        role: loginRole,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSuccessMessage(`Login berhasil sebagai ${newUser.name}`);
      setTimeout(() => {
        onLoginSuccess(newUser);
        onClose();
      }, 500);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regName || !regEmail || !regPhone || !regPassword) {
      setErrorMessage('Harap lengkapi semua kolom pendaftaran.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Kata sandi minimal 6 karakter.');
      return;
    }

    const newUser: UserAccount = {
      id: `user-${Date.now()}`,
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: 'santri',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    const localUsers: UserAccount[] = JSON.parse(localStorage.getItem('attaroqqy_users') || '[]');
    localUsers.push(newUser);
    localStorage.setItem('attaroqqy_users', JSON.stringify(localUsers));

    setSuccessMessage(`Alhamdulillah! Akun Anda berhasil dibuat. Mengalihkan...`);
    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden my-auto flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Header Modal */}
        <div className={`px-5 sm:px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-100 bg-emerald-950 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-amber-300 font-cinzel font-bold text-sm shadow-md">
              AT
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Portal Akses Pengguna & Pengurus
              </span>
              <h3 className="font-cinzel text-base sm:text-lg font-bold">
                Pondok Pesantren At-Taroqqy
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection: Masuk vs Daftar */}
        <div className={`grid grid-cols-2 p-1.5 border-b text-xs sm:text-sm font-bold ${
          darkMode ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => { setTab('login'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              tab === 'login'
                ? 'bg-white dark:bg-neutral-800 text-emerald-700 dark:text-amber-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk Akun</span>
          </button>

          <button
            onClick={() => { setTab('register'); setErrorMessage(null); setSuccessMessage(null); }}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              tab === 'register'
                ? 'bg-white dark:bg-neutral-800 text-emerald-700 dark:text-amber-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Santri / Wali</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-5">
          
          {/* Quick Demo Login Bar (1-Click Evaluation) */}
          <div className={`p-3 rounded-xl border ${
            darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-emerald-50/70 border-emerald-200'
          }`}>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AKSES DEMO CEPAT (Klik 1 Kali untuk Menguji):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-all flex items-center justify-between shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-left">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold leading-tight">Admin Pengurus</span>
                    <span className="block text-[9px] opacity-80">Ust. M. Syukron (PSB)</span>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('santri')}
                className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold transition-all flex items-center justify-between shadow-xs cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-left">
                  <User className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="block text-[11px] font-bold leading-tight">Calon Santri</span>
                    <span className="block text-[9px] opacity-80">Ahmad Daniyal (Pendaftar)</span>
                  </div>
                </div>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in zoom-in-95">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ================= TAB LOGIN ================= */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Role Toggle */}
              <div>
                <label className="block font-semibold mb-1.5 text-neutral-600 dark:text-neutral-400">
                  Peran Akses Masuk:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setLoginRole('santri'); setLoginEmail('santri@gmail.com'); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      loginRole === 'santri'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-amber-400 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Calon Santri / Wali</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setLoginRole('admin'); setLoginEmail('admin@attaroqqy.id'); }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      loginRole === 'admin'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-amber-400 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-500'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pengurus / Admin</span>
                  </button>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  Alamat Email:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder={loginRole === 'admin' ? 'admin@attaroqqy.id' : 'email@contoh.com'}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Kata Sandi:
                  </label>
                  <span className="text-[11px] text-neutral-400 italic">
                    (Sembarang sandi untuk demo)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Sekarang</span>
              </button>
            </form>
          )}

          {/* ================= TAB REGISTER (SANTRI / WALI) ================= */}
          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Pendaftaran ini diperuntukkan bagi <strong>Calon Santri Baru & Wali Santri</strong>. Akun Pengurus/Admin dikelola terpusat oleh sekretariat pesantren.
                </span>
              </div>

              {/* Nama Lengkap */}
              <div>
                <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  Nama Lengkap (Santri atau Wali):
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Rayhan / H. Ridwan"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  Nomor WhatsApp Aktif:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08123456789"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  Alamat Email:
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="email@contoh.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  Buat Kata Sandi:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Minimal 6 karakter..."
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <UserPlus className="w-4 h-4" />
                <span>Buat Akun Santri Baru</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
