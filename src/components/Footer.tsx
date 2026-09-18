import React, { useState } from 'react';
import { 
  Send, 
  Check, 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  ArrowUp, 
  Bell,
  GraduationCap,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';
import { CategoryType } from '../types';

interface FooterProps {
  darkMode: boolean;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenProfile: (tab?: 'profil' | 'visi-misi' | 'pengasuh' | 'lingkungan') => void;
  onOpenSyaikhuna: (tab?: 'biografi' | 'mawaidh') => void;
  onOpenPendaftaran: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  darkMode,
  onSelectCategory,
  onOpenProfile,
  onOpenSyaikhuna,
  onOpenPendaftaran
}) => {
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribed(true);
    setSubscribeEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full border-t transition-colors duration-300 mt-12 ${
      darkMode 
        ? 'bg-neutral-950 border-neutral-800 text-neutral-300' 
        : 'bg-emerald-950 border-emerald-900 text-emerald-100'
    }`}>
      {/* 1. TOP NEWSLETTER & NOTIFICATIONS SUBSCRIPTION BANNER */}
      <div className={`border-b ${
        darkMode ? 'border-neutral-800/80 bg-neutral-900/50' : 'border-emerald-900/60 bg-emerald-900/40'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  Berlangganan Warta & Notifikasi Kajian
                </h3>
              </div>
              <p className="text-xs text-neutral-300 dark:text-neutral-400">
                Dapatkan buletin mingguan, ringkasan bahtsul masail diniyyah, dan jadwal siaran langsung Syaikhuna langsung ke inbox email Anda.
              </p>
            </div>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Masukkan alamat email Anda..."
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-72 ${
                  darkMode 
                    ? 'bg-neutral-800 text-white placeholder-neutral-400 border border-neutral-700' 
                    : 'bg-white text-neutral-900 placeholder-neutral-500 border border-emerald-800'
                }`}
              />
              <button
                type="submit"
                id="footer-subscribe-btn"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-900" />
                    <span>Terdaftar!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Subscribe to Notifications</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {subscribed && (
            <div className="mt-3 text-center md:text-right text-xs text-amber-300 animate-in fade-in">
              ✓ Terima kasih! Konfirmasi pendaftaran notifikasi telah kami catat.
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN FOOTER CONTENT (4 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Institusi & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-amber-300 font-cinzel font-bold text-lg shadow-md">
                AT
              </div>
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white tracking-tight">
                  PONDOK PESANTREN AT-TAROQQY
                </h4>
                <p className="text-[11px] text-amber-300 font-medium">
                  Waru - Sedan, Rembang | Est. {INSTITUTION_INFO.establishedYear}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 dark:text-neutral-400 leading-relaxed">
              {INSTITUTION_INFO.history}
            </p>

            <div className="space-y-2 text-xs text-neutral-300 dark:text-neutral-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{INSTITUTION_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${INSTITUTION_INFO.email}`} className="hover:text-amber-300">
                  {INSTITUTION_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{INSTITUTION_INFO.phone}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-neutral-950 transition-colors flex items-center justify-center text-white"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-neutral-950 transition-colors flex items-center justify-center text-white"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="YouTube"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-neutral-950 transition-colors flex items-center justify-center text-white"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-amber-500 hover:text-neutral-950 transition-colors flex items-center justify-center text-white"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Tautan Cepat Kami (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-white/10">
              PROFIL KAMI
            </h5>
            <ul className="space-y-2 text-xs text-neutral-300 dark:text-neutral-400">
              <li>
                <button 
                  onClick={() => onOpenProfile('profil')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Profil Pesantren At-Taroqqy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenProfile('visi-misi')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Visi, Misi & Tujuan Pendidikan
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenProfile('pengasuh')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Dewan Pengasuh & Asatidz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenProfile('lingkungan')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Lingkungan & Sarana Asrama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenSyaikhuna('biografi')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Biografi Syaikhuna
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenSyaikhuna('mawaidh')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Mawaidh & Dawuh Hadratussyaikh
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Rubrik Kajian & Warta (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-white/10">
              RUBRIK KAJIAN
            </h5>
            <ul className="space-y-2 text-xs text-neutral-300 dark:text-neutral-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('Bahtsul Masail')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Bahtsul Masail Diniyyah
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Artikel')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Artikel Turats & Nahwu
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Hikmah')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Hikmah & Adab Santri
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Nisaiyat')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Nisaiyat (Fiqih Nisa' Muslimah)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Berita')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Warta & Berita Pondok
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('Semua')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  • Arsip Semua Berita
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pendaftaran PSB Banner (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider pb-1 border-b border-white/10">
              PENDAFTARAN
            </h5>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-2.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>PSB 1448 / 2026</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-tight">
                Penerimaan Santri Baru Putra & Putri Salafiyah Wustha & 'Ulya.
              </p>
              <button
                onClick={onOpenPendaftaran}
                className="w-full py-2 px-3 rounded-lg text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center cursor-pointer"
              >
                Daftar Online
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM COPYRIGHT BAR */}
      <div className={`py-4 px-4 sm:px-6 border-t text-xs ${
        darkMode 
          ? 'border-neutral-900 bg-neutral-950 text-neutral-500' 
          : 'border-emerald-900 bg-emerald-950/80 text-emerald-300'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Hak Cipta © 2026 <strong>Pondok Pesantren At-Taroqqy</strong> (Waru, Sedan). Hak cipta dilindungi undang-undang.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
