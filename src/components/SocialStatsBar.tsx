import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Twitter, Check, Bell, Share2, ExternalLink } from 'lucide-react';
import { SocialStat } from '../types';

interface SocialStatsBarProps {
  stats: SocialStat[];
  darkMode: boolean;
}

export const SocialStatsBar: React.FC<SocialStatsBarProps> = ({ stats, darkMode }) => {
  const [followedPlatforms, setFollowedPlatforms] = useState<Record<string, boolean>>({});
  const [notificationStatus, setNotificationStatus] = useState<string | null>(null);

  const handleFollowClick = (platform: string, name: string) => {
    const isNowFollowed = !followedPlatforms[platform];
    setFollowedPlatforms(prev => ({ ...prev, [platform]: isNowFollowed }));
    
    if (isNowFollowed) {
      setNotificationStatus(`Alhamdulillah! Terima kasih telah mengikuti kanal ${name}.`);
      setTimeout(() => setNotificationStatus(null), 3500);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Facebook':
        return <Facebook className="w-5 h-5 text-[#1877F2]" />;
      case 'Instagram':
        return <Instagram className="w-5 h-5 text-[#E4405F]" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5 text-[#FF0000]" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5 text-[#1DA1F2]" />;
      default:
        return <Share2 className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-6">
      {/* Container Box with Subtle Islamic Gradient Border */}
      <div className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 shadow-sm ${
        darkMode 
          ? 'bg-neutral-900/90 border-neutral-800' 
          : 'bg-white border-neutral-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-amber-400 block">
              Jejaring Media Resmi
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              Terhubung dengan Komunitas & Siaran Dakwah At-Taroqqy
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Bell className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Update pengajian live & fatwa terbaru setiap hari</span>
          </div>
        </div>

        {/* Feedback notification toast if user clicks follow */}
        {notificationStatus && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
            <span>{notificationStatus}</span>
            <button 
              onClick={() => setNotificationStatus(null)}
              className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
            >
              Tutup
            </button>
          </div>
        )}

        {/* 4 Social Cards in a Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const isFollowed = !!followedPlatforms[stat.platform];

            return (
              <div
                key={stat.platform}
                id={`social-card-${stat.platform.toLowerCase()}`}
                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex items-center justify-between ${
                  darkMode 
                    ? 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-neutral-50/80 border-neutral-200 hover:border-emerald-300'
                }`}
              >
                {/* Left side: Icon and Numbers */}
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    darkMode ? 'bg-neutral-800' : 'bg-white shadow-sm'
                  }`}>
                    {renderIcon(stat.iconName)}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xl sm:text-2xl text-neutral-900 dark:text-white leading-none">
                        {stat.followers}
                      </span>
                      <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-tighter">
                        Followers
                      </span>
                    </div>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 block mt-0.5 truncate max-w-[120px]">
                      {stat.name}
                    </span>
                  </div>
                </div>

                {/* Right side: Action Follow / Subscribe Button */}
                <button
                  onClick={() => handleFollowClick(stat.platform, stat.name)}
                  aria-label={`${stat.actionText} ${stat.name}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    isFollowed
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : stat.platform === 'YouTube'
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                      : darkMode
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                      : 'bg-white hover:bg-emerald-50 text-neutral-800 border border-neutral-300 hover:border-emerald-500'
                  }`}
                >
                  {isFollowed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Mengikuti</span>
                    </>
                  ) : (
                    <>
                      <span>{stat.actionText}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
