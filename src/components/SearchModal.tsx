import React, { useState } from 'react';
import { Search, X, Calendar, ArrowRight, Eye } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
  darkMode
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = query.trim() === ''
    ? []
    : articles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        a.author.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[80vh] ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-800'
        }`}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600 dark:text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Cari judul berita, fatwa bahtsul masail, kajian syaikhuna..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder-neutral-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions Area */}
        <div className="overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-8 space-y-3">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold block">
                Topik Populer Pesantren:
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                {['Bahtsul Masail', 'Ihya Ulumiddin', 'PSB 1448 H', 'Fiqih Wanita', 'Adab Santri', 'Syaikhuna'].map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => setQuery(keyword)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              Tidak ditemukan artikel dengan kata kunci "<strong className="text-neutral-700 dark:text-neutral-200">{query}</strong>".
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Ditemukan {searchResults.length} Artikel Terkait:
              </div>
              {searchResults.map(res => (
                <div
                  key={res.id}
                  onClick={() => {
                    onSelectArticle(res);
                    onClose();
                  }}
                  className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    darkMode ? 'bg-neutral-800/40 border-neutral-700/60 hover:bg-neutral-800' : 'bg-neutral-50 border-neutral-200 hover:bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={res.imageUrl}
                      alt={res.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-amber-400 block">
                        {res.category}
                      </span>
                      <h4 className="font-heading text-sm font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors">
                        {res.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span>{res.author.name}</span>
                        <span>•</span>
                        <span>{res.date}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-600 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
