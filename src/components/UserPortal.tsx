import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Printer, 
  Download, 
  Bookmark, 
  HelpCircle, 
  Send, 
  MapPin, 
  Phone, 
  LogOut,
  QrCode,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { UserAccount, SantriRegistration, Article } from '../types';

interface UserPortalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogout: () => void;
  registrations: SantriRegistration[];
  onOpenPendaftaran: () => void;
  darkMode: boolean;
}

export const UserPortal: React.FC<UserPortalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  registrations,
  onOpenPendaftaran,
  darkMode
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'status' | 'tanya'>('status');

  // Find user's registration if any
  const userReg = registrations.find(
    r => r.userId === currentUser.id || 
         (currentUser.email && r.email?.toLowerCase() === currentUser.email.toLowerCase()) ||
         (currentUser.regCode && r.regCode === currentUser.regCode)
  );

  // Tanya Bahtsul Masail Form
  const [pertanyaan, setPertanyaan] = useState('');
  const [kategoriFiqih, setKategoriFiqih] = useState('Ibadah & Shalat');
  const [tanyaSent, setTanyaSent] = useState(false);

  // Print Slip Preview Modal state
  const [showSlip, setShowSlip] = useState(false);

  const handleTanyaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pertanyaan.trim()) return;
    setTanyaSent(true);
    setTimeout(() => {
      setPertanyaan('');
    }, 1000);
  };

  const getStepProgress = (status?: string) => {
    switch (status) {
      case 'menunggu': return 1;
      case 'verifikasi': return 2;
      case 'jadwal_tes': return 3;
      case 'diterima': return 4;
      default: return 0;
    }
  };

  const currentStep = getStepProgress(userReg?.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl border overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Header Modal */}
        <div className={`px-4 sm:px-6 py-4 border-b flex items-center justify-between ${
          darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-emerald-900 text-white border-emerald-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-bold">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                Portal Santri & Wali
              </span>
              <h3 className="font-cinzel text-base sm:text-lg font-bold">
                {currentUser.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg border border-red-400/40 text-red-300 hover:bg-red-950/50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`px-4 sm:px-6 pt-3 border-b flex gap-2 ${
          darkMode ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => setActiveTab('status')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-800 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Status Pendaftaran PSB</span>
          </button>

          <button
            onClick={() => setActiveTab('tanya')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'tanya'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-800 dark:text-amber-400 bg-white dark:bg-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Lajnah Bahtsul Masail</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
          
          {/* TAB 1: STATUS PENDAFTARAN */}
          {activeTab === 'status' && (
            <div className="space-y-6 animate-in fade-in">
              {userReg ? (
                /* Detail Status Santri Terdaftar */
                <div className="space-y-6">
                  
                  {/* Status Headline Banner */}
                  <div className={`p-5 rounded-2xl border ${
                    userReg.status === 'diterima'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                      : userReg.status === 'jadwal_tes'
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-amber-400 block mb-1">
                          Nomor Registrasi: {userReg.regCode}
                        </span>
                        <h4 className="font-cinzel text-xl font-bold text-neutral-900 dark:text-white">
                          {userReg.namaLengkap}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                          Pilihan: <strong>{userReg.jenjang}</strong> ({userReg.jenisKelamin}) • Terdaftar {userReg.tanggalDaftar}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowSlip(true)}
                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Cetak Bukti PSB</span>
                        </button>
                      </div>
                    </div>

                    {/* Progress Steps Visualizer */}
                    <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-700/60">
                      <span className="text-[11px] font-bold text-neutral-500 block mb-3 uppercase tracking-wider">
                        Tahapan Seleksi Santri Baru:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className={`p-3 rounded-xl border text-xs ${
                          currentStep >= 1 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        }`}>
                          <div className="font-bold">1. Berkas Masuk</div>
                          <div className="text-[10px] opacity-80">Selesai</div>
                        </div>

                        <div className={`p-3 rounded-xl border text-xs ${
                          currentStep >= 2 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        }`}>
                          <div className="font-bold">2. Verifikasi</div>
                          <div className="text-[10px] opacity-80">{currentStep >= 2 ? 'Lolos' : 'Menunggu'}</div>
                        </div>

                        <div className={`p-3 rounded-xl border text-xs ${
                          currentStep >= 3 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        }`}>
                          <div className="font-bold">3. Jadwal Sowan & Tes</div>
                          <div className="text-[10px] opacity-80">{currentStep >= 3 ? 'Aktif' : 'Tahap Berikutnya'}</div>
                        </div>

                        <div className={`p-3 rounded-xl border text-xs ${
                          currentStep >= 4 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                        }`}>
                          <div className="font-bold">4. Lulus Diterima</div>
                          <div className="text-[10px] opacity-80">{currentStep >= 4 ? 'Mubarak!' : 'Pengumuman'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pengurus Notes & Schedule */}
                  {(userReg.catatanPengurus || userReg.jadwalTes) && (
                    <div className={`p-5 rounded-2xl border ${
                      darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
                    } space-y-3`}>
                      <span className="text-xs font-bold text-emerald-700 dark:text-amber-400 block uppercase">
                        Keterangan dari Panitia PSB:
                      </span>
                      
                      {userReg.jadwalTes && (
                        <div className="flex items-start gap-2.5 text-xs text-neutral-800 dark:text-neutral-200">
                          <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <strong>Jadwal Ujian / Sowan Pengasuh:</strong>
                            <p className="text-emerald-700 dark:text-amber-400 font-semibold">{userReg.jadwalTes}</p>
                          </div>
                        </div>
                      )}

                      {userReg.catatanPengurus && (
                        <div className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p>{userReg.catatanPengurus}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ringkasan Berkas */}
                  <div className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-white border-neutral-200'
                  } space-y-3 text-xs`}>
                    <h5 className="font-bold text-sm text-neutral-900 dark:text-white">
                      Ringkasan Data Calon Santri:
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-neutral-400 block">Nama Wali Santri:</span>
                        <strong className="text-neutral-800 dark:text-neutral-200">{userReg.namaWali}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Nomor WhatsApp:</span>
                        <strong className="text-neutral-800 dark:text-neutral-200">{userReg.noWhatsapp}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Tempat & Tanggal Lahir:</span>
                        <strong className="text-neutral-800 dark:text-neutral-200">{userReg.tempatLahir}, {userReg.tanggalLahir}</strong>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Kota Asal:</span>
                        <strong className="text-neutral-800 dark:text-neutral-200">{userReg.asalDaerah}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* Jika Belum Terdaftar PSB */
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-neutral-900 dark:text-white">
                    Anda Belum Mengajukan Pendaftaran Santri Baru
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                    Penerimaan Santri Baru (PSB) Gelombang I Tahun 1448 H / 2026 M telah dibuka untuk jenjang Salafiyah Wustha, 'Ulya, dan Takhassus Tahfidz.
                  </p>
                  <button
                    onClick={() => { onClose(); onOpenPendaftaran(); }}
                    className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Daftar Santri Baru Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TANYA LAJNAH BAHTSUL MASAIL */}
          {activeTab === 'tanya' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <h4 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-white">
                  Konsultasi Syariat & Tanya Bahtsul Masail
                </h4>
                <p className="text-xs text-neutral-500">
                  Kirimkan pertanyaan problematika fiqih atau syariat Islam kepada dewan asatidz At-Taroqqy
                </p>
              </div>

              {tanyaSent ? (
                <div className="p-6 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h5 className="font-heading text-lg font-bold text-emerald-900 dark:text-emerald-300">
                    Jazakumullah Khairan! Pertanyaan Telah Diterima
                  </h5>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 max-w-md mx-auto">
                    Pertanyaan Anda telah diteruskan ke dewan musyawarah Bahtsul Masail. Jawaban berlandaskan kitab kuning mu'tamad akan dikirimkan ke WhatsApp/Email Anda dan rubrik kajian santri.
                  </p>
                  <button
                    onClick={() => setTanyaSent(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
                  >
                    Kirim Pertanyaan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTanyaSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Bidang Kajian Fiqih:
                    </label>
                    <select
                      value={kategoriFiqih}
                      onChange={(e) => setKategoriFiqih(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    >
                      <option value="Ibadah & Shalat">Ibadah, Thaharah, & Shalat</option>
                      <option value="Muamalah Digital">Muamalah & Transaksi Ekonomi Kontemporer</option>
                      <option value="Munakahat & Keluarga">Munakahat & Fiqih Keluarga</option>
                      <option value="Nisaiyat / Fiqih Wanita">Nisaiyat & Fiqih Darah Kewanitaan</option>
                      <option value="Tasawuf & Akhlak">Tasawuf & Pembinaan Hati</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Deskripsi Masalah / Pertanyaan:
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={pertanyaan}
                      onChange={(e) => setPertanyaan(e.target.value)}
                      placeholder="Jelaskan secara rinci kasus atau pertanyaan fiqih yang ingin Anda konsultasikan..."
                      className={`w-full p-3 rounded-xl border ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim ke Lajnah Bahtsul Masail</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Printable Slip Preview Modal */}
      {showSlip && userReg && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-neutral-950/90 backdrop-blur-md">
          <div className="bg-white text-neutral-900 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-900 space-y-4">
            
            {/* Kop Surat At-Taroqqy */}
            <div className="text-center border-b-2 border-neutral-900 pb-4">
              <span className="text-xs font-serif uppercase tracking-widest text-emerald-800 block">
                معهد الترقي الإسلامي السلفي
              </span>
              <h3 className="font-cinzel text-xl font-bold tracking-tight">
                PONDOK PESANTREN AT-TAROQQY
              </h3>
              <p className="text-[11px] text-neutral-600">
                Waru - Sedan, Rembang, Jawa Tengah 59264 • Telp: (0295) 881234
              </p>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900 text-white uppercase">
                BUKTI PENDAFTARAN SANTRI BARU (PSB) 1448 H
              </span>
            </div>

            {/* Content Details */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b pb-1">
                <span>No. Registrasi:</span>
                <strong>{userReg.regCode}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Nama Santri:</span>
                <strong>{userReg.namaLengkap}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Jenjang:</span>
                <strong>{userReg.jenjang}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Kompleks:</span>
                <strong>Santri {userReg.jenisKelamin}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Nama Wali:</span>
                <strong>{userReg.namaWali}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>WhatsApp:</span>
                <strong>{userReg.noWhatsapp}</strong>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Status Saat Ini:</span>
                <strong className="text-emerald-700 uppercase">{userReg.status}</strong>
              </div>
              {userReg.jadwalTes && (
                <div className="flex justify-between border-b pb-1 bg-amber-50 p-1">
                  <span>Jadwal Sowan:</span>
                  <strong className="text-amber-800">{userReg.jadwalTes}</strong>
                </div>
              )}
            </div>

            {/* Simulative QR Code & Stamp */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 bg-neutral-900 text-white flex items-center justify-center rounded-lg p-1">
                  <QrCode className="w-10 h-10" />
                </div>
                <span className="text-[10px] text-neutral-500 max-w-[130px] leading-tight">
                  Pindai untuk validasi data santri resmi At-Taroqqy
                </span>
              </div>

              <div className="text-center text-[11px]">
                <p>Panitia PSB 1448 H,</p>
                <div className="h-10 flex items-center justify-center font-serif italic text-emerald-800 font-bold">
                  [Cap Terverifikasi]
                </div>
                <p className="font-bold border-t border-neutral-400 pt-0.5">Ust. M. Syukron Habibie</p>
              </div>
            </div>

            {/* Print action */}
            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                onClick={() => setShowSlip(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 hover:bg-neutral-100"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-800 text-white hover:bg-emerald-900 flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar Bukti</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
