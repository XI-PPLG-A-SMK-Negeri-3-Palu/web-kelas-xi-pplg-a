# Rencana Implementasi Rekayasa: Audit Fase 1 dan Peta Jalan Fase 2

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Tujuan Strategis Proyek

Membangun portal digital resmi kelas XI PPLG A SMK Negeri 3 Palu dengan standar performa, aksesibilitas, dan keterawatan kode tingkat industri. Rencana kerja dibagi ke dalam dua tahapan utama:
- **Fase 1**: Fondasi antarmuka publik, sistem tata letak terpusat, dan integrasi komponen statis.
- **Fase 2**: Pembangunan layanan REST API backend, autentikasi terverifikasi Whitelist, dan integrasi data dinamis.

---

## 2. Matriks Audit Hasil Pekerjaan Fase 1 (Verifikasi Aktual Basis Kode)

Berikut adalah status ketercapaian seluruh komponen dan modul yang telah selesai diimplementasikan pada cabang utama (`main`):

| Entitas Kerja | Lokasi Berkas Sumber | Status Verifikasi | Uraian Implementasi Rekayasa |
| :--- | :--- | :---: | :--- |
| **Sistem Rute Global** | `apps/frontend/src/App.tsx` | **Tuntas Terverifikasi** | Konfigurasi React Router DOM dengan rute bersarang: `/`, `/profil-murid`, `/profil-murid/:id`, `/kontributor-web`, dan `/galeri`. |
| **Tata Letak Global** | `apps/frontend/src/layouts/MainLayout.tsx` | **Tuntas Terverifikasi** | Struktur semantik HTML5 (`header`, `nav`, `main`, `footer`), navigasi responsif, dan integrasi tautan media sosial eksternal. |
| **Sistem Token Gaya** | `apps/frontend/src/index.css` | **Tuntas Terverifikasi** | Konfigurasi `@theme` Tailwind CSS v4 dengan palet terstandar (`--color-primary-*`, `--color-title`, `--color-subtitle`, `--color-bg-*`). |
| **Halaman Utama (Home)** | `apps/frontend/src/pages/Home.tsx` | **Tuntas Terverifikasi** | Hero video interaktif dengan poster fallback, proteksi aksesibilitas `motion-reduce`, statistik kelas, dan cuplikan galeri/kontributor. |
| **Halaman Direktori Siswa** | `apps/frontend/src/pages/ProfilMurid.tsx` | **Tuntas Terverifikasi** | Grid profil anggota terbagi dalam seksi Pengurus Kelas dan Seluruh Anggota. |
| **Halaman Profil Spesifik** | `apps/frontend/src/pages/ProfilDetail.tsx` | **Tuntas Terverifikasi** | Ekstraksi parameter URL dinamis (`useParams`) dan presentasi portofolio pencapaian siswa. |
| **Halaman Galeri Media** | `apps/frontend/src/pages/Gallery.tsx` | **Tuntas Terverifikasi** | Galeri media foto dan video interaktif kenangan kelas. |
| **Halaman Tim Pengembang** | `apps/frontend/src/pages/KontributorWeb.tsx` | **Tuntas Terverifikasi** | Presentasi profil kontributor teknis situs web kelas. |
| **Komponen Atomik** | `apps/frontend/src/components/Card.tsx`, `MemoryCard.tsx` | **Tuntas Terverifikasi** | Komponen kartu serbaguna dan komponen kartu media dengan efek visual hover overlay. |

---

## 3. Hasil Pengujian dan Integritas Sistem (System Verification)

Pengujian otomatis dan statis telah dijalankan dengan hasil sebagai berikut:

1. **Pengujian Kompilasi Frontend**:
   - Perintah: `pnpm --filter @xi-pplg/frontend build` (`tsc -b && vite build`)
   - Hasil: **100% Berhasil** (1.857 modul tertransformasi tanpa anomali pengetikan).
2. **Pengujian Kompilasi Backend**:
   - Perintah: `pnpm --filter @xi-pplg/backend build` (`tsc`)
   - Hasil: **100% Berhasil** tanpa kesalahan sintaksis atau ketidakcocokan tipe.
3. **Penyelarasan Skema Basis Data**:
   - Seluruh model data (`Whitelist`, `User`, `Badge`, `UserBadge`, `ClassMemory`, `Portfolio`) telah terdaftar resmi pada skema Prisma dan tersinkronisasi ke PostgreSQL via migrasi DDL terkelola.
4. **Validasi Komunikasi Antar-Domain**:
   - Pemanggilan endpoint kesehatan peladen `/api/health` dari domain klien terbukti mengembalikan payload `{ status: "OK" }`.

---

## 4. Peta Jalan Pelaksanaan Fase 2 (Integrasi API & Persistensi Data)

Setelah penyelesaian antarmuka dasar Fase 1, pekerjaan berikutnya difokuskan pada penyediaan layanan API dan penyambungan data dinamis:

### Tahap 2.1: Konstruksi Endpoint Backend RESTful
1. **Modul Autentikasi dan Whitelist (`/api/v1/auth`)**:
   - Endpoint pendaftaran akun dengan verifikasi pra-syarat pada tabel `Whitelist`.
   - Endpoint otentikasi login dengan verifikasi hash kata sandi `bcrypt` dan penerbitan token JWT.
2. **Modul Pengguna dan Profil (`/api/v1/users`)**:
   - Endpoint penarikan daftar seluruh siswa terdaftar.
   - Endpoint detail profil individu beserta relasi lencana (*badges*) dan portofolio.
3. **Modul Kenangan Kelas (`/api/v1/memories`)**:
   - Endpoint inventarisasi foto dan video memori kelas.

### Tahap 2.2: Lapisan Integrasi Klien (Frontend Service Layer)
1. **Inisialisasi HTTP Client Terpusat**:
   - Konfigurasi instans Axios pada `apps/frontend/src/services/api.ts` dengan penanganan otomatis header otorisasi JWT.
2. **Refaktor Komponen Menuju Data Asinkron**:
   - Menggantikan variabel data dummy lokal pada `ProfilMurid.tsx`, `ProfilDetail.tsx`, dan `Gallery.tsx` dengan data yang diambil dari REST API menggunakan siklus hidup data (*loading*, *error*, *resolved*).
