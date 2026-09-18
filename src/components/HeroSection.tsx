import React from 'react';
import { Calendar, User, Clock, Flame, ChevronRight } from 'lucide-react';
import { Article } from '../types';

interface HeroSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  articles,
  onSelectArticle,
  darkMode
}) => {
  // Find main hero and sub heroes
  const mainHero = articles.find(a => a.isHeroMain) || articles[0];
  const subHeroes = articles.filter(a => a.isHeroSub).slice(0, 3);

  // Fallback if subHeroes is less than 3
  const extraItems = articles.filter(a => a.id !== mainHero.id && !subHeroes.some(s => s.id === a.id));
  const displaySubs = [...subHeroes, ...extraItems].slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
      {/* Section Header Title Bar: e.g. "AT-TAROQQY NEWS / SOROTAN UTAMA" */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-emerald-700 dark:border-amber-500">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-700 dark:bg-amber-400 animate-ping"></div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            <span>AT-TAROQQY NEWS</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-sans font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 uppercase">
              SOROTAN UTAMA
            </span>
          </h2>
        </div>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:inline-flex items-center gap-1">
          Edisi Khusus Warta Salaf & Kajian Ilmiah
        </span>
      </div>

      {/* Grid Layout Gaya Masonry: 1 Large on Left (2 cols), 3 on Right (1 col stacked) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ================= 1. ARTIKEL UTAMA TERBESAR (KIRI: 7 cols) ================= */}
        {mainHero && (
          <div 
            id={`hero-article-${mainHero.id}`}
            onClick={() => onSelectArticle(mainHero)}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[380px] sm:min-h-[460px] flex flex-col justify-end border border-neutral-200 dark:border-neutral-800"
          >
            {/* Background Image with Hover Zoom Effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={mainHero.imageUrl}
                alt={mainHero.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Refined gradient overlay: ensures high legibility for white text */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/20" />
            </div>

            {/* Content Overlaid on Card */}
            <div className="relative z-10 p-5 sm:p-7 md:p-8 space-y-3">
              {/* Badges & Meta */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-700 text-white shadow-sm">
                  {mainHero.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/90 text-neutral-950 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Sorotan Khusus</span>
                </span>
                <span className="text-xs text-neutral-300 flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{mainHero.readTime}</span>
                </span>
              </div>

              {/* Judul Besar Gaya Serif */}
              <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-amber-300 transition-colors duration-200">
                {mainHero.title}
              </h1>

              {/* Excerpt singkat */}
              <p className="text-sm text-neutral-300 line-clamp-2 leading-relaxed hidden sm:block">
                {mainHero.excerpt}
              </p>

              {/* Metadata Penulis & Tanggal */}
              <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <img
                    src={mainHero.author.avatar}
                    alt={mainHero.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-400"
                  />
                  <div>
                    <span className="font-semibold text-white block">{mainHero.author.name}</span>
                    <span className="text-[11px] text-neutral-400">{mainHero.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{mainHero.date}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. ARTIKEL BERUKURAN LEBIH KECIL (KANAN: 5 cols) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {displaySubs.map((item, index) => (
            <div
              key={item.id}
              id={`hero-sub-${item.id}`}
              onClick={() => onSelectArticle(item)}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 min-h-[140px] sm:min-h-[146px] flex flex-col justify-end border border-neutral-200 dark:border-neutral-800"
            >
              {/* Thumbnail Image with Zoom */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/20" />
              </div>

              {/* Overlaid Content */}
              <div className="relative z-10 p-3.5 sm:p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                    item.category === 'Bahtsul Masail' 
                      ? 'bg-amber-600 text-white'
                      : item.category === 'Nisaiyat'
                      ? 'bg-rose-700 text-white'
                      : 'bg-emerald-700 text-white'
                  }`}>
                    {item.category}
                  </span>

                  <span className="text-[11px] text-neutral-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {/* Judul Serif Tegas */}
                <h3 className="font-heading text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                {/* Author & Read More Indicator */}
                <div className="flex items-center justify-between text-[11px] text-neutral-300 pt-1">
                  <span className="truncate max-w-[200px]">
                    Oleh: <strong className="text-white font-medium">{item.author.name}</strong>
                  </span>
                  <span className="inline-flex items-center text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Baca <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
