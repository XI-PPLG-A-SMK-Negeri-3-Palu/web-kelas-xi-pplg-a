// Peran Pengguna dalam Sistem
export type UserRole = 'STUDENT' | 'TOP_CONTRIBUTOR' | 'ADMIN';

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
  name: string;      // Contoh: "Ketua Kelas", "Ahli CSS"
  iconUrl: string;
  description: string;
}

// Galeri Kenangan
export interface ClassMemory {
  id: string;
  imageUrl: string;
  caption: string;
  uploadedBy: string; // Merujuk ke id dari UserProfile
  uploadDate: Date;
}
