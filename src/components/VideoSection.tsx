import React, { useState } from 'react';
import { Youtube, Play, Radio, Clock, Eye, Share2, Check } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoSectionProps {
  videos: VideoItem[];
  darkMode: boolean;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ videos, darkMode }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyVideoLink = () => {
    navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 border-b-2 border-emerald-700 dark:border-amber-500">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                AT-TAROQQY TV MULTIMEDIA
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 border border-red-300 dark:border-red-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                <span>SIARAN DAKWAH</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 -mt-0.5">
              Live Streaming Pengajian Kitab Kuning & Dokumentasi Tausiyah Masyayikh
            </p>
          </div>
        </div>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Youtube className="w-4 h-4" />
          <span>Langganan 183k Santri</span>
        </a>
      </div>

      {/* Main Video Layout: Left (Player 65%), Right (Playlist 35%) */}
      <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${
        darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-900 text-white border-neutral-800 shadow-xl'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ================= LEFT: ACTIVE EMBEDDED VIDEO ================= */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* 16:9 Aspect Ratio Video Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl group">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                /* Poster Image with Custom Play Overlay */
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer"
                >
                  <img
                    src={activeVideo.thumbnail}
                    alt={activeVideo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-neutral-950/50 backdrop-blur-xs group-hover:bg-neutral-950/40 transition-colors" />

                  {/* Play Button Pulsing */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Live badge overlay if live */}
                  {activeVideo.isLive && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      <span>LIVE SEKARANG</span>
                    </div>
                  )}

                  {/* Duration overlay */}
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-mono font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeVideo.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Details Bar */}
            <div className="pt-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {activeVideo.kitab && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-neutral-950">
                      {activeVideo.kitab}
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{activeVideo.views}</span>
                  </span>
                  <span className="text-xs text-neutral-400">• {activeVideo.date}</span>
                </div>

                <button
                  onClick={handleCopyVideoLink}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Tersalin!' : 'Bagikan Video'}</span>
                </button>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
                {activeVideo.title}
              </h3>

              <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                <span>Pengampu:</span>
                <strong className="text-amber-400 font-semibold">{activeVideo.speaker}</strong>
              </p>
            </div>
          </div>

          {/* ================= RIGHT: PLAYLIST SELECTIONS ================= */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Daftar Putar Terbaru
              </span>
              <span className="text-[11px] text-neutral-400">
                {videos.length} Rekaman Terpilih
              </span>
            </div>

            {/* Scrollable Playlist Items */}
            <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1">
              {videos.map((vid) => {
                const isSelected = vid.id === activeVideo.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setActiveVideo(vid);
                      setIsPlaying(true);
                    }}
                    className={`group p-2.5 rounded-xl transition-all cursor-pointer flex gap-3 border ${
                      isSelected
                        ? 'bg-neutral-800/90 border-amber-500/60 shadow-md'
                        : 'bg-neutral-950/40 border-neutral-800/80 hover:bg-neutral-800/50 hover:border-neutral-700'
                    }`}
                  >
                    {/* Thumbnail Mini with Duration */}
                    <div className="relative w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-neutral-800">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {vid.isLive ? (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold">
                          LIVE
                        </div>
                      ) : (
                        <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 text-white text-[9px] font-mono">
                          {vid.duration}
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
                          <Play className="w-5 h-5 text-amber-400 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h4 className={`text-xs font-bold line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors ${
                        isSelected ? 'text-amber-300' : 'text-neutral-200'
                      }`}>
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {vid.speaker}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                        <span>{vid.views}</span>
                        <span>•</span>
                        <span>{vid.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
