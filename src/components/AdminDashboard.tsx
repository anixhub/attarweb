import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  FileText, 
  Video, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Check, 
  Edit3, 
  Trash2, 
  PlusCircle, 
  Send, 
  AlertCircle,
  Phone,
  MapPin,
  FileCheck,
  Eye,
  LogOut,
  ExternalLink
} from 'lucide-react';
import { SantriRegistration, RegistrationStatus, Article, CategoryType, UserAccount } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogout: () => void;
  registrations: SantriRegistration[];
  onUpdateRegistrationStatus: (id: string, newStatus: RegistrationStatus, note?: string, jadwalTes?: string) => void;
  articles: Article[];
  onPublishArticle: (newArticle: Omit<Article, 'id' | 'views'>) => void;
  onDeleteArticle?: (id: string) => void;
  darkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  registrations,
  onUpdateRegistrationStatus,
  articles,
  onPublishArticle,
  onDeleteArticle,
  darkMode
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'psb' | 'redaksi' | 'live'>('psb');

  // PSB Filter States
  const [psbSearch, setPsbSearch] = useState('');
  const [psbStatusFilter, setPsbStatusFilter] = useState<string>('all');
  const [psbJenjangFilter, setPsbJenjangFilter] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<SantriRegistration | null>(null);
  const [tempNote, setTempNote] = useState('');
  const [tempJadwal, setTempJadwal] = useState('');

  // Redaksi Article Publish States
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<CategoryType>('Bahtsul Masail');
  const [artAuthor, setArtAuthor] = useState('Lajnah Bahtsul Masail At-Taroqqy');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artParagraphs, setArtParagraphs] = useState('');
  const [artImageUrl, setArtImageUrl] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80');
  const [artTags, setArtTags] = useState('Bahtsul Masail, Fiqih, Fatwa');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Filtered registrations
  const filteredRegs = registrations.filter(r => {
    const matchesSearch = 
      r.namaLengkap.toLowerCase().includes(psbSearch.toLowerCase()) ||
      r.regCode.toLowerCase().includes(psbSearch.toLowerCase()) ||
      r.asalDaerah.toLowerCase().includes(psbSearch.toLowerCase());
    const matchesStatus = psbStatusFilter === 'all' || r.status === psbStatusFilter;
    const matchesJenjang = psbJenjangFilter === 'all' || r.jenjang.includes(psbJenjangFilter);
    return matchesSearch && matchesStatus && matchesJenjang;
  });

  // Registration metrics
  const totalCount = registrations.length;
  const pendingCount = registrations.filter(r => r.status === 'menunggu').length;
  const verifiedCount = registrations.filter(r => r.status === 'verifikasi' || r.status === 'jadwal_tes').length;
  const acceptedCount = registrations.filter(r => r.status === 'diterima').length;

  const handleOpenDetail = (reg: SantriRegistration) => {
    setSelectedReg(reg);
    setTempNote(reg.catatanPengurus || '');
    setTempJadwal(reg.jadwalTes || '');
  };

  const handleSaveStatusUpdate = (newStatus: RegistrationStatus) => {
    if (!selectedReg) return;
    onUpdateRegistrationStatus(selectedReg.id, newStatus, tempNote, tempJadwal);
    setSelectedReg({
      ...selectedReg,
      status: newStatus,
      catatanPengurus: tempNote,
      jadwalTes: tempJadwal
    });
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || !artExcerpt || !artParagraphs) return;

    const contentArray = artParagraphs.split('\n\n').filter(p => p.trim() !== '');

    onPublishArticle({
      title: artTitle,
      slug: artTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: artCategory,
      excerpt: artExcerpt,
      content: contentArray,
      imageUrl: artImageUrl,
      author: {
        name: artAuthor,
        role: "Dewan Asatidz & Redaksi Ma'had",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
      },
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      hijriDate: "18 Rabi'ul Awwal 1448 H",
      readTime: "4 menit",
      tags: artTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setArtTitle('');
      setArtExcerpt('');
      setArtParagraphs('');
    }, 2000);
  };

  const getStatusBadge = (status: RegistrationStatus) => {
    switch (status) {
      case 'menunggu':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">Menunggu Verifikasi</span>;
      case 'verifikasi':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">Berkas Terverifikasi</span>;
      case 'jadwal_tes':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300">Jadwal Sowan & Tes</span>;
      case 'diterima':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">Lulus & Diterima</span>;
      case 'ditolak':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300">Belum Lulus</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-6xl rounded-2xl shadow-2xl border overflow-hidden my-auto max-h-[94vh] flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Top Header Bar */}
        <div className={`px-4 sm:px-6 py-4 border-b flex items-center justify-between sticky top-0 z-20 ${
          darkMode ? 'bg-neutral-900/95 border-neutral-800' : 'bg-emerald-950 text-white border-emerald-900'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold">
                  Dashboard Pengurus & Redaksi
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-neutral-950 uppercase tracking-wider">
                  Admin Panel
                </span>
              </div>
              <p className="text-xs opacity-80 font-sans">
                Logged in as: <strong>{currentUser.name}</strong> ({currentUser.email})
              </p>
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

        {/* Dashboard Tab Navigation */}
        <div className={`px-4 sm:px-6 pt-3 border-b flex gap-2 overflow-x-auto ${
          darkMode ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
        }`}>
          <button
            onClick={() => setActiveTab('psb')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'psb'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-800 dark:text-amber-400 bg-white dark:bg-neutral-900 shadow-xs'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pendaftaran Santri Baru (PSB)</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-emerald-700 text-white dark:bg-amber-500 dark:text-neutral-950 font-bold">
              {totalCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('redaksi')}
            className={`px-4 py-2.5 rounded-t-xl font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'redaksi'
                ? 'border-emerald-600 dark:border-amber-400 text-emerald-800 dark:text-amber-400 bg-white dark:bg-neutral-900 shadow-xs'
                : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Redaksi Berita & Bahtsul Masail</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-neutral-300 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-bold">
              {articles.length}
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1">
          
          {/* ================= TAB 1: MANAJEMEN PSB ================= */}
          {activeTab === 'psb' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="text-[11px] text-neutral-500 font-semibold block uppercase">Total Masuk</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-cinzel text-neutral-900 dark:text-white">{totalCount}</span>
                    <span className="text-xs text-neutral-400">Calon Santri</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-amber-50/60 border-amber-200'}`}>
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold block uppercase">Menunggu Verifikasi</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-cinzel text-amber-700 dark:text-amber-400">{pendingCount}</span>
                    <span className="text-xs text-amber-600/70">Perlu Tindakan</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-blue-50/60 border-blue-200'}`}>
                  <span className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold block uppercase">Terverifikasi / Tes</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-cinzel text-blue-700 dark:text-blue-400">{verifiedCount}</span>
                    <span className="text-xs text-blue-600/70">Tahap Ujian</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-emerald-50/60 border-emerald-200'}`}>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block uppercase">Lulus & Diterima</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold font-cinzel text-emerald-700 dark:text-emerald-400">{acceptedCount}</span>
                    <span className="text-xs text-emerald-600/70">Santri Mukim</span>
                  </div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari nama, kode registrasi, asal kota..."
                    value={psbSearch}
                    onChange={(e) => setPsbSearch(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200'
                    }`}
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={psbStatusFilter}
                    onChange={(e) => setPsbStatusFilter(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200'
                    }`}
                  >
                    <option value="all">Semua Status</option>
                    <option value="menunggu">Menunggu Verifikasi</option>
                    <option value="verifikasi">Berkas Terverifikasi</option>
                    <option value="jadwal_tes">Jadwal Sowan/Tes</option>
                    <option value="diterima">Lulus & Diterima</option>
                  </select>

                  <select
                    value={psbJenjangFilter}
                    onChange={(e) => setPsbJenjangFilter(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs border font-medium ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200'
                    }`}
                  >
                    <option value="all">Semua Jenjang</option>
                    <option value="Wustha">Wustha (Setara MTs)</option>
                    <option value="Ulya">'Ulya (Setara MA)</option>
                    <option value="Tahfidz">Tahfidz 30 Juz</option>
                  </select>
                </div>
              </div>

              {/* Table / List of Applicants */}
              <div className={`rounded-xl border overflow-hidden ${
                darkMode ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-white shadow-xs'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className={`border-b ${
                      darkMode ? 'bg-neutral-950/80 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                    }`}>
                      <tr>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider">No. Reg</th>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider">Calon Santri</th>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider">Jenjang & Kompleks</th>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider">Asal & Kontak Wali</th>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider">Status Seleksi</th>
                        <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {filteredRegs.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-neutral-400">
                            Tidak ada data calon santri yang sesuai kriteria filter.
                          </td>
                        </tr>
                      ) : (
                        filteredRegs.map((reg) => (
                          <tr 
                            key={reg.id} 
                            className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50 ${
                              selectedReg?.id === reg.id ? 'bg-emerald-50/50 dark:bg-neutral-800' : ''
                            }`}
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 dark:text-amber-400">
                              {reg.regCode}
                            </td>
                            <td className="py-3.5 px-4 font-medium">
                              <span className="font-bold text-neutral-900 dark:text-white block">
                                {reg.namaLengkap}
                              </span>
                              <span className="text-[11px] text-neutral-500">
                                {reg.tempatLahir}, {reg.tanggalLahir}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold block text-neutral-800 dark:text-neutral-200">
                                {reg.jenjang}
                              </span>
                              <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-bold ${
                                reg.jenisKelamin === 'Putra' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300'
                              }`}>
                                Santri {reg.jenisKelamin}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="block text-neutral-800 dark:text-neutral-200 font-medium">
                                {reg.namaWali}
                              </span>
                              <span className="text-[11px] text-neutral-500 block">
                                📍 {reg.asalDaerah}
                              </span>
                              <span className="text-[11px] text-emerald-600 dark:text-amber-400 font-mono">
                                WA: {reg.noWhatsapp}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              {getStatusBadge(reg.status)}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleOpenDetail(reg)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 font-semibold text-xs transition-colors cursor-pointer"
                              >
                                Kelola
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail & Action Inspector Modal / Panel */}
              {selectedReg && (
                <div className={`p-5 rounded-2xl border ${
                  darkMode ? 'bg-neutral-800/60 border-neutral-700' : 'bg-emerald-50/40 border-emerald-200'
                } space-y-4 animate-in fade-in`}>
                  <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-700">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-amber-400">
                        Pemeriksaan Berkas & Penentuan Status
                      </span>
                      <h4 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-white">
                        {selectedReg.namaLengkap} ({selectedReg.regCode})
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedReg(null)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <p><strong>Tempat/Tanggal Lahir:</strong> {selectedReg.tempatLahir}, {selectedReg.tanggalLahir}</p>
                      <p><strong>Nama Wali:</strong> {selectedReg.namaWali}</p>
                      <p><strong>WhatsApp:</strong> {selectedReg.noWhatsapp}</p>
                      <p><strong>Asal Daerah:</strong> {selectedReg.asalDaerah}</p>
                      <p><strong>Catatan Santri:</strong> {selectedReg.catatan || '-'}</p>
                      <p><strong>Status Saat Ini:</strong> {getStatusBadge(selectedReg.status)}</p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                          Catatan / Keterangan dari Pengurus:
                        </label>
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Misal: Berkas KK lengkap, diundang sowan..."
                          className={`w-full p-2 rounded-lg border text-xs ${
                            darkMode ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                          Jadwal Sowan Pengasuh / Tes Masuk:
                        </label>
                        <input
                          type="text"
                          value={tempJadwal}
                          onChange={(e) => setTempJadwal(e.target.value)}
                          placeholder="Misal: Ahad, 27 September 2026 pukul 08:30 WIB"
                          className={`w-full p-2 rounded-lg border text-xs ${
                            darkMode ? 'bg-neutral-900 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                          }`}
                        />
                      </div>

                      {/* Action Status Buttons */}
                      <div className="pt-2">
                        <span className="block font-bold mb-1 text-neutral-700 dark:text-neutral-300">
                          Perbarui Status Calon Santri:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveStatusUpdate('verifikasi')}
                            className="px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                          >
                            Verifikasi Berkas
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveStatusUpdate('jadwal_tes')}
                            className="px-3 py-1.5 rounded-lg bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800 transition-colors"
                          >
                            Jadwalkan Tes
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveStatusUpdate('diterima')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                          >
                            ✓ Terima Santri
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveStatusUpdate('ditolak')}
                            className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
                          >
                            Tolak
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 2: REDAKSI WARTA & KAJIAN ================= */}
          {activeTab === 'redaksi' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between border-b pb-3 border-neutral-200 dark:border-neutral-800">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-neutral-900 dark:text-white">
                    Penerbitan Artikel & Risalah Bahtsul Masail
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Publikasikan fatwa, kabar kegiatan santri, dan nasihat hikmah langsung ke portal
                  </p>
                </div>
                <span className="text-xs text-emerald-600 dark:text-amber-400 font-bold">
                  {articles.length} Artikel Terbit
                </span>
              </div>

              {publishSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <strong>Alhamdulillah! Artikel berhasil diterbitkan dan langsung tampil di halaman depan portal.</strong>
                </div>
              )}

              {/* Publish Form */}
              <form onSubmit={handlePublishSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Judul Artikel / Risalah *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Hasil Bahtsul Masail: Batasan Akad Wakalah dalam Jual Beli Online"
                      value={artTitle}
                      onChange={(e) => setArtTitle(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Rubrik Kategori *
                    </label>
                    <select
                      value={artCategory}
                      onChange={(e) => setArtCategory(e.target.value as CategoryType)}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    >
                      <option value="Bahtsul Masail">Bahtsul Masail</option>
                      <option value="Berita">Berita</option>
                      <option value="Artikel">Artikel</option>
                      <option value="Hikmah">Hikmah</option>
                      <option value="Nisaiyat">Nisaiyat</option>
                      <option value="Syaikhuna">Syaikhuna</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Nama Penulis / Lembaga Pengkaji *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Lajnah Bahtsul Masail Pondok Pesantren At-Taroqqy"
                      value={artAuthor}
                      onChange={(e) => setArtAuthor(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      URL Gambar Utama (Thumbnail)
                    </label>
                    <input
                      type="url"
                      value={artImageUrl}
                      onChange={(e) => setArtImageUrl(e.target.value)}
                      className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    Ringkasan Kutipan (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan 1-2 kalimat ringkasan inti tulisan untuk ditampilkan pada kartu berita..."
                    value={artExcerpt}
                    onChange={(e) => setArtExcerpt(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    Isi Lengkap Artikel (Gunakan Enter 2x untuk memisahkan paragraf) *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tuliskan isi pembahasan kitab, nash maraji', atau narasi berita selengkapnya..."
                    value={artParagraphs}
                    onChange={(e) => setArtParagraphs(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 font-sans ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    Tagar / Label (Pisahkan dengan tanda koma)
                  </label>
                  <input
                    type="text"
                    value={artTags}
                    onChange={(e) => setArtTags(e.target.value)}
                    placeholder="Bahtsul Masail, Fiqih, Fatwa"
                    className={`w-full p-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Terbitkan Artikel Sekarang</span>
                  </button>
                </div>
              </form>

              {/* Recent Articles preview list */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-neutral-500 block uppercase">
                  Daftar Warta & Kajian Terbaru:
                </span>
                <div className="space-y-2">
                  {articles.slice(0, 5).map((a) => (
                    <div 
                      key={a.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800 dark:bg-amber-950 dark:text-amber-300">
                          {a.category}
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-white truncate">
                          {a.title}
                        </span>
                      </div>
                      <span className="text-neutral-400 shrink-0 text-[11px]">
                        {a.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
