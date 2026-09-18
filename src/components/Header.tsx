import React, { useState } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Menu, 
  X, 
  ChevronDown, 
  Calendar, 
  Clock, 
  BookOpen, 
  Award, 
  UserCheck, 
  Building, 
  GraduationCap,
  Sparkles,
  Volume2,
  LogIn,
  User,
  ShieldCheck,
  LogOut,
  UserPlus
} from 'lucide-react';
import { RUNNING_TEXT_HEADLINES } from '../data/mockData';
import { CategoryType, UserAccount } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenProfile: (tab?: 'profil' | 'visi-misi' | 'pengasuh' | 'lingkungan') => void;
  onOpenSyaikhuna: (tab?: 'biografi' | 'mawaidh') => void;
  onOpenPendaftaran: () => void;
  onSelectArticleByKeyword?: (keyword: string) => void;
  currentUser: UserAccount | null;
  onOpenAuth: (tab?: 'login' | 'register', role?: 'admin' | 'santri') => void;
  onOpenAdminDashboard: () => void;
  onOpenUserPortal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onSelectCategory,
  onOpenProfile,
  onOpenSyaikhuna,
  onOpenPendaftaran,
  currentUser,
  onOpenAuth,
  onOpenAdminDashboard,
  onOpenUserPortal,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kamiDropdownOpen, setKamiDropdownOpen] = useState(false);
  const [syaikhunaDropdownOpen, setSyaikhunaDropdownOpen] = useState(false);
  const [kajianDropdownOpen, setKajianDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Today's Date in Indonesian and Hijriah
  const currentDateId = "Jum'at, 18 September 2026";
  const currentHijri = "7 Rabi'ul Awwal 1448 H";

  return (
    <header className="w-full z-40 sticky top-0 transition-colors duration-300 shadow-md">
      {/* 1. TOP BAR */}
      <div className={`w-full text-xs border-b py-2 px-4 transition-colors duration-200 ${
        darkMode 
          ? 'bg-neutral-900 border-neutral-800 text-neutral-300' 
          : 'bg-emerald-950 border-emerald-900 text-emerald-100'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Left: Ticker Mini / Bismillah */}
          <div className="flex items-center gap-2 text-center md:text-left">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-neutral-950 uppercase tracking-wider">
              Tadzkirah
            </span>
            <span className="hidden sm:inline opacity-90 italic">
              "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ"
            </span>
          </div>

          {/* Center: Tanggal Hari Ini */}
          <div className="flex items-center gap-2 text-center font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentDateId}</span>
            <span className="text-amber-400">|</span>
            <span className="text-amber-300 font-semibold">{currentHijri}</span>
          </div>

          {/* Right: Social Media, Search Icon & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-2 border-r border-white/20 pr-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook At-Taroqqy"
                className="hover:text-amber-400 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram At-Taroqqy"
                className="hover:text-amber-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X Twitter At-Taroqqy"
                className="hover:text-amber-400 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube At-Taroqqy"
                className="hover:text-amber-400 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Search trigger */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Pencarian Berita"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors px-1 py-0.5 rounded cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Cari</span>
            </button>

            {/* Auth Button in Top Bar */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-[11px] font-bold cursor-pointer"
                >
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-emerald-300" />
                  )}
                  <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {userDropdownOpen && (
                  <div 
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className={`absolute right-0 top-full mt-1.5 w-48 rounded-xl shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                      darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-800 text-[10px]">
                      <span className="text-neutral-400 block">Masuk sebagai:</span>
                      <strong className="block truncate font-bold text-emerald-700 dark:text-amber-400">
                        {currentUser.role === 'admin' ? 'Admin Pengurus' : 'Calon Santri / Wali'}
                      </strong>
                    </div>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => { onOpenAdminDashboard(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 text-xs font-semibold flex items-center gap-2"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                        <span>Buka Dashboard Admin</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => { onOpenUserPortal(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-3 py-2 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 text-xs font-semibold flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Buka Portal Santri</span>
                      </button>
                    )}

                    <button
                      onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2 border-t border-neutral-100 dark:border-neutral-800 mt-1 pt-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors px-1 py-0.5 rounded cursor-pointer text-[11px] font-semibold border-l border-white/20 pl-2"
              >
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>Masuk</span>
              </button>
            )}

            {/* Dark/Light Mode Toggle */}

            <button
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              aria-label="Toggle Dark / Light Mode"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-neutral-800 text-amber-400 hover:bg-neutral-700' 
                  : 'bg-emerald-900 text-amber-300 hover:bg-emerald-800'
              }`}
              title={darkMode ? "Beralih ke Light Mode" : "Beralih ke Dark Mode"}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. RUNNING TEXT / BREAKING NEWS TICKER */}
      <div className={`py-1 px-4 border-b text-xs flex items-center overflow-hidden transition-colors ${
        darkMode ? 'bg-neutral-950 border-neutral-800 text-neutral-400' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
      }`}>
        <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase animate-pulse">
            <Volume2 className="w-3 h-3" />
            <span>Warta Kilat</span>
          </div>
          <div className="overflow-hidden relative w-full whitespace-nowrap">
            <div className="inline-block animate-marquee pl-4">
              {RUNNING_TEXT_HEADLINES.map((headline, idx) => (
                <span key={idx} className="mr-8 inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span className="hover:underline cursor-pointer font-medium">{headline}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR */}
      <nav className={`w-full transition-colors duration-200 border-b ${
        darkMode 
          ? 'bg-neutral-950/95 backdrop-blur-md border-neutral-800 text-neutral-100' 
          : 'bg-white/95 backdrop-blur-md border-neutral-200 text-neutral-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          {/* Logo Institusi */}
          <div 
            onClick={() => { onSelectCategory('Semua'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo Emblem Kubah Pesantren */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
              darkMode 
                ? 'bg-gradient-to-br from-emerald-600 to-teal-800 text-amber-300 group-hover:from-emerald-500 group-hover:to-teal-700' 
                : 'bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-400 group-hover:from-emerald-700 group-hover:to-emerald-900'
            }`}>
              <div className="text-center">
                <span className="block font-cinzel font-bold text-lg leading-none">AT</span>
                <span className="block text-[8px] font-semibold tracking-tighter text-amber-200">SEDAN</span>
              </div>
            </div>

            {/* Nama Pesantren */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  AT-TAROQQY
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800 hidden sm:inline-block">
                  WARU - SEDAN
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-medium text-neutral-500 dark:text-neutral-400 -mt-0.5 tracking-wide">
                Pondok Pesantren & Lembaga Kajian Islam Salafiyah
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
            {/* BERANDA */}
            <button
              onClick={() => { onSelectCategory('Semua'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-3 py-2 rounded-lg hover:text-emerald-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              BERANDA
            </button>

            {/* KAMI (Dropdown: Profil, Visi Misi, Pengasuh, Lingkungan) */}
            <div 
              className="relative"
              onMouseEnter={() => setKamiDropdownOpen(true)}
              onMouseLeave={() => setKamiDropdownOpen(false)}
            >
              <button 
                className="px-3 py-2 rounded-lg flex items-center gap-1 hover:text-emerald-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>KAMI</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {kamiDropdownOpen && (
                <div className={`absolute top-full left-0 w-56 rounded-xl shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-700'
                }`}>
                  <button
                    onClick={() => { onOpenProfile('profil'); setKamiDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Building className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>Profil Pesantren</span>
                  </button>
                  <button
                    onClick={() => { onOpenProfile('visi-misi'); setKamiDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Award className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>Visi & Misi</span>
                  </button>
                  <button
                    onClick={() => { onOpenProfile('pengasuh'); setKamiDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>Dewan Pengasuh</span>
                  </button>
                  <button
                    onClick={() => { onOpenProfile('lingkungan'); setKamiDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>Lingkungan & Fasilitas</span>
                  </button>
                </div>
              )}
            </div>

            {/* SYAIKHUNA (Biografi, Mawaidh) */}
            <div 
              className="relative"
              onMouseEnter={() => setSyaikhunaDropdownOpen(true)}
              onMouseLeave={() => setSyaikhunaDropdownOpen(false)}
            >
              <button 
                className="px-3 py-2 rounded-lg flex items-center gap-1 hover:text-emerald-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>SYAIKHUNA</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {syaikhunaDropdownOpen && (
                <div className={`absolute top-full left-0 w-52 rounded-xl shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-700'
                }`}>
                  <button
                    onClick={() => { onOpenSyaikhuna('biografi'); setSyaikhunaDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Biografi Syaikhuna</span>
                  </button>
                  <button
                    onClick={() => { onOpenSyaikhuna('mawaidh'); setSyaikhunaDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors flex items-center gap-2.5 text-xs font-medium"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>Mawaidh & Dawuh</span>
                  </button>
                </div>
              )}
            </div>

            {/* KAJIAN (Dropdown: Berita, Bahtsul Masail, Artikel, Hikmah, Nisaiyat) */}
            <div 
              className="relative"
              onMouseEnter={() => setKajianDropdownOpen(true)}
              onMouseLeave={() => setKajianDropdownOpen(false)}
            >
              <button 
                className="px-3 py-2 rounded-lg flex items-center gap-1 hover:text-emerald-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                <span>KAJIAN</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {kajianDropdownOpen && (
                <div className={`absolute top-full left-0 w-56 rounded-xl shadow-xl border py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                  darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-700'
                }`}>
                  <button
                    onClick={() => { onSelectCategory('Berita'); setKajianDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors text-xs font-medium"
                  >
                    Berita Pesantren
                  </button>
                  <button
                    onClick={() => { onSelectCategory('Bahtsul Masail'); setKajianDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors text-xs font-medium"
                  >
                    Bahtsul Masail
                  </button>
                  <button
                    onClick={() => { onSelectCategory('Artikel'); setKajianDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors text-xs font-medium"
                  >
                    Artikel Turats
                  </button>
                  <button
                    onClick={() => { onSelectCategory('Hikmah'); setKajianDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors text-xs font-medium"
                  >
                    Hikmah Santri
                  </button>
                  <button
                    onClick={() => { onSelectCategory('Nisaiyat'); setKajianDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-neutral-800 hover:text-emerald-700 dark:hover:text-amber-400 transition-colors text-xs font-medium"
                  >
                    Nisaiyat (Fiqih Putri)
                  </button>
                </div>
              )}
            </div>

            {/* PENDAFTARAN (Highlighted CTA) */}
            <button
              id="nav-pendaftaran-btn"
              onClick={onOpenPendaftaran}
              className={`ml-2 px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-1.5 cursor-pointer ${
                darkMode 
                  ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-950/40' 
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-900/20'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>PENDAFTARAN</span>
            </button>

            {/* Desktop Account / Dashboard Shortcut Button */}
            {currentUser ? (
              currentUser.role === 'admin' ? (
                <button
                  onClick={onOpenAdminDashboard}
                  className="px-3 py-2 rounded-lg font-bold text-xs tracking-wider uppercase bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Buka Dashboard Admin & Redaksi"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Panel Pengurus</span>
                </button>
              ) : (
                <button
                  onClick={onOpenUserPortal}
                  className="px-3 py-2 rounded-lg font-bold text-xs tracking-wider uppercase bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-neutral-800 dark:text-amber-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border border-emerald-700 dark:border-neutral-700"
                  title="Buka Status Pendaftaran Santri"
                >
                  <User className="w-4 h-4" />
                  <span>Portal Santri</span>
                </button>
              )
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className={`px-3 py-2 rounded-lg font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer border ${
                  darkMode 
                    ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' 
                    : 'border-emerald-700/30 text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk / Akun</span>
              </button>
            )}
          </div>


          {/* Mobile Menu & Search Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              aria-label="Cari Artikel"
              className={`p-2 rounded-lg border ${
                darkMode ? 'border-neutral-800 text-neutral-200' : 'border-neutral-200 text-neutral-700'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka Menu"
              className={`p-2 rounded-lg border ${
                darkMode ? 'border-neutral-800 text-neutral-200' : 'border-neutral-200 text-neutral-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto ${
            darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-800'
          }`}>
            <button
              onClick={() => { onSelectCategory('Semua'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 font-bold border-b border-neutral-100 dark:border-neutral-800"
            >
              BERANDA
            </button>

            {/* Kami Group */}
            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                KAMI (INSTITUSI)
              </span>
              <div className="pl-2 space-y-1.5 text-sm">
                <button 
                  onClick={() => { onOpenProfile('profil'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Profil Pesantren
                </button>
                <button 
                  onClick={() => { onOpenProfile('visi-misi'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Visi & Misi
                </button>
                <button 
                  onClick={() => { onOpenProfile('pengasuh'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Dewan Pengasuh
                </button>
                <button 
                  onClick={() => { onOpenProfile('lingkungan'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Lingkungan & Fasilitas
                </button>
              </div>
            </div>

            {/* Syaikhuna Group */}
            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                SYAIKHUNA
              </span>
              <div className="pl-2 space-y-1.5 text-sm">
                <button 
                  onClick={() => { onOpenSyaikhuna('biografi'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Biografi Syaikhuna
                </button>
                <button 
                  onClick={() => { onOpenSyaikhuna('mawaidh'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Mawaidh & Dawuh
                </button>
              </div>
            </div>

            {/* Kajian Group */}
            <div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                KAJIAN & WARTA
              </span>
              <div className="pl-2 space-y-1.5 text-sm">
                <button 
                  onClick={() => { onSelectCategory('Berita'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Berita Pesantren
                </button>
                <button 
                  onClick={() => { onSelectCategory('Bahtsul Masail'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Bahtsul Masail
                </button>
                <button 
                  onClick={() => { onSelectCategory('Artikel'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Artikel Turats
                </button>
                <button 
                  onClick={() => { onSelectCategory('Hikmah'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Hikmah Santri
                </button>
                <button 
                  onClick={() => { onSelectCategory('Nisaiyat'); setMobileMenuOpen(false); }}
                  className="block w-full text-left py-1"
                >
                  • Nisaiyat (Muslimah)
                </button>
              </div>
            </div>

            {/* Pendaftaran Mobile Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => { onOpenPendaftaran(); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl font-bold text-center text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:text-neutral-950 flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                <span>PENDAFTARAN SANTRI BARU (PSB)</span>
              </button>

              {/* Mobile User Profile / Auth Actions */}
              {currentUser ? (
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-neutral-800/80 border-neutral-700' : 'bg-neutral-100 border-neutral-200'} space-y-2`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block uppercase font-semibold">
                        {currentUser.role === 'admin' ? 'Pengurus / Admin' : 'Calon Santri / Wali'}
                      </span>
                      <strong className="text-xs text-neutral-900 dark:text-white">
                        {currentUser.name}
                      </strong>
                    </div>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar</span>
                    </button>
                  </div>

                  {currentUser.role === 'admin' ? (
                    <button
                      onClick={() => { onOpenAdminDashboard(); setMobileMenuOpen(false); }}
                      className="w-full py-2 px-3 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Buka Dashboard Admin</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => { onOpenUserPortal(); setMobileMenuOpen(false); }}
                      className="w-full py-2 px-3 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <User className="w-4 h-4" />
                      <span>Buka Status Pendaftaran Santri</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
                    className="py-2.5 px-3 rounded-xl border border-emerald-700 dark:border-amber-400 text-emerald-800 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Masuk Akun</span>
                  </button>
                  <button
                    onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }}
                    className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Daftar Akun</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        )}
      </nav>
    </header>
  );
};
