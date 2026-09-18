import React, { useState } from 'react';
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  User, 
  Eye, 
  ArrowRight, 
  Bookmark, 
  Filter, 
  Sparkles, 
  HelpCircle,
  Share2
} from 'lucide-react';
import { Article, CategoryType } from '../types';

interface ContentCategoriesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  darkMode: boolean;
}

export const ContentCategories: React.FC<ContentCategoriesProps> = ({
  articles,
  onSelectArticle,
  selectedCategory,
  onSelectCategory,
  darkMode
}) => {
  // Filtered articles if a specific category is chosen
  const filteredArticles = selectedCategory === 'Semua'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  // Grouped datasets
  const popularArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  const bahtsulAndArticles = articles.filter(
    a => a.category === 'Bahtsul Masail' || a.category === 'Artikel'
  );

  const hikmahAndNisaiyat = articles.filter(
    a => a.category === 'Hikmah' || a.category === 'Nisaiyat'
  );

  const categoriesList: CategoryType[] = [
    'Semua',
    'Berita',
    'Bahtsul Masail',
    'Artikel',
    'Hikmah',
    'Nisaiyat',
    'Syaikhuna'
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-4 mb-8 border-b border-neutral-200 dark:border-neutral-800 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <Filter className="w-4 h-4 text-emerald-600 dark:text-amber-400 mr-1" />
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider hidden sm:inline">
            Pilih Kategori:
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {categoriesList.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-sm'
                    : darkMode
                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Portal Magazine Layout:
          Col 1 (Left 8 cols): BAHTSUL MASAIL & ARTIKEL (Grid) + HIKMAH & NISAIYAT (List)
          Col 2 (Right 4 cols): TERPOPULER (List with Numbers) + Widget Jadwal Kajian
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ========================================================================= */}
        {/* MAIN COLUMN (8 cols): BLOK KATEGORI KONTEN */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* 1. BLOK BAHTSUL MASAIL & ARTIKEL (TATA LETAK GRID 2 KOLOM) */}
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 mb-6 border-b-2 border-emerald-700 dark:border-amber-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-700 dark:bg-amber-500 rounded-sm inline-block"></span>
                <h2 className="font-cinzel text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  BAHTSUL MASAIL & ARTIKEL
                </h2>
              </div>
              <button
                onClick={() => onSelectCategory('Bahtsul Masail')}
                className="text-xs font-semibold text-emerald-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Kajian Fiqih</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid 2 Kolom dengan Thumbnail Gambar, Judul Serif, Meta Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {bahtsulAndArticles.map((article) => (
                <article
                  key={article.id}
                  id={`article-card-${article.id}`}
                  onClick={() => onSelectArticle(article)}
                  className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    darkMode 
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-white border-neutral-200 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    {/* Thumbnail with zoom effect */}
                    <div className="relative w-full h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                          article.category === 'Bahtsul Masail'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-800 text-white'
                        }`}>
                          {article.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] text-white flex items-center gap-1">
                        <Eye className="w-3 h-3 text-amber-300" />
                        <span>{article.views.toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-400" />
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Judul Font Serif Tegas & Elegan */}
                      <h3 className="font-heading text-lg font-bold leading-snug text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors duration-200 line-clamp-2 mb-2">
                        {article.title}
                      </h3>

                      {/* Excerpt Paragraf */}
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Penulis & Action */}
                  <div className="px-4 sm:px-5 py-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center gap-2 truncate max-w-[200px]">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 truncate">
                        {article.author.name}
                      </span>
                    </div>

                    <span className="text-emerald-700 dark:text-amber-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Baca Lengkap <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 2. BLOK HIKMAH & NISAIYAT (DESAIN LIST VERTIKAL DENGAN GAMBAR KIRI & TEKS KANAN) */}
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 mb-6 border-b-2 border-emerald-700 dark:border-amber-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-emerald-700 dark:bg-amber-500 rounded-sm inline-block"></span>
                <h2 className="font-cinzel text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  HIKMAH & NISAIYAT
                </h2>
              </div>
              <button
                onClick={() => onSelectCategory('Nisaiyat')}
                className="text-xs font-semibold text-emerald-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Rubrik Putri</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Vertical List Design: Small image on left, text on right */}
            <div className="space-y-4">
              {hikmahAndNisaiyat.map((item) => (
                <article
                  key={item.id}
                  id={`hikmah-item-${item.id}`}
                  onClick={() => onSelectArticle(item)}
                  className={`group p-3 sm:p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col sm:flex-row gap-4 items-start ${
                    darkMode 
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-white border-neutral-200 hover:border-emerald-300'
                  }`}
                >
                  {/* Small Thumbnail on Left with Hover Zoom */}
                  <div className="w-full sm:w-44 md:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative bg-neutral-100 dark:bg-neutral-800">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.category === 'Nisaiyat'
                          ? 'bg-rose-700 text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Text on Right */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-400" />
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    {/* Judul Serif */}
                    <h3 className="font-heading text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>

                    {/* Author metadata */}
                    <div className="pt-1 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        Oleh: {item.author.name}
                      </span>
                      <span className="text-emerald-700 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Selengkapnya <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SIDEBAR COLUMN (4 cols): TERPOPULER & WIDGET PESANTREN */}
        {/* ========================================================================= */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* 1. BLOK TERPOPULER (DAFTAR ARTIKEL PALING BANYAK DIBACA) */}
          <div className={`p-5 rounded-2xl border ${
            darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3 className="font-cinzel text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  TERPOPULER
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-neutral-400">
                Paling Banyak Dibaca
              </span>
            </div>

            {/* Ranked List 1 to 5 */}
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {popularArticles.map((pop, idx) => (
                <div
                  key={pop.id}
                  id={`popular-item-${pop.id}`}
                  onClick={() => onSelectArticle(pop)}
                  className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer flex items-start gap-3.5 transition-colors"
                >
                  {/* Ranked Number 01, 02, etc. */}
                  <span className={`font-cinzel text-2xl sm:text-3xl font-black leading-none shrink-0 ${
                    idx === 0 
                      ? 'text-amber-500' 
                      : idx === 1 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-neutral-300 dark:text-neutral-700'
                  }`}>
                    0{idx + 1}
                  </span>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-amber-400">
                        {pop.category}
                      </span>
                      <span className="text-[10px] text-neutral-400 flex items-center gap-0.5">
                        <Eye className="w-3 h-3" />
                        {pop.views.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <h4 className="font-heading text-sm font-bold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors">
                      {pop.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span>{pop.author.name}</span>
                      <span>•</span>
                      <span>{pop.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. JADWAL PENGAJIAN RUTIN PESANTREN (Salafiyah Widget) */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-neutral-900 to-neutral-950 border-neutral-800' 
              : 'bg-gradient-to-br from-emerald-900 to-teal-950 text-white border-emerald-800 shadow-md'
          }`}>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Jadwal Pengajian Rutin
                </span>
              </div>

              <h4 className="font-heading text-lg font-bold leading-snug text-white">
                Pengajian Kitab Kuning Bersama Masyayikh At-Taroqqy
              </h4>

              <div className="space-y-2.5 text-xs text-neutral-200">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-between">
                  <div>
                    <strong className="block text-white font-semibold">Ihya' 'Ulumiddin</strong>
                    <span className="text-neutral-300 text-[11px]">K.H. Ahmad Maimoen Taroqqy</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-amber-500 text-neutral-950 font-bold text-[10px]">
                    Malam Jum'at
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-between">
                  <div>
                    <strong className="block text-white font-semibold">Fathul Wahhab</strong>
                    <span className="text-neutral-300 text-[11px]">Kajian Bahtsul Masail</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-500 text-white font-bold text-[10px]">
                    Ahad Pagi
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-between">
                  <div>
                    <strong className="block text-white font-semibold">Risalatul Mahidh</strong>
                    <span className="text-neutral-300 text-[11px]">Nyai Hj. Siti Aminah</span>
                  </div>
                  <span className="px-2 py-1 rounded bg-rose-500 text-white font-bold text-[10px]">
                    Selasa Sore
                  </span>
                </div>
              </div>

              <div className="pt-1 text-center">
                <span className="text-[11px] text-amber-300 font-medium">
                  Terbuka untuk Santri, Alumni & Jama'ah Umum
                </span>
              </div>
            </div>
          </div>

          {/* 3. KONSULTASI & TANYA FATWA FIQIH */}
          <div className={`p-5 rounded-2xl border text-center space-y-3 ${
            darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-amber-50 border-amber-200'
          }`}>
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-base font-bold text-neutral-900 dark:text-white">
              Punya Pertanyaan Fiqih / Syariat?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Kirimkan problematika ibadah atau muamalah Anda kepada Lajnah Bahtsul Masail Pondok Pesantren At-Taroqqy.
            </p>
            <a
              href="mailto:attaroqqy.warusedan@gmail.com?subject=Tanya%20Fiqih%20Bahtsul%20Masail"
              className="inline-block w-full py-2 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm"
            >
              Kirim Pertanyaan via Email
            </a>
          </div>

        </aside>
      </div>
    </section>
  );
};
