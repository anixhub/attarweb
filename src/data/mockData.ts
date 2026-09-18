import { Article, SocialStat, VideoItem, InstitutionalProfile } from '../types';

export const INSTITUTION_INFO: InstitutionalProfile = {
  name: "Pondok Pesantren At-Taroqqy",
  arabicName: "معهد الترقي الإسلامي السلفي",
  tagline: "Mencetak Generasi Mutafaqqih fid-Din, Berakhlak Al-Karimah, dan Berwawasan Rahmatan lil 'Alamin",
  location: "Desa Sedan, Kec. Sedan, Kab. Rembang / Waru - Jawa Tengah, Indonesia",
  email: "attaroqqy.warusedan@gmail.com",
  phone: "+62 812-3456-7890",
  establishedYear: 1985,
  history: "Pondok Pesantren At-Taroqqy didirikan dengan tekad mulia melestarikan tradisi keilmuan Islam Ahlussunnah wal Jama'ah an-Nahdliyyah, memadukan ketajaman kajian turats (kitab kuning) dengan pembinaan adab santri yang kokoh.",
  vision: "Menjadi pusat pendidikan Islam salafiyah unggul yang melahirkan ulama, cendekiawan muslim yang faqih fiddin, tawadhu', dan mengabdi untuk kemaslahatan umat serta bangsa.",
  mission: [
    "Menyelenggarakan kajian kitab turats secara berjenjang dan berkesinambungan (Madrasah Diniyyah & Sorogan).",
    "Menanamkan nilai-nilai ketakwaan, tasawuf akhlaqi, kemandirian, dan khidmah kepada masyarakat.",
    "Mengembangkan nalar kritis dan literasi ilmiah melalui tradisi Bahtsul Masail diniyyah.",
    "Membina santri agar siap berdakwah dengan santun, toleran, dan solutif terhadap problematika kontemporer."
  ],
  pengasuhList: [
    {
      name: "K.H. Ahmad Maimoen Taroqqy",
      title: "Pengasuh Utama / Khadimul Ma'had",
      role: "Pengampu Pengajian Ihya' 'Ulumiddin & Tafsir Al-Qur'an",
      bio: "Ulama kharismatik yang mengabdikan hidupnya dalam mendidik ribuan santri dengan pendekatan keilmuan sanad muttashil dan keteladanan akhlak sufi.",
      quote: "Ilmu itu bukan sekadar hafalan bait dan matan, melainkan cahaya (nur) yang melahirkan rasa takut kepada Allah dan kelembutan sikap kepada sesama hamba.",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Nyai Hj. Siti Aminah Taroqqy",
      title: "Pengasuh Pondok Pesantren Putri (Nisaiyat)",
      role: "Pembina Keputrian & Kajian Fiqhun Nisa'",
      bio: "Sosok pendidik teladan yang memimpin santriwati At-Taroqqy dalam keagungan budi pekerti, hafalan Al-Qur'an, dan kajian fiqih praktis muslimah.",
      quote: "Wanita shalehah adalah pilar peradaban. Kuasai agamamu dengan baik agar menjadi madrasah pertama yang utama bagi generasi Islam mendatang.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    }
  ],
  facilities: [
    {
      title: "Masjid Jami' At-Taroqqy",
      desc: "Pusat ibadah jama'ah, pengajian umum, sima'an Al-Qur'an, dan pembacaan ratib.",
      icon: "Building2",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Perpustakaan Maktabah Turats",
      desc: "Menyimpan ribuan jilid kitab kuning klasik, manuskrip fiqih, tafsir, hadits, dan literatur ilmiah kontemporer.",
      icon: "BookOpen",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Asrama Santri yang Asri",
      desc: "Kompleks asrama putra dan putri yang terpisah dengan suasana bersih, tenang, dan kondusif untuk belajar.",
      icon: "Home",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Aula Bahtsul Masail & Auditorium",
      desc: "Ruang forum musyawarah kitab, seminar ilmiah santri, dan peringatan hari besar Islam.",
      icon: "Users",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

export const SOCIAL_STATS: SocialStat[] = [
  {
    platform: 'Facebook',
    name: 'Fans Page FB',
    followers: '56k',
    numericFollowers: 56200,
    handle: 'Pondok Pesantren At-Taroqqy',
    actionText: 'Ikuti di FB',
    iconName: 'Facebook',
    accentColor: '#1877F2',
    url: 'https://facebook.com'
  },
  {
    platform: 'Instagram',
    name: 'Instagram Official',
    followers: '143k',
    numericFollowers: 143800,
    handle: '@attaroqqy.official',
    actionText: 'Follow Kami',
    iconName: 'Instagram',
    accentColor: '#E4405F',
    url: 'https://instagram.com'
  },
  {
    platform: 'YouTube',
    name: 'YouTube Subscribers',
    followers: '183k',
    numericFollowers: 183500,
    handle: 'At-Taroqqy TV Official',
    actionText: 'Subscribe YT',
    iconName: 'Youtube',
    accentColor: '#FF0000',
    url: 'https://youtube.com'
  },
  {
    platform: 'X',
    name: 'X (Twitter)',
    followers: '42k',
    numericFollowers: 42100,
    handle: '@attaroqqy',
    actionText: 'Follow di X',
    iconName: 'Twitter',
    accentColor: '#1DA1F2',
    url: 'https://twitter.com'
  }
];

export const ARTICLES_DATA: Article[] = [
  // HERO MAIN (Featured Utama Kiri)
  {
    id: 'hero-1',
    title: "Kajian Kitab Ihya' 'Ulumiddin & Relevansi Akhlak Tasawuf Santri di Era Transformasi Digital",
    slug: 'kajian-ihya-ulumiddin-era-digital',
    category: 'Syaikhuna',
    excerpt: "Syaikhuna menegaskan bahwa pesatnya perkembangan kecerdasan buatan dan media sosial menuntut benteng ruhani yang kuat. Santri wajib mengimbangi literasi teknologi dengan adab dan kebersihan hati.",
    content: [
      "Di tengah deru revolusi informasi yang menuntut kecepatan instan, Pondok Pesantren At-Taroqqy kembali meneguhkan komitmen melestarikan pembacaan dan penghayatan karya agung Hujjatul Islam Imam Al-Ghazali, Kitab Ihya' 'Ulumiddin.",
      "Dalam dawuh mawaidh malam Jum'at di serambi Masjid Jami' At-Taroqqy, Syaikhuna menggarisbawahi bahwa bahaya terbesar abad ini bukan terletak pada kecanggihan mesin, melainkan pada kekeringan spiritual dan penyakit hati (amradhul qulub) seperti riya', 'ujub, dan hasad yang dengan mudah menyebar lewat ruang maya.",
      "\"Santri tidak boleh anti-teknologi, namun teknologi harus tunduk pada bimbingan syariat dan adab. Hati yang bersih (qalbun salim) adalah filter terbaik ketika mata dan jemari kita berinteraksi di ruang media digital,\" tutur beliau di hadapan ribuan santri.",
      "Kajian ini diikuti secara khidmat oleh seluruh dewan asatidz dan santri tingkat 'Aliyah dan Ma'had Aly, sekaligus disiarkan secara langsung melalui saluran resmi At-Taroqqy TV yang disimak oleh ribuan alumni dari berbagai penjuru Nusantara."
    ],
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    author: {
      name: "Dewan Redaksi At-Taroqqy",
      role: "Lembaga Pers & Kajian Ma'had",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    date: "18 September 2026",
    hijriDate: "7 Rabi'ul Awwal 1448 H",
    readTime: "5 menit",
    views: 18450,
    isHeroMain: true,
    tags: ["Syaikhuna", "Tasawuf", "Ihya Ulumiddin", "Karakter Santri"]
  },

  // HERO SUB 1 (Kanan Atas 1)
  {
    id: 'hero-2',
    title: "Keputusan Bahtsul Masail Diniyyah: Status Hukum Transaksi Kripto dan Tokenisasi Aset Digital",
    slug: 'keputusan-bahtsul-masail-kripto-tokenisasi',
    category: 'Bahtsul Masail',
    excerpt: "Lajnah Bahtsul Masail At-Taroqqy merilis kajian mendalam merujuk nash kitab Fathul Wahhab dan Bughyatul Mustarsyidin terkait fiqih muamalah kontemporer.",
    content: [
      "Lajnah Bahtsul Masail Pondok Pesantren At-Taroqqy menggelar sidang pleno musyawarah kubro membahas keabsahan kepemilikan dan perdagangan aset digital berbasis desentralisasi.",
      "Musyawarah yang dihadiri para perumus dan musyawirin senior ini menyimpulkan syarat ketat 'mutaqawwam' dan terhindarnya unsur gharar (ketidakjelasan spekulatif) serta maysir.",
      "Hasil rumusan ini diharapkan menjadi panduan komprehensif bagi masyarakat santri dan pelaku ekonomi syariah di tanah air."
    ],
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Ridlwan Fadhli",
      role: "Ketua Lajnah Bahtsul Masail",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    date: "17 September 2026",
    hijriDate: "6 Rabi'ul Awwal 1448 H",
    readTime: "4 menit",
    views: 14210,
    isHeroSub: true,
    tags: ["Bahtsul Masail", "Fiqih Muamalah", "Ekonomi Syariah"]
  },

  // HERO SUB 2 (Kanan Atas 2)
  {
    id: 'hero-3',
    title: "Penerimaan Santri Baru (PSB) Tahun Ajaran 1448/2026 H: Kuota, Syarat & Alur Pendaftaran Online",
    slug: 'penerimaan-santri-baru-psb-attaroqqy-1448',
    category: 'Berita',
    excerpt: "Panitia PSB At-Taroqqy resmi membuka pendaftaran gelombang pertama untuk jenjang Salafiyah Wustha, 'Ulya, serta program Takhassus Tahfidz Al-Qur'an.",
    content: [
      "Pondok Pesantren At-Taroqqy membuka kesempatan bagi putra-putri terbaik muslimin dari seluruh nusantara untuk menimba ilmu agama secara intensif.",
      "Pendaftaran dibuka melalui portal website ini dengan melampirkan berkas administrasi dan mengikuti tes seleksi baca Al-Qur'an serta kitab dasar.",
      "Untuk menjaga rasio ideal pembinaan santri dan ketersediaan asrama, kuota tahun ini dibatasi secara selektif."
    ],
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Panitia PSB 1448 H",
      role: "Sekretariat Panitia Masuk",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
    },
    date: "16 September 2026",
    hijriDate: "5 Rabi'ul Awwal 1448 H",
    readTime: "3 menit",
    views: 22400,
    isHeroSub: true,
    isPopular: true,
    tags: ["Pendaftaran", "PSB", "Warta Santri"]
  },

  // HERO SUB 3 (Kanan Bawah 3)
  {
    id: 'hero-4',
    title: "Nisaiyat: Fiqih Ibadah Praktis Muslimah dan Peran Santri Putri dalam Pembangunan Karakter Umat",
    slug: 'nisaiyat-fiqih-ibadah-santri-putri',
    category: 'Nisaiyat',
    excerpt: "Kajian risalah haidh dan thaharah oleh Ibu Nyai Hj. Siti Aminah menekankan ketelitian fiqih wanita sebagai fondasi sahnya rukun-rukun ibadah sehari-hari.",
    content: [
      "Kompleks Pesantren Putri At-Taroqqy menggelar musyawarah khusus membahas risalatul mahidh karya para ulama Nusantara.",
      "Ibu Nyai Hj. Siti Aminah menegaskan bahwa kepahaman fiqih perempuan bukan sekadar ilmu teoritis, melainkan kewajiban 'ain yang menjaga kesucian shalat, puasa, dan thawaf.",
      "Santri putri dibekali simulasi perhitungan siklus thaharah dan tabel istihadhah secara ilmiah dan aplikatif."
    ],
    imageUrl: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ustadzah Khadijah Al-Hafizhah",
      role: "Pengajar Madrasah Diniyyah Putri",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    date: "15 September 2026",
    hijriDate: "4 Rabi'ul Awwal 1448 H",
    readTime: "6 menit",
    views: 16890,
    isHeroSub: true,
    tags: ["Nisaiyat", "Fiqih Wanita", "Santri Putri"]
  },

  // TERPOPULER LIST ITEMS (ranked)
  {
    id: 'pop-1',
    title: "Adab Santri Menghadapi Guru: Meneladani Kitab Ta'limul Muta'allim dalam Keseharian di Pondok",
    slug: 'adab-santri-menghadapi-guru-talim-mutaallim',
    category: 'Hikmah',
    excerpt: "Keberkahan ilmu tidak diukur dari seberapa banyak buku yang dilahap, melainkan dari sejauh mana takzim dan penghormatan kepada guru yang mengajar.",
    content: [
      "Salah satu rukun terbesar keberkahan ilmu yang diajarkan oleh Syaikh Az-Zarnuji adalah menghormati guru dan ahli ilmu.",
      "Santri diajarkan tidak memotong pembicaraan masyayikh, mendoakan dalam sujud sepertiga malam, dan selalu menjaga amanah keilmuan.",
      "Inilah warisan pesantren yang tetap kokoh membedakan santri dengan sekadar pencari gelar akademis."
    ],
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Syukron Habibie",
      role: "Lurah Pondok Pesantren",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
    },
    date: "14 September 2026",
    hijriDate: "3 Rabi'ul Awwal 1448 H",
    readTime: "4 menit",
    views: 31200,
    isPopular: true,
    tags: ["Hikmah", "Adab", "Santri", "Talim"]
  },
  {
    id: 'pop-2',
    title: "Tanya Jawab Syariat: Hukum Shalat Berjama'ah Mengikuti Siaran Suara Speaker yang Terputus Jalan Raya",
    slug: 'hukum-shalat-berjamaah-terputus-jalan-raya',
    category: 'Bahtsul Masail',
    excerpt: "Penjelasan ibarat kitab Fathul Mu'in dan Tuhfatul Muhtaj mengenai syarat sah ittishalush-shufuf (ketersambungan barisan makmum).",
    content: [
      "Pertanyaan masyarakat terkait membludaknya jama'ah shalat Idul Fitri hingga meluber melewati jalan raya besar diulas tuntas oleh Lajnah Bahtsul Masail.",
      "Dipaparkan batasan jarak maksimal 300 hasta dan tidak adanya dinding penghalang atau jalanan ramai yang memutuskan ketersambungan.",
      "Penjelasan ini dilengkapi skema tata letak shaf cadangan untuk memandu ta'mir masjid setempat."
    ],
    imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Ridlwan Fadhli",
      role: "Ketua Lajnah Bahtsul Masail",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    date: "13 September 2026",
    hijriDate: "2 Rabi'ul Awwal 1448 H",
    readTime: "5 menit",
    views: 28450,
    isPopular: true,
    tags: ["Bahtsul Masail", "Shalat Jamaah", "Fathul Muin"]
  },
  {
    id: 'pop-3',
    title: "Mengapa Kitab Jurumiyah Menjadi Pondok Pertama Belajar Tata Bahasa Arab di Pesantren?",
    slug: 'mengapa-kitab-jurumiyah-menjadi-pondasi-nahwu',
    category: 'Artikel',
    excerpt: "Menelusuri sejarah keikhlasan Ibnu Ajurrum yang melempar manuskripnya ke laut dan bagaimana kitab tipis ini membimbing jutaan santri memahami Al-Qur'an.",
    content: [
      "Al-Jurumiyah karya Abu Abdillah Muhammad bin Dawud ash-Shanhaji telah diajarkan berabad-abad di tanah air.",
      "Keistimewaannya terletak pada ringkasan kaidah nahwu yang terstruktur, mudah dihafal nadhamnya, serta berkah keikhlasan sang muallif.",
      "Di At-Taroqqy, seluruh santri baru mengawali perjalanannya dengan menuntaskan matan ini sebelum melangkah ke Imrithi dan Alfiyah Ibnu Malik."
    ],
    imageUrl: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "H. Abdullah Faqih, M.Ag",
      role: "Dosen Ma'had Aly At-Taroqqy",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80"
    },
    date: "12 September 2026",
    hijriDate: "1 Rabi'ul Awwal 1448 H",
    readTime: "5 menit",
    views: 24700,
    isPopular: true,
    tags: ["Artikel", "Nahwu", "Jurumiyah", "Turats"]
  },
  {
    id: 'pop-4',
    title: "Peringatan Maulid Nabi Muhammad SAW 1448 H: Semarak 10.000 Santri dan Pembacaan Simtuddurar",
    slug: 'peringatan-maulid-nabi-1448h-simtuddurar',
    category: 'Berita',
    excerpt: "Gema shalawat membahana di pelataran Pondok Pesantren At-Taroqqy dalam memperingati kelahiran Rasulullah SAW bersama para habaib dan masyayikh.",
    content: [
      "Rangkaian maulid akbar berlangsung penuh haru dan syahdu, dihadiri santri, wali santri, dan masyarakat dari berbagai daerah.",
      "Pembacaan bait-bait Maulid Simtuddurar diiringi lantunan hadrah santri menggetarkan sanubari para hadirin.",
      "Dalam mau'idhahnya, Syaikhuna berpesan agar cinta kepada Rasulullah diwujudkan dalam pengamalan sunnah dan akhlak mulia dalam kehidupan bermasyarakat."
    ],
    imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Tim Liputan Media Santri",
      role: "Humas Pesantren",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
    },
    date: "11 September 2026",
    hijriDate: "30 Shafar 1448 H",
    readTime: "3 menit",
    views: 21300,
    isPopular: true,
    tags: ["Berita", "Maulid", "Shalawat"]
  },

  // BAHTSUL MASAIL & ARTIKEL GRID ITEMS
  {
    id: 'bm-1',
    title: "Tinjauan Fiqih Terhadap Zakat Fitrah Menggunakan Uang Tunai Sesuai Madzhab Hanafi & Syafi'i",
    slug: 'tinjauan-fiqih-zakat-fitrah-uang-tunai',
    category: 'Bahtsul Masail',
    excerpt: "Kajian komparatif lintas madzhab empat mengenai kemudahan pembayaran zakat fitrah dengan qimah (nilai uang) demi kemaslahatan mustahiq.",
    content: [
      "Meskipun madzhab Syafi'i secara tekstual mewajibkan makanan pokok setempat, kemaslahatan faqir miskin seringkali lebih terbantu dengan qimah (uang).",
      "Lajnah Bahtsul Masail menjelaskan tata cara intiqal madzhab (pindah madzhab secara sah) ke qaul Madzhab Hanafi dengan memenuhi rukun-rukunnya secara teliti.",
      "Fatwa ini memberikan ketenangan hati bagi amil zakat di perkotaan maupun pedesaan."
    ],
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Ridlwan Fadhli",
      role: "Ketua Lajnah Bahtsul Masail",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    date: "10 September 2026",
    hijriDate: "29 Shafar 1448 H",
    readTime: "5 menit",
    views: 12900,
    tags: ["Bahtsul Masail", "Zakat", "Fiqih Muamalah"]
  },
  {
    id: 'art-1',
    title: "Menggali Sanad Keilmuan Ulama Nusantara: Jejak Syaikhona Kholil Bangkalan dan Hadratussyaikh Hasyim Asy'ari",
    slug: 'sanad-keilmuan-ulama-nusantara-jejak-guru-bangsa',
    category: 'Artikel',
    excerpt: "Menelusuri keterikatan sanad keilmuan pesantren Indonesia hingga ke Makkah Al-Mukarramah dan Rasulullah Muhammad SAW.",
    content: [
      "Kekuatan utama pesantren salafiah terletak pada silsilah sanad keilmuan yang bersambung tanpa putus (ittishal as-sanad).",
      "Artikel ini mengurai silsilah guru-guru pendiri At-Taroqqy yang bermuara pada para wali songo dan ulama Haramain.",
      "Sanad tidak hanya menjamin keabsahan teks, melainkan menyalurkan barakah, ruh perjuangan, dan ketulusan niat berkhidmah."
    ],
    imageUrl: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Dr. KH. Muhaimin Asrori",
      role: "Pemerhati Sejarah Pesantren",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80"
    },
    date: "9 September 2026",
    hijriDate: "28 Shafar 1448 H",
    readTime: "6 menit",
    views: 15400,
    tags: ["Artikel", "Sanad", "Sejarah Ulama", "Pesantren"]
  },
  {
    id: 'bm-2',
    title: "Status Hukum AI Generated Voice untuk Murattal Al-Qur'an dan Panggilan Adzan Menurut Syara'",
    slug: 'status-hukum-ai-generated-voice-murattal-adzan',
    category: 'Bahtsul Masail',
    excerpt: "Bagaimanakah hukum memperdengarkan suara kecerdasan buatan untuk syiar adzan dan bacaan Al-Qur'an di tempat ibadah?",
    content: [
      "Perkembangan teknologi kloning suara manusia menghadirkan persoalan baru dalam fiqih ibadah mahdhah.",
      "Musyawirin menetapkan bahwa adzan adalah ibadah lisan yang mensyaratkan pelakunya seorang muslim mukalaf berakal, sehingga suara mesin tidak menggugurkan sunnah kifayah adzan.",
      "Adapun pemutaran murattal buatan mesin sebagai sarana edukasi diperbolehkan selama makharijul huruf dan tajwidnya teruji sahih."
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Ridlwan Fadhli",
      role: "Ketua Lajnah Bahtsul Masail",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    },
    date: "8 September 2026",
    hijriDate: "27 Shafar 1448 H",
    readTime: "5 menit",
    views: 17800,
    tags: ["Bahtsul Masail", "AI", "Adzan", "Syariat"]
  },
  {
    id: 'art-2',
    title: "Tradisi Lalaran & Sorogan: Rahasia Daya Ingat Ribuan Nadham Santri Salaf At-Taroqqy",
    slug: 'tradisi-lalaran-sorogan-daya-ingat-santri',
    category: 'Artikel',
    excerpt: "Metode pedagogi khas pesantren yang melatih santri menghafal bait Alfiyah, Imrithi, dan Maqshud secara harmonis dan mendalam.",
    content: [
      "Setiap ba'da shalat Ashar dan Subuh, lorong-lorong asrama At-Taroqqy bergemuruh dengan irama syi'ir bait nadham yang dilantunkan serentak.",
      "Metode lalaran bersama mengaktifkan memori auditori dan visual, menciptakan suasana belajar yang menyenangkan tanpa beban jenuh.",
      "Sementara sistem sorogan melatih mental santri berhadapan langsung dengan kyai satu per satu mengoreksi harakat dan makna."
    ],
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Ust. M. Syukron Habibie",
      role: "Lurah Pondok Pesantren",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
    },
    date: "7 September 2026",
    hijriDate: "26 Shafar 1448 H",
    readTime: "4 menit",
    views: 11200,
    tags: ["Artikel", "Lalaran", "Sorogan", "Pendidikan"]
  },

  // HIKMAH & NISAIYAT (Vertical list with small image left, text right)
  {
    id: 'hik-1',
    title: "Dawuh Mawaidh Syaikhuna: Tiga Tanda Keikhlasan Hamba dalam Menghadapi Pujian dan Cacian",
    slug: 'dawuh-syaikhuna-tiga-tanda-keikhlasan',
    category: 'Hikmah',
    excerpt: "Hati yang tulus hanya memandang ridha Allah semata, sehingga lidah manusia yang memuji atau mencela tidak menambah maupun mengurangi tekad amalnya.",
    content: [
      "Ketika kita berbuat baik lalu merasa bangga dipuji atau lesu saat dicela, tandanya amal kita masih membutuhkan pengakuan makhluk.",
      "Syaikhuna mengingatkan nasihat Sayyidina Ali bin Abi Thalib karramallahu wajhah tentang pentingnya membebaskan jiwa dari belenggu penilaian manusia.",
      "Simak petikan nasihat lembut nan menggetarkan hati ini untuk mengobati kelelahan batin di masa kini."
    ],
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Dewan Redaksi At-Taroqqy",
      role: "Lembaga Pers & Kajian Ma'had",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
    },
    date: "6 September 2026",
    hijriDate: "25 Shafar 1448 H",
    readTime: "3 menit",
    views: 9800,
    tags: ["Hikmah", "Syaikhuna", "Nasihat", "Ikhlas"]
  },
  {
    id: 'nis-1',
    title: "Panduan Fiqih Thaharah Santriwati: Membedakan Darah Haidh, Nifas, dan Istihadhah Berdasarkan Durasi",
    slug: 'panduan-fiqih-thaharah-santriwati-haidh-istihadhah',
    category: 'Nisaiyat',
    excerpt: "Pedoman praktis sesuai qaul mu'tamad kitab Fathul Qorib dan Al-Anwar karya Imam Al-Ardabili bagi muslimah aktif.",
    content: [
      "Memahami perbedaan jenis darah kewanitaan merupakan syarat mutlak bagi sahnya ibadah wajib seorang perempuan.",
      "Disajikan tabel praktis batas minimal haidh (sehari semalam / 24 jam kumulatif) dan batas maksimal 15 hari 15 malam.",
      "Penjelasan ini dilengkapi sesi konsultasi langsung dengan dewan pengasuh pesantren putri At-Taroqqy."
    ],
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Ustadzah Khadijah Al-Hafizhah",
      role: "Pengajar Madrasah Diniyyah Putri",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    date: "5 September 2026",
    hijriDate: "24 Shafar 1448 H",
    readTime: "5 menit",
    views: 13900,
    tags: ["Nisaiyat", "Fiqih Muslimah", "Thaharah"]
  },
  {
    id: 'hik-2',
    title: "Mutiara Kalam: Rahasia Bangun di Sepertiga Malam Terakhir dan Keberkahan Shalat Tahajjud",
    slug: 'rahasia-sepertiga-malam-tahajjud',
    category: 'Hikmah',
    excerpt: "Saat dunia terlelap dalam kelalaian, pintu-pintu langit dibuka selebar-lebarnya bagi hamba yang bersujud meneteskan air mata taubat.",
    content: [
      "Para ulama sholihin tidak pernah meninggalkan shalat malam walau dalam keadaan safar atau letih fisik.",
      "Doa di sepertiga malam bagaikan anak panah yang melesat tepat tanpa pernah meleset dari sasaran ijabah Ilahi.",
      "Bangunkan jiwamu dengan wudhu yang sempurna dan adukan segala risau hatimu kepada Dzat Yang Menggenggam seluruh semesta."
    ],
    imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Ust. M. Syukron Habibie",
      role: "Lurah Pondok Pesantren",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
    },
    date: "4 September 2026",
    hijriDate: "23 Shafar 1448 H",
    readTime: "3 menit",
    views: 8900,
    tags: ["Hikmah", "Tahajjud", "Doa", "Munajat"]
  },
  {
    id: 'nis-2',
    title: "Kiprah Nyai Ageng Pesantren: Mengulas Keteladanan Ibunda Para Ulama Besar Penjaga Risalah",
    slug: 'kiprah-nyai-ageng-pesantren-keteladanan',
    category: 'Nisaiyat',
    excerpt: "Di balik ketokohan kyai dan karisma ribuan santri, ada sosok ibu nyai yang mendidik dengan dzikir dan doa hening yang tak terputus.",
    content: [
      "Peran wanita dalam pesantren bukan sekadar pendamping, melainkan episentrum pendidikan adab dan manajemen kasih sayang.",
      "Kisah para nyai ageng dalam mengelola dapur umum santri dan mengajar kitab tafsir menjadi inspirasi abadi santri putri zaman now.",
      "Mereka membuktikan bahwa kelembutan seorang ibu dapat mengokohkan pondasi peradaban dakwah Islam yang agung."
    ],
    imageUrl: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&w=400&q=80",
    author: {
      name: "Ustadzah Khadijah Al-Hafizhah",
      role: "Pengajar Madrasah Diniyyah Putri",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
    },
    date: "3 September 2026",
    hijriDate: "22 Shafar 1448 H",
    readTime: "4 menit",
    views: 10400,
    tags: ["Nisaiyat", "Sejarah", "Keteladanan", "Pesantren Putri"]
  }
];

export const VIDEO_PLAYLIST: VideoItem[] = [
  {
    id: 'vid-1',
    title: "[LIVE] Pengajian Kitab Ihya' 'Ulumiddin: Bab Rahasia Dzikir & Pembersihan Hati dari Sifat Riya'",
    speaker: "K.H. Ahmad Maimoen Taroqqy",
    kitab: "Kitab Ihya' 'Ulumiddin - Juz 3",
    date: "18 September 2026",
    duration: "01:42:15",
    youtubeId: "5qap5aO4i9A", // valid embeddable youtube video ID
    isLive: true,
    views: "14.2k ditonton",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'vid-2',
    title: "Kajian Fathul Qorib Al-Mujib: Syarat dan Rukun Shalat Berjamaah serta Adab Makmum",
    speaker: "Ust. M. Ridlwan Fadhli",
    kitab: "Fathul Qorib Al-Mujib",
    date: "16 September 2026",
    duration: "48:30",
    youtubeId: "YQHsXMglC9A",
    isLive: false,
    views: "8.9k ditonton",
    thumbnail: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'vid-3',
    title: "Mau'idhah Hasanah Peringatan Haul Masyayikh At-Taroqqy: Menjaga Amanah Sanad Ulama Salaf",
    speaker: "Hadratussyaikh & Tamu Masyayikh Jawa Tengah",
    kitab: "Mawaidh Akbar",
    date: "12 September 2026",
    duration: "01:15:20",
    youtubeId: "kJQP7kiw5Fk",
    isLive: false,
    views: "27.5k ditonton",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 'vid-4',
    title: "Kajian Nisaiyat: Fiqih Risalatul Mahidh - Tanya Jawab Solutif Masalah Darah Wanita",
    speaker: "Nyai Hj. Siti Aminah Taroqqy",
    kitab: "Risalatul Mahidh",
    date: "9 September 2026",
    duration: "54:12",
    youtubeId: "fJ9rUzIMcZQ",
    isLive: false,
    views: "19.8k ditonton",
    thumbnail: "https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=600&q=80"
  }
];

export const RUNNING_TEXT_HEADLINES = [
  "INFO PSB 1448 H: Pendaftaran Santri Baru Pondok Pesantren At-Taroqqy Gelombang I Telah Dibuka Resmi",
  "JADWAL PENGAJIAN: Malam Ini Ba'da Isya Pengajian Akbar Kitab Ihya' 'Ulumiddin bersama Syaikhuna di Masjid Jami'",
  "HASIL BAHTSUL MASAIL: Lajnah Fatwa Diniyyah Merilis Ketetapan Fiqih Muamalah Digital Kontemporer",
  "KHIDMAH SANTRI: Delegasi Santri At-Taroqqy Meraih Juara 1 Musabaqah Qira'atil Kutub (MQK) Tingkat Nasional"
];

export const DEMO_USERS = [
  {
    id: 'user-admin-1',
    name: "Ust. M. Syukron Habibie",
    email: "admin@attaroqqy.id",
    phone: "081234567890",
    role: "admin" as const,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80",
    createdAt: "2026-08-01"
  },
  {
    id: 'user-santri-1',
    name: "Ahmad Daniyal Taroqqy",
    email: "santri@gmail.com",
    phone: "081987654321",
    role: "santri" as const,
    regCode: "PSB-TRQ-1448-2849",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    createdAt: "2026-09-10"
  }
];

export const INITIAL_REGISTRATIONS = [
  {
    id: 'reg-1',
    regCode: 'PSB-TRQ-1448-2849',
    userId: 'user-santri-1',
    namaLengkap: 'Ahmad Daniyal Taroqqy',
    jenisKelamin: 'Putra' as const,
    tempatLahir: 'Surabaya',
    tanggalLahir: '14 Agustus 2011',
    namaWali: 'H. M. Ilham Taroqqy',
    noWhatsapp: '081987654321',
    email: 'santri@gmail.com',
    jenjang: "Salafiyah 'Ulya (Setara MA/SMA)",
    asalDaerah: 'Surabaya, Jawa Timur',
    catatan: 'Pernah mengkhatamkan Jurumiyah dan hafalan Juz 30',
    status: 'jadwal_tes' as const,
    tanggalDaftar: '10 September 2026',
    jadwalTes: "Ahad, 27 September 2026 (Pukul 08:30 WIB - Sowan Ndalem Pengasuh)",
    catatanPengurus: 'Berkas ijazah MTs dan surat sehat lengkap. Diundang hadir tes baca Fathul Qorib dasar.'
  },
  {
    id: 'reg-2',
    regCode: 'PSB-TRQ-1448-3190',
    namaLengkap: 'M. Faiz Al-Habsyi',
    jenisKelamin: 'Putra' as const,
    tempatLahir: 'Rembang',
    tanggalLahir: '03 Maret 2014',
    namaWali: 'H. Abdul Rasyid',
    noWhatsapp: '082133445566',
    email: 'faizhabsyi@gmail.com',
    jenjang: 'Salafiyah Wustha (Setara MTs/SMP)',
    asalDaerah: 'Sedan, Rembang',
    catatan: 'Ingin fokus mengaji nahwu shorof dan tahfidz',
    status: 'menunggu' as const,
    tanggalDaftar: '17 September 2026',
    catatanPengurus: 'Menunggu konfirmasi kelengkapan fotokopi KK dari wali santri.'
  },
  {
    id: 'reg-3',
    regCode: 'PSB-TRQ-1448-1892',
    namaLengkap: 'Siti Fatimah Az-Zahra',
    jenisKelamin: 'Putri' as const,
    tempatLahir: 'Kudus',
    tanggalLahir: '21 Oktober 2013',
    namaWali: 'H. Sholehuddin, S.Pd.I',
    noWhatsapp: '081399887766',
    email: 'zahrakudus@gmail.com',
    jenjang: 'Salafiyah Wustha (Setara MTs/SMP)',
    asalDaerah: 'Kudus, Jawa Tengah',
    catatan: 'Santri putri mukim asrama Nisaiyat',
    status: 'verifikasi' as const,
    tanggalDaftar: '15 September 2026',
    catatanPengurus: 'Berkas terverifikasi online, menunggu alokasi jadwal wawancara santri putri.'
  },
  {
    id: 'reg-4',
    regCode: 'PSB-TRQ-1448-0955',
    namaLengkap: 'Nurul Hikmah Al-Munawwarah',
    jenisKelamin: 'Putri' as const,
    tempatLahir: 'Semarang',
    tanggalLahir: '05 Januari 2010',
    namaWali: 'Drs. H. Mahrus Ali',
    noWhatsapp: '085211223344',
    email: 'nurulhikmah@gmail.com',
    jenjang: "Takhassus Tahfidz Al-Qur'an 30 Juz",
    asalDaerah: 'Semarang, Jawa Tengah',
    catatan: 'Memiliki modal hafalan 7 Juz Al-Qur\'an bersanad',
    status: 'diterima' as const,
    tanggalDaftar: '04 September 2026',
    jadwalTes: "Lulus Ujian Masuk (12 September 2026)",
    catatanPengurus: 'Alhamdulillah telah dinyatakan LULUS & DITERIMA di Kompleks Santri Putri At-Taroqqy.'
  }
];

