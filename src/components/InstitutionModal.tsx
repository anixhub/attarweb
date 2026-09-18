import React, { useState } from 'react';
import { 
  X, 
  Building, 
  Award, 
  UserCheck, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  MapPin, 
  Mail, 
  Phone,
  HeartHandshake
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';

export type InstitutionTab = 'profil' | 'visi-misi' | 'pengasuh' | 'lingkungan' | 'biografi' | 'mawaidh';

interface InstitutionModalProps {
  isOpen: boolean;
  activeTab: InstitutionTab;
  onClose: () => void;
  onTabChange: (tab: InstitutionTab) => void;
  darkMode: boolean;
  onOpenPendaftaran: () => void;
}

export const InstitutionModal: React.FC<InstitutionModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
  darkMode,
  onOpenPendaftaran
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl border overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Modal Header Bar */}
        <div className={`px-4 sm:px-6 py-4 border-b flex items-center justify-between sticky top-0 z-20 ${
          darkMode ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-neutral-100'
        }`}>
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-amber-400 uppercase tracking-wider block">
              Pondok Pesantren At-Taroqqy
            </span>
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              Profil Kelembagaan & Masyayikh
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className={`p-2 rounded-lg border transition-colors ${
              darkMode ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`px-4 sm:px-6 pt-3 border-b flex gap-1 sm:gap-2 overflow-x-auto scrollbar-none ${
          darkMode ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-200 bg-neutral-50/50'
        }`}>
          <button
            onClick={() => onTabChange('profil')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'profil'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-700 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Profil Lembaga</span>
          </button>

          <button
            onClick={() => onTabChange('visi-misi')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'visi-misi'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-700 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Visi & Misi</span>
          </button>

          <button
            onClick={() => onTabChange('pengasuh')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'pengasuh'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-700 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Dewan Pengasuh</span>
          </button>

          <button
            onClick={() => onTabChange('lingkungan')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'lingkungan'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-700 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fasilitas & Lingkungan</span>
          </button>

          <button
            onClick={() => onTabChange('biografi')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'biografi' || activeTab === 'mawaidh'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-700 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Syaikhuna</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* TAB 1: PROFIL LEMBAGA */}
          {activeTab === 'profil' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 bg-neutral-950">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                  alt="Pondok Pesantren At-Taroqqy"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span className="text-amber-400 font-cinzel text-xs uppercase tracking-widest">
                    معهد الترقي الإسلامي السلفي
                  </span>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                    Pondok Pesantren At-Taroqqy
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                    Waru - Sedan, Rembang, Jawa Tengah
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-semibold">Tahun Berdiri</span>
                  <span className="font-cinzel text-xl font-bold text-emerald-700 dark:text-amber-400">{INSTITUTION_INFO.establishedYear} M</span>
                  <span className="text-[11px] text-neutral-500 block">40+ Tahun Khidmah</span>
                </div>
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-semibold">Kurikulum</span>
                  <span className="font-cinzel text-lg font-bold text-emerald-700 dark:text-amber-400">Turats Salafiyah</span>
                  <span className="text-[11px] text-neutral-500 block">Madrasah Diniyyah Berjenjang</span>
                </div>
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-semibold">Kompleks Santri</span>
                  <span className="font-cinzel text-lg font-bold text-emerald-700 dark:text-amber-400">Putra & Putri</span>
                  <span className="text-[11px] text-neutral-500 block">Asrama Terpisah Kondusif</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
                  Sejarah & Khittah Perjuangan
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Pondok Pesantren At-Taroqqy berakar dari tekad tulus para masyayikh untuk menjaga kemurnian ajaran Islam Ahlussunnah wal Jama'ah An-Nahdliyyah. Kata "At-Taroqqy" bermakna jenjang kenaikan spiritual dan keilmuan yang terus berproses tanpa henti menuju keridhaan Allah SWT.
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Dengan mempertahankan metode klasikal seperti bandongan, sorogan, dan bahtsul masail, santri dididik mandiri, tawadhu', dan menguasai literatur kitab kuning secara mendalam serta aplikatif dalam menjawab problematika umat masa kini.
                </p>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => { onClose(); onOpenPendaftaran(); }}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 transition-colors shadow-md"
                >
                  Daftar Menjadi Santri At-Taroqqy →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: VISI & MISI */}
          {activeTab === 'visi-misi' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-amber-400">
                  <Award className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Visi Pesantren</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug">
                  "{INSTITUTION_INFO.vision}"
                </h3>
              </div>

              <div className="space-y-4">
                <h4 className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
                  Misi Kelembagaan & Pendidikan
                </h4>
                <div className="space-y-3">
                  {INSTITUTION_INFO.mission.map((m, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-xl border flex items-start gap-3 ${
                        darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200 shadow-xs'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEWAN PENGASUH */}
          {activeTab === 'pengasuh' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
                  Khadimul Ma'had & Dewan Pengasuh
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Ulama pembina sanad keilmuan dan teladan akhlak mulia santri
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INSTITUTION_INFO.pengasuhList.map((pengasuh, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-2xl border overflow-hidden ${
                      darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={pengasuh.image}
                        alt={pengasuh.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {pengasuh.title}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-white">
                          {pengasuh.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-amber-400 block">
                        {pengasuh.role}
                      </span>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {pengasuh.bio}
                      </p>
                      
                      <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-l-2 border-amber-400 text-xs text-neutral-700 dark:text-neutral-300 italic flex items-start gap-2">
                        <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>"{pengasuh.quote}"</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LINGKUNGAN & FASILITAS */}
          {activeTab === 'lingkungan' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <h3 className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
                  Lingkungan & Fasilitas Pesantren
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Sarana ibadah, perpustakaan turats, dan sarana asrama yang representatif
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {INSTITUTION_INFO.facilities.map((fac, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border overflow-hidden group ${
                      darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200 shadow-sm'
                    }`}
                  >
                    <div className="h-40 overflow-hidden relative">
                      <img
                        src={fac.image}
                        alt={fac.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h4 className="font-heading text-base font-bold text-neutral-900 dark:text-white">
                        {fac.title}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {fac.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SYAIKHUNA BIOGRAFI & MAWAIDH */}
          {(activeTab === 'biografi' || activeTab === 'mawaidh') && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 to-teal-950 text-white space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Khadimul Ilmi Hadratussyaikh
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  K.H. Ahmad Maimoen Taroqqy
                </h3>
                <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
                  Ulama sanad turats penerus dakwah salafus sholih di tanah Jawa, pengampu kajian rutin kitab Ihya' 'Ulumiddin dan Tafsir Al-Qur'an.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-heading text-lg font-bold text-neutral-900 dark:text-white">
                  Mawaidh & Nasihat Ruhani
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border space-y-2 ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-amber-50/50 border-amber-200'}`}>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                      Dawuh I: Hakikat Santri
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                      "Santri itu bukan sekadar yang bersarung dan bermukim di bilik pondok. Santri sejati adalah siapa saja yang sepanjang hayatnya memegang teguh tali syariat, beradab kepada sesama, dan hatinya haus akan ilmu."
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-2 ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-emerald-50/50 border-emerald-200'}`}>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                      Dawuh II: Menjaga Sanad
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                      "Ilmu tanpa sanad guru bagaikan kapal tanpa kompas di tengah samudra badai. Hormati gurumu, sambungkan wiridmu, niscaya barakah akan mengalir menembus anak cucumu."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
