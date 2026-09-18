export type CategoryType = 
  | 'Semua'
  | 'Berita'
  | 'Bahtsul Masail'
  | 'Artikel'
  | 'Hikmah'
  | 'Nisaiyat'
  | 'Syaikhuna';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  excerpt: string;
  content: string[];
  imageUrl: string;
  author: Author;
  date: string;
  hijriDate?: string;
  readTime: string;
  views: number;
  isHeroMain?: boolean;
  isHeroSub?: boolean;
  isPopular?: boolean;
  tags: string[];
}

export interface SocialStat {
  platform: 'Facebook' | 'Instagram' | 'YouTube' | 'X';
  name: string;
  followers: string;
  numericFollowers: number;
  handle: string;
  actionText: string;
  iconName: string;
  accentColor: string;
  url: string;
}

export interface VideoItem {
  id: string;
  title: string;
  speaker: string;
  kitab?: string;
  date: string;
  duration: string;
  youtubeId: string;
  isLive: boolean;
  views: string;
  thumbnail: string;
}

export interface PengasuhProfile {
  name: string;
  title: string;
  role: string;
  bio: string;
  quote: string;
  image: string;
}

export interface InstitutionalProfile {
  name: string;
  arabicName: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  establishedYear: number;
  history: string;
  vision: string;
  mission: string[];
  pengasuhList: PengasuhProfile[];
  facilities: { title: string; desc: string; icon: string; image: string }[];
}

export type UserRole = 'admin' | 'santri';

export type RegistrationStatus = 
  | 'menunggu'
  | 'verifikasi'
  | 'jadwal_tes'
  | 'diterima'
  | 'ditolak';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  regCode?: string;
  createdAt: string;
}

export interface SantriRegistration {
  id: string;
  regCode: string;
  userId?: string;
  namaLengkap: string;
  jenisKelamin: 'Putra' | 'Putri';
  tempatLahir: string;
  tanggalLahir: string;
  namaWali: string;
  noWhatsapp: string;
  email?: string;
  jenjang: string;
  asalDaerah: string;
  catatan?: string;
  status: RegistrationStatus;
  tanggalDaftar: string;
  jadwalTes?: string;
  catatanPengurus?: string;
}

