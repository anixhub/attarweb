import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SocialStatsBar } from './components/SocialStatsBar';
import { ContentCategories } from './components/ContentCategories';
import { VideoSection } from './components/VideoSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { InstitutionModal, InstitutionTab } from './components/InstitutionModal';
import { PendaftaranModal } from './components/PendaftaranModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UserPortal } from './components/UserPortal';
import { ARTICLES_DATA, SOCIAL_STATS, VIDEO_PLAYLIST, INITIAL_REGISTRATIONS, DEMO_USERS } from './data/mockData';
import { Article, CategoryType, UserAccount, SantriRegistration, RegistrationStatus } from './types';
import { ShieldCheck, User, Sparkles, X } from 'lucide-react';

export default function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('attaroqqy_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('attaroqqy_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Registrations state (synced with localStorage)
  const [registrations, setRegistrations] = useState<SantriRegistration[]>(() => {
    const saved = localStorage.getItem('attaroqqy_registrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_REGISTRATIONS;
      }
    }
    return INITIAL_REGISTRATIONS;
  });

  // Articles state (supports dynamic publishing by Admin)
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('attaroqqy_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ARTICLES_DATA;
      }
    }
    return ARTICLES_DATA;
  });

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Semua');

  // Active Article for Modal Reader
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  // Institution & Syaikhuna Profile Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<InstitutionTab>('profil');

  // Pendaftaran PSB Modal
  const [isPendaftaranOpen, setIsPendaftaranOpen] = useState(false);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Auth & Dashboard Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [authInitialRole, setAuthInitialRole] = useState<'admin' | 'santri'>('santri');
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isUserPortalOpen, setIsUserPortalOpen] = useState(false);

  // Demo Banner Visibility
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  useEffect(() => {
    localStorage.setItem('attaroqqy_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleOpenProfile = (tab: 'profil' | 'visi-misi' | 'pengasuh' | 'lingkungan' = 'profil') => {
    setActiveProfileTab(tab);
    setIsProfileModalOpen(true);
  };

  const handleOpenSyaikhuna = (tab: 'biografi' | 'mawaidh' = 'biografi') => {
    setActiveProfileTab(tab);
    setIsProfileModalOpen(true);
  };

  // Auth Handlers
  const handleOpenAuth = (tab: 'login' | 'register' = 'login', role: 'admin' | 'santri' = 'santri') => {
    setAuthInitialTab(tab);
    setAuthInitialRole(role);
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem('attaroqqy_current_user', JSON.stringify(user));
    if (user.role === 'admin') {
      setIsAdminDashboardOpen(true);
    } else {
      setIsUserPortalOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('attaroqqy_current_user');
    setIsAdminDashboardOpen(false);
    setIsUserPortalOpen(false);
  };

  // Quick switch between demo roles from anywhere
  const handleSwitchDemoRole = (role: 'admin' | 'santri') => {
    const demo = DEMO_USERS.find(u => u.role === role);
    if (demo) {
      handleLoginSuccess(demo);
    }
  };

  // PSB Registration Handlers
  const handleAddNewRegistration = (newReg: SantriRegistration) => {
    const updated = [newReg, ...registrations];
    setRegistrations(updated);
    localStorage.setItem('attaroqqy_registrations', JSON.stringify(updated));
  };

  const handleUpdateRegistrationStatus = (
    id: string, 
    newStatus: RegistrationStatus, 
    note?: string, 
    jadwalTes?: string
  ) => {
    const updated = registrations.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: newStatus,
          catatanPengurus: note !== undefined ? note : r.catatanPengurus,
          jadwalTes: jadwalTes !== undefined ? jadwalTes : r.jadwalTes
        };
      }
      return r;
    });
    setRegistrations(updated);
    localStorage.setItem('attaroqqy_registrations', JSON.stringify(updated));
  };

  // Admin Publish Article Handler
  const handlePublishArticle = (newArticleData: Omit<Article, 'id' | 'views'>) => {
    const newArticle: Article = {
      ...newArticleData,
      id: `art-${Date.now()}`,
      views: 120
    };
    const updated = [newArticle, ...articles];
    setArticles(updated);
    localStorage.setItem('attaroqqy_articles', JSON.stringify(updated));
  };

  // Get related articles for modal reader
  const relatedArticles = activeArticle 
    ? articles.filter(a => a.id !== activeArticle.id && a.category === activeArticle.category)
    : [];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${
      darkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50/70 text-neutral-900'
    }`}>
      
      {/* Quick Demo Helper Banner (Explaining Admin & User registration flow) */}
      {showDemoBanner && (
        <div className={`py-2 px-4 border-b text-xs transition-all ${
          darkMode ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-200' : 'bg-emerald-800 text-white border-emerald-900'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Sistem Akun & PSB At-Taroqqy Aktif:</strong> Uji alur pendaftaran sebagai Calon Santri atau Pengurus Admin.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSwitchDemoRole('admin')}
                className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer"
                title="Buka akun Admin Panitia PSB & Redaksi"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Tes Sebagai Admin</span>
              </button>

              <button
                onClick={() => handleSwitchDemoRole('santri')}
                className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs cursor-pointer"
                title="Buka akun Calon Santri Pendaftar"
              >
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Tes Sebagai Santri</span>
              </button>

              <button
                onClick={() => setShowDemoBanner(false)}
                aria-label="Tutup Banner"
                className="p-1 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. HEADER & TOP NAVIGATION */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('kategori-konten-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenProfile={handleOpenProfile}
        onOpenSyaikhuna={handleOpenSyaikhuna}
        onOpenPendaftaran={() => setIsPendaftaranOpen(true)}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenUserPortal={() => setIsUserPortalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. MAIN HOMEPAGE CONTENT */}
      <main className="flex-1 w-full">
        
        {/* HERO SECTION (AL-ANWAR / AT-TAROQQY NEWS MASONRY GRID) */}
        <HeroSection
          articles={articles}
          onSelectArticle={(article) => setActiveArticle(article)}
          darkMode={darkMode}
        />

        {/* SOSIAL MEDIA STATISTIK BAR (56k FB, 143k IG, 183k YT, 42k X) */}
        <SocialStatsBar
          stats={SOCIAL_STATS}
          darkMode={darkMode}
        />

        {/* KATEGORI KONTEN (BAHTSUL MASAIL, ARTIKEL, HIKMAH, NISAIYAT, TERPOPULER) */}
        <div id="kategori-konten-section">
          <ContentCategories
            articles={articles}
            onSelectArticle={(article) => setActiveArticle(article)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            darkMode={darkMode}
          />
        </div>

        {/* INTEGRASI VIDEO YOUTUBE & PLAYLIST PENGAJIAN LIVE */}
        <VideoSection
          videos={VIDEO_PLAYLIST}
          darkMode={darkMode}
        />

      </main>

      {/* 3. FOOTER */}
      <Footer
        darkMode={darkMode}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('kategori-konten-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenProfile={handleOpenProfile}
        onOpenSyaikhuna={handleOpenSyaikhuna}
        onOpenPendaftaran={() => setIsPendaftaranOpen(true)}
      />

      {/* 4. MODALS & INTERACTIVE OVERLAYS */}
      
      {/* Article Detail Reader Modal */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onSelectRelated={(article) => setActiveArticle(article)}
        relatedArticles={relatedArticles}
        darkMode={darkMode}
      />

      {/* Institution / Syaikhuna Profile Modal */}
      <InstitutionModal
        isOpen={isProfileModalOpen}
        activeTab={activeProfileTab}
        onClose={() => setIsProfileModalOpen(false)}
        onTabChange={(tab) => setActiveProfileTab(tab)}
        darkMode={darkMode}
        onOpenPendaftaran={() => setIsPendaftaranOpen(true)}
      />

      {/* Pendaftaran Santri Baru (PSB) Modal */}
      <PendaftaranModal
        isOpen={isPendaftaranOpen}
        onClose={() => setIsPendaftaranOpen(false)}
        darkMode={darkMode}
        currentUser={currentUser}
        onAddNewRegistration={handleAddNewRegistration}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        onSelectArticle={(article) => setActiveArticle(article)}
        darkMode={darkMode}
      />

      {/* Authentication Modal (Login / Register User & Admin) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        darkMode={darkMode}
        initialTab={authInitialTab}
        initialRole={authInitialRole}
      />

      {/* Admin Dashboard (Pengurus & Redaksi) */}
      {currentUser?.role === 'admin' && (
        <AdminDashboard
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          registrations={registrations}
          onUpdateRegistrationStatus={handleUpdateRegistrationStatus}
          articles={articles}
          onPublishArticle={handlePublishArticle}
          darkMode={darkMode}
        />
      )}

      {/* User / Santri Portal */}
      {currentUser?.role === 'santri' && (
        <UserPortal
          isOpen={isUserPortalOpen}
          onClose={() => setIsUserPortalOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          registrations={registrations}
          onOpenPendaftaran={() => setIsPendaftaranOpen(true)}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}
