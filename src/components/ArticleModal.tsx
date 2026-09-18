import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Copy,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectRelated: (article: Article) => void;
  relatedArticles: Article[];
  darkMode: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectRelated,
  relatedArticles,
  darkMode
}) => {
  if (!article) return null;

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`*${article.title}*\n\nBaca artikel selengkapnya di Portal Pondok Pesantren At-Taroqqy:\n${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" via Portal Berita Pesantren At-Taroqqy`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getContentFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl border overflow-hidden my-auto max-h-[92vh] flex flex-col ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Sticky Header Actions */}
        <div className={`px-4 sm:px-6 py-3.5 border-b flex items-center justify-between z-20 sticky top-0 ${
          darkMode ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-neutral-100'
        }`}>
          {/* Category badge */}
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
              article.category === 'Bahtsul Masail'
                ? 'bg-amber-600 text-white'
                : article.category === 'Nisaiyat'
                ? 'bg-rose-700 text-white'
                : 'bg-emerald-700 text-white'
            }`}>
              {article.category}
            </span>
            <span className="text-xs text-neutral-400 hidden sm:inline">
              Portal Berita & Kajian Turats At-Taroqqy
            </span>
          </div>

          {/* Controls: Font Size, Bookmark, Share, Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size toggles */}
            <div className="hidden sm:flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded ${fontSize === 'normal' ? 'bg-emerald-700 text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                title="Ukuran Font Normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded text-sm ${fontSize === 'large' ? 'bg-emerald-700 text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                title="Ukuran Font Sedang"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded text-base ${fontSize === 'xlarge' ? 'bg-emerald-700 text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                title="Ukuran Font Besar"
              >
                A++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Simpan Artikel"
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-500 border-amber-500 text-neutral-950 font-bold' 
                  : darkMode ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
              title={isBookmarked ? 'Artikel Disimpan' : 'Simpan Artikel'}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>

            {/* Close modal button */}
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
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto px-4 sm:px-8 py-6 space-y-6">
          
          {/* Article Title: Elegantly Styled Serif */}
          <div className="space-y-3">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-neutral-900 dark:text-white">
              {article.title}
            </h1>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-4 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
              {/* Author Details */}
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 dark:border-amber-400 shadow-sm"
                />
                <div>
                  <span className="font-bold text-sm text-neutral-900 dark:text-white block">
                    {article.author.name}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-xs">
                    {article.author.role}
                  </span>
                </div>
              </div>

              {/* Date & Views */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                  <span>{article.date}</span>
                </div>
                {article.hijriDate && (
                  <span className="text-amber-600 dark:text-amber-400 font-medium hidden sm:inline">
                    ({article.hijriDate})
                  </span>
                )}
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>{article.readTime}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-neutral-400" />
                  <span>{article.views.toLocaleString('id-ID')} dibaca</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800 max-h-[440px] relative bg-neutral-950">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-3 text-[10px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
              Dokumentasi Media At-Taroqqy
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-xs">
            <span className="font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
              <span>Bagikan Nasihat & Warta Ini:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-lg font-semibold bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleShareTwitter}
                className="px-3 py-1.5 rounded-lg font-semibold bg-[#1DA1F2] hover:bg-[#1a90d9] text-white flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Twitter className="w-3.5 h-3.5" />
                <span>X / Twitter</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg font-semibold bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin Tautan'}</span>
              </button>
            </div>
          </div>

          {/* Article Excerpt Callout */}
          <div className="p-4 rounded-xl border-l-4 border-emerald-600 dark:border-amber-400 bg-emerald-50/50 dark:bg-emerald-950/20 text-neutral-800 dark:text-neutral-200 italic font-heading text-lg">
            "{article.excerpt}"
          </div>

          {/* Article Full Paragraphs */}
          <div className={`space-y-4 font-sans ${getContentFontSizeClass()} text-neutral-800 dark:text-neutral-200`}>
            {article.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {idx === 0 && (
                  <span className="font-heading font-bold text-3xl float-left mr-2 leading-none text-emerald-700 dark:text-amber-400">
                    {p.charAt(0)}
                  </span>
                )}
                {idx === 0 ? p.slice(1) : p}
              </p>
            ))}

            {/* Authentic Islamic Pesantren Citation Box */}
            <div className="my-6 p-4 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/60 dark:bg-amber-950/20 text-neutral-900 dark:text-amber-100 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>Rujukan Nash Turats / Maktabah At-Taroqqy</span>
              </div>
              <p className="font-arabic text-lg sm:text-xl text-right leading-loose tracking-wide pt-1">
                "وَاعْلَمْ أَنَّ الْعِلْمَ النَّافِعَ هُوَ الَّذِي يَزِيدُ فِي خَوْفِكَ مِنَ اللَّهِ تَعَالَى، وَيَزِيدُ فِي بَصِيرَتِكَ بِعُيُوبِ نَفْسِكَ، وَيُزَهِّدُكَ فِي الدُّنْيَا"
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 italic">
                (Kutipan Bidayatul Hidayah / Ihya' Ulumiddin karya Hujjatul Islam Imam Al-Ghazali)
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Tagar Terkait:
            </span>
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
              <h4 className="font-cinzel text-base font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                Kajian & Warta Terkait
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className={`group p-3 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer flex gap-3 ${
                      darkMode ? 'bg-neutral-800/60 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={rel.imageUrl}
                        alt={rel.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-amber-400 uppercase">
                        {rel.category}
                      </span>
                      <h5 className="font-heading text-xs sm:text-sm font-bold line-clamp-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors">
                        {rel.title}
                      </h5>
                      <span className="text-[10px] text-neutral-400 block">
                        {rel.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
