import React, { useState } from 'react';
import { 
  X, 
  GraduationCap, 
  CheckCircle, 
  Calendar, 
  FileText, 
  Download, 
  Send, 
  AlertCircle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/mockData';
import { SantriRegistration, UserAccount } from '../types';

interface PendaftaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  currentUser?: UserAccount | null;
  onAddNewRegistration?: (newReg: SantriRegistration) => void;
}

export const PendaftaranModal: React.FC<PendaftaranModalProps> = ({
  isOpen,
  onClose,
  darkMode,
  currentUser,
  onAddNewRegistration
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    namaLengkap: currentUser?.role === 'santri' ? currentUser.name : '',
    jenisKelamin: 'Putra' as 'Putra' | 'Putri',
    tempatLahir: '',
    tanggalLahir: '',
    namaWali: '',
    noWhatsapp: currentUser?.phone || '',
    jenjang: 'Salafiyah Wustha (Setara MTs/SMP)',
    asalDaerah: '',
    catatan: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `PSB-TRQ-1448-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegNumber(generatedCode);
    setSubmitted(true);

    if (onAddNewRegistration) {
      const newReg: SantriRegistration = {
        id: `reg-${Date.now()}`,
        regCode: generatedCode,
        userId: currentUser?.id,
        namaLengkap: formData.namaLengkap,
        jenisKelamin: formData.jenisKelamin,
        tempatLahir: formData.tempatLahir,
        tanggalLahir: formData.tanggalLahir,
        namaWali: formData.namaWali,
        noWhatsapp: formData.noWhatsapp,
        email: currentUser?.email,
        jenjang: formData.jenjang,
        asalDaerah: formData.asalDaerah,
        catatan: formData.catatan,
        status: 'menunggu',
        tanggalDaftar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        catatanPengurus: 'Berkas formulir online telah diterima panitia. Menunggu verifikasi berkas fotokopi KK.'
      };
      onAddNewRegistration(newReg);
    }
  };


  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      namaLengkap: '',
      jenisKelamin: 'Putra',
      tempatLahir: '',
      tanggalLahir: '',
      namaWali: '',
      noWhatsapp: '',
      jenjang: 'Salafiyah Wustha (Setara MTs/SMP)',
      asalDaerah: '',
      catatan: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-3xl rounded-2xl shadow-2xl border overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Header */}
        <div className={`px-4 sm:px-6 py-4 border-b flex items-center justify-between sticky top-0 z-20 ${
          darkMode ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-neutral-100'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 dark:bg-amber-500 text-white dark:text-neutral-950 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-amber-400 uppercase tracking-wider block">
                Penerimaan Santri Baru (PSB) 1448 H / 2026 M
              </span>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                Pondok Pesantren At-Taroqqy
              </h2>
            </div>
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          
          {/* If already submitted confirmation */}
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-neutral-900 dark:text-white">
                Alhamdulillah! Pendaftaran Berhasil Dikirim
              </h3>

              <div className="max-w-md mx-auto p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b pb-1.5 border-emerald-200 dark:border-emerald-800">
                  <span className="text-neutral-500">Nomor Registrasi:</span>
                  <strong className="font-mono text-sm text-emerald-800 dark:text-amber-400">{regNumber}</strong>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-emerald-200 dark:border-emerald-800">
                  <span className="text-neutral-500">Nama Calon Santri:</span>
                  <strong className="text-neutral-900 dark:text-white">{formData.namaLengkap}</strong>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-emerald-200 dark:border-emerald-800">
                  <span className="text-neutral-500">Pilihan Jenjang:</span>
                  <strong className="text-neutral-900 dark:text-white">{formData.jenjang}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Kontak Wali (WA):</span>
                  <strong className="text-neutral-900 dark:text-white">{formData.noWhatsapp}</strong>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                Panitia PSB Pondok Pesantren At-Taroqqy akan segera menghubungi nomor WhatsApp wali santri dalam waktu 1x24 jam untuk verifikasi berkas dan jadwal tes baca Al-Qur'an.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Daftarkan Santri Lain
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            /* Registration Info & Form */
            <div className="space-y-6">
              {/* Program Overview Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Gelombang I : 1 Muharram - 30 Rabi'ul Awwal 1448 H
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  Formulir Pendaftaran Santri Baru Online
                </h3>
                <p className="text-xs text-neutral-200 leading-relaxed">
                  Menyediakan pendidikan berasrama dengan kurikulum turats salafiah, pembinaan tahfidz Al-Qur'an, dan kajian fiqih aplikatif untuk putra dan putri.
                </p>
              </div>

              {/* Admission Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="font-bold text-emerald-600 dark:text-amber-400 block mb-0.5">1. Isi Formulir</span>
                  <span className="text-neutral-500">Lengkapi data santri & kontak wali yang dapat dihubungi.</span>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="font-bold text-emerald-600 dark:text-amber-400 block mb-0.5">2. Verifikasi Berkas</span>
                  <span className="text-neutral-500">Petugas mengonfirmasi kartu keluarga & ijazah terakhir.</span>
                </div>
                <div className={`p-3 rounded-xl border ${darkMode ? 'bg-neutral-800/40 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="font-bold text-emerald-600 dark:text-amber-400 block mb-0.5">3. Tes & Masuk Asrama</span>
                  <span className="text-neutral-500">Uji baca Al-Qur'an dasar dan sowan pengasuh pondok.</span>
                </div>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Nama Lengkap Calon Santri *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Ihsanuddin"
                      value={formData.namaLengkap}
                      onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Kompleks Asrama *
                    </label>
                    <select
                      value={formData.jenisKelamin}
                      onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as 'Putra' | 'Putri' })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    >
                      <option value="Putra">Santri Putra (Kompleks Utama)</option>
                      <option value="Putri">Santri Putri (Kompleks Nisaiyat)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Tempat & Tanggal Lahir *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rembang, 12 Mei 2012"
                      value={formData.tempatLahir}
                      onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Pilihan Jenjang Pendidikan *
                    </label>
                    <select
                      value={formData.jenjang}
                      onChange={(e) => setFormData({ ...formData, jenjang: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    >
                      <option value="Salafiyah Wustha (Setara MTs/SMP)">Salafiyah Wustha (Setara MTs/SMP)</option>
                      <option value="Salafiyah 'Ulya (Setara MA/SMA)">Salafiyah 'Ulya (Setara MA/SMA)</option>
                      <option value="Takhassus Tahfidz Al-Qur'an 30 Juz">Takhassus Tahfidz Al-Qur'an 30 Juz</option>
                      <option value="Ma'had Aly Fiqih & Ushul Fiqih">Ma'had Aly Fiqih & Ushul Fiqih</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Nama Orang Tua / Wali *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: H. Ahmad Subagio"
                      value={formData.namaWali}
                      onChange={(e) => setFormData({ ...formData, namaWali: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={formData.noWhatsapp}
                      onChange={(e) => setFormData({ ...formData, noWhatsapp: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                        darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    Kota / Kabupaten Asal *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sedan - Rembang / Surabaya / Kudus / Jakarta"
                    value={formData.asalDaerah}
                    onChange={(e) => setFormData({ ...formData, asalDaerah: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                      darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-300'
                    }`}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    * Data terlindungi & rahasia
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-amber-500 dark:text-neutral-950 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Formulir Pendaftaran</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
