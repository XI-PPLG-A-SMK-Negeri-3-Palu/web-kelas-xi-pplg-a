// Izin akses pengguna (bukan pengakuan prestasi -- lihat Badge)
export type UserRole = 'STUDENT' | 'ADMIN';

// Border kosmetik profil -- harus persis sama dengan enum ProfileBorder di schema.prisma
export type ProfileBorder = 'DEFAULT' | 'GOLD' | 'NEON';

// Jenis media di Galeri
export type MemoryType = 'IMAGE' | 'VIDEO';

// Profil publik -- bentuk data yang ditampilkan ke user lain (bukan bentuk
// mentah tabel User; email & passwordHash sengaja tidak diekspor di sini).
export interface UserProfile {
  id: string;
  fullName: string;
  nickname: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  profileBorder?: ProfileBorder;
  badges: Badge[];
  socialLinks?: {
    instagram?: string;
    github?: string;
    portfolio?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Badge prestasi -- termasuk "Top Contributor"
export interface Badge {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
}

// Galeri kenangan -- foto atau video
export interface ClassMemory {
  id: string;
  mediaUrl: string;
  mediaType: MemoryType;
  caption: string;
  uploadedBy: string;
  uploadDate: Date;
}

// Portofolio/pencapaian -- satu user bisa punya banyak entri
export interface Portfolio {
  id: string;
  title: string;
  description?: string;
  category?: string;
  link?: string;
  imageUrl?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

// CATATAN: `Whitelist` sengaja tidak diekspor -- murni logika verifikasi
// internal backend, frontend tidak perlu tahu isi daftarnya.
