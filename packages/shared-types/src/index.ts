// Peran Pengguna dalam Sistem
export type UserRole = 'STUDENT' | 'ADMIN';

// Jenis media di Galeri
export type MemoryType = 'IMAGE' | 'VIDEO';

// Profil Utama
export interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;

  // Kosmetik Profil
  profileBorder?: 'border-gold' | 'border-neon' | 'border-default';
  badges: Badge[];

  // Media Sosial
  socialLinks?: {
    instagram?: string;
    github?: string;
    portfolio?: string;
  };

  createdAt: Date;
}

// Badge (Penghargaan/Identitas)
export interface Badge {
  id: string;
  name: string;      // Contoh: "Top Contributor", "Ahli CSS"
  iconUrl: string;
  description: string;
}

// Galeri Kenangan (mendukung foto & video)
export interface ClassMemory {
  id: string;
  mediaUrl: string;
  mediaType: MemoryType;
  caption: string;
  uploadedBy: string; // Merujuk ke id dari UserProfile
  uploadDate: Date;
}

// Portofolio / Pencapaian -- satu user bisa punya banyak entri
export interface Portfolio {
  id: string;
  title: string;
  description?: string;
  category?: string;   // contoh: "Lomba", "Proyek", "Sertifikat"
  link?: string;
  imageUrl?: string;
  ownerId: string;      // Merujuk ke id dari UserProfile
  createdAt: Date;
  updatedAt: Date;
}

// CATATAN: tipe `Whitelist` sengaja TIDAK diekspor di sini.
// Whitelist murni logika verifikasi internal backend (cek saat registrasi),
// frontend tidak perlu dan tidak boleh tahu isi seluruh daftar whitelist.
