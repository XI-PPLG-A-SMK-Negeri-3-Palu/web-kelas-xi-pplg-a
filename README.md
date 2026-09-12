# Website XI PPLG A

Portal web resmi kelas XI Pengembangan Perangkat Lunak dan Gim (PPLG) A — SMK Negeri 3 Palu.

Berkas ini memuat ringkasan eksekutif dan instruksi cepat (*quickstart*) untuk menjalankan sistem pada lingkungan lokal. Seluruh dokumentasi teknis, panduan arsitektur mendalam, standar kolaborasi Git, dan spesifikasi kontrak API terpusat pada direktori [`docs/`](docs/).

---

## Indeks Dokumentasi Teknis Lengkap

Untuk panduan operasional komprehensif, seluruh pengembang diwajibkan merujuk pada dokumen terkait di bawah ini:

| Topik Dokumentasi | Berkas Rujukan | Cakupan Substansi Teknis |
| :--- | :--- | :--- |
| **Operasional & Troubleshooting** | [docs/MANUAL-OPERASIONAL.md](docs/MANUAL-OPERASIONAL.md) | Topologi direktori monorepo, tutorial onboarding 7 tahap, SOP harian, matriks pemecahan masalah teknis (8 kasus insiden), dan larangan arsitektural. |
| **Standar Kontrol Versi Git** | [docs/KONVENSI-GIT.md](docs/KONVENSI-GIT.md) | Aturan percabangan (`<kategori>/<kebab-case>`), format pesan commit konvensional, siklus 8 langkah kolaborasi, dan konfigurasi proteksi cabang utama (`main`). |
| **Kompetensi & Pembagian Tugas** | [docs/PETA-BELAJAR-DAN-PEMBAGIAN-TUGAS.md](docs/PETA-BELAJAR-DAN-PEMBAGIAN-TUGAS.md) | Fondasi wajib pengembang, alokasi kerja berbasis **Enam Lapisan Kompleksitas**, kurikulum fase aktif, dan protokol kepemimpinan Koordinator Tim. |
| **Keputusan Arsitektur (ADR)** | [docs/KEPUTUSAN-ARSITEKTUR.md](docs/KEPUTUSAN-ARSITEKTUR.md) | Rekaman keputusan teknis (ADR-01 hingga ADR-06) dan analisis trade-off atas adopsi React 19, TypeScript, Tailwind v4, Prisma, Docker, dan PNPM. |
| **Kontrak API & Kesiapan Tim** | [docs/KONTRAK-API-DAN-KESIAPAN-TIM.md](docs/KONTRAK-API-DAN-KESIAPAN-TIM.md) | Matriks evaluasi kesiapan mandiri pengembang dan spesifikasi kontrak tunggal antarmuka REST API terversi (`/api/v1/...`). |
| **Rencana Kerja & Audit Fase** | [docs/RENCANA-IMPLEMENTASI.md](docs/RENCANA-IMPLEMENTASI.md) | Matriks verifikasi 9 modul antarmuka Fase 1 yang telah selesai, hasil uji kompilasi, serta peta jalan integrasi dinamis Fase 2. |

---

## Teknologi Inti

- **Aplikasi Klien (Frontend)**: React 19, Vite, TypeScript, Tailwind CSS v4, Zustand, React Router DOM, Swiper, Lucide React.
- **Peladen API (Backend)**: Node.js, Express.js, TypeScript, Prisma ORM.
- **Basis Data**: PostgreSQL 16 — dijalankan terisolasi via Docker Engine. Runtime aplikasi klien dan peladen tetap berjalan native melalui PNPM.
- **Manajemen Repositori**: PNPM Workspaces (Arsitektur Monorepo).

---

## Struktur Direktori Utama

- `apps/frontend` — Kode sumber aplikasi klien berbasis React 19 dan Vite.
- `apps/backend` — Layanan peladen Express API dan definisi skema Prisma.
- `packages/shared-types` — Kontrak tipe data TypeScript bersama lintas klien dan peladen.
- `docs/` — Dokumentasi teknis terpadu standar industri.

---

## Panduan Cepat Menjalankan Sistem Lokal

### Prasyarat Sistem
1. Node.js (versi 18 LTS atau lebih baru) dan PNPM (versi 8 atau lebih baru).
2. Docker Desktop dalam keadaan aktif.
3. Editor Visual Studio Code dengan ekstensi: *Tailwind CSS IntelliSense*, *Prisma*, dan *Oxc Linter* (jangan pasang ESLint).

### Inisialisasi Repositori
1. Gandakan repositori ke komputer lokal Anda:
   ```bash
   git clone https://github.com/XI-PPLG-A-SMK-Negeri-3-Palu/web-kelas-xi-pplg-a.git
   cd web-kelas-xi-pplg-a
   ```
2. Gandakan berkas konfigurasi lingkungan pada direktori root:
   ```bash
   cp .env.example .env
   ```
3. Pasang seluruh paket dependensi monorepo:
   ```bash
   pnpm install
   ```

### Menjalankan Lingkungan Pengembangan
1. Jalankan kontainer basis data:
   ```bash
   pnpm run db:up
   ```
2. Jalankan sinkronisasi migrasi skema basis data:
   ```bash
   pnpm --filter @xi-pplg/backend run prisma:migrate
   ```
3. Jalankan aplikasi klien dan peladen secara simultan:
   ```bash
   pnpm run dev
   ```
   - Antarmuka Klien: `http://localhost:5173`
   - Peladen API: `http://localhost:3000/api/health`

### Inspeksi Basis Data Melalui Antarmuka Visual
```bash
pnpm --filter @xi-pplg/backend run prisma:studio
```
Buka peramban pada alamat `http://localhost:5555` untuk mengelola data tabel secara visual.

### Menghentikan Layanan
1. Hentikan terminal aplikasi pengembangan dengan `Ctrl + C`.
2. Matikan kontainer basis data:
   ```bash
   pnpm run db:down
   ```
