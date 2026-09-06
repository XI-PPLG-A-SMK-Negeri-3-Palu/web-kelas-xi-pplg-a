# Website XI PPLG A

Official Website of Class XI PPLG A.

## Technology Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4, Zustand, React Router, Swiper, Lucide React, React Icons
- **Backend:** Node.js, Express.js, TypeScript, Prisma ORM
- **Database:** PostgreSQL — dijalankan lewat Docker **khusus untuk database saja**. Frontend dan Backend tetap dijalankan native lewat PNPM, bukan di dalam container.
- **Monorepo Manager:** PNPM Workspaces

## Project Structure (Monorepo)

- `/apps/frontend` — Aplikasi React (Antarmuka Pengguna)
- `/apps/backend` — Peladen Express API & Skema Prisma
- `/packages/shared-types` — Interface TypeScript untuk kontrak tipe data lintas Frontend-Backend

## Dokumentasi Lengkap

README ini cuma ringkasan cepat. Untuk detail, baca:

- `docs/GUIDEBOOK.md` — SOP harian & troubleshooting (baca ini duluan kalau ada error)
- `docs/STRUKTUR-PROYEK.md` — peta folder & onboarding lengkap
- `docs/GIT-CONVENTION.md` — aturan branch & commit
- `docs/PETA-BELAJAR-TIM.md` — roadmap belajar per divisi
- `docs/TASK-DIVISION.md` — pembagian tugas per lapisan kompleksitas
- `docs/TECH-DECISIONS.md` — alasan pemilihan tiap teknologi
- `docs/SYARAT-INTEGRASI-API.md` — syarat & kontrak API sebelum sambung Frontend↔Backend

## Local Development Guide

### System Prerequisites

1. Node.js (v18 atau lebih baru) dan PNPM (v8 atau lebih baru) telah terinstal.
2. Docker Desktop telah terinstal dan mesin dalam keadaan aktif.
3. VS Code + ekstensi wajib: **Tailwind CSS IntelliSense**, **Prisma**, **Oxc** (`oxc.oxc-vscode`). **Jangan install ekstensi "ESLint"** — proyek ini tidak memakainya.

### Installation

1. Kloning repositori ini ke mesin lokal Anda.
2. Duplikasi file `.env.example` di direktori akar (root), ubah namanya menjadi `.env`, sesuaikan kredensial di dalamnya.
3. Instal seluruh dependensi dari direktori akar:

```bash
pnpm install
```

### Running the Application

1. Nyalakan database (hanya database, belum menjalankan aplikasi):

```bash
pnpm run db:up
```

2. **Wajib dijalankan saat pertama kali clone, atau setiap ada perubahan skema baru:**

```bash
pnpm --filter @xi-pplg/backend run prisma:migrate
```

Tanpa langkah ini, database akan menyala tapi kosong tanpa tabel apa pun.

3. Jalankan Frontend (Vite) dan Backend (Express) sekaligus:

```bash
pnpm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api/health`

### Lihat Isi Database Tanpa Nulis SQL

```bash
pnpm --filter @xi-pplg/backend run prisma:studio
```

Buka `http://localhost:5555` — tampilan visual isi tabel (User, Portfolio, Badge, dst.), mirip Excel. Berguna untuk cek data tanpa perlu paham query database.

### Catatan: Garis Merah di Editor (Aman, Bukan Bug)

Anda mungkin melihat garis merah di `schema.prisma` (`env("DATABASE_URL")`) atau `lib/prisma.ts` (`PrismaClient`). Ini keterbatasan ekstensi VS Code membaca `.env` di monorepo — **sudah diverifikasi tidak memengaruhi migrasi maupun aplikasi yang berjalan**. Aman diabaikan. Detail penyebabnya ada di `docs/GUIDEBOOK.md`.

### Kalau Ada Error

Cek dulu `docs/GUIDEBOOK.md` bagian "Troubleshooting Cepat" sebelum bertanya ke grup — kemungkinan besar sudah pernah terjadi dan solusinya tercatat di sana.

### Terminating the Services

```bash
pnpm run db:down
```
