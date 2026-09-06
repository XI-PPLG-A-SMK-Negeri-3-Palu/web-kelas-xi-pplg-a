# Website XI PPLG A

Website resmi Kelas XI PPLG A.

## Teknologi yang Digunakan

- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4, Zustand, React Router, Swiper, Lucide React, React Icons
- **Backend:** Node.js, Express.js, TypeScript, Prisma ORM
- **Database:** PostgreSQL — dijalankan lewat Docker khusus untuk database saja. Frontend dan Backend tetap dijalankan native lewat PNPM, bukan di dalam container.
- **Manajer Monorepo:** PNPM Workspaces

## Struktur Proyek (Monorepo)

- `/apps/frontend` — Aplikasi React (Antarmuka Pengguna)
- `/apps/backend` — Peladen Express API & Skema Prisma
- `/packages/shared-types` — Interface TypeScript untuk kontrak tipe data lintas Frontend-Backend

## Panduan Pengembangan Lokal

### Prasyarat Sistem

1. Node.js (v18 atau lebih baru) dan PNPM (v8 atau lebih baru) telah terinstal.
2. Docker Desktop telah terinstal dan mesin dalam keadaan aktif.
3. VS Code dengan ekstensi: **Tailwind CSS IntelliSense**, **Prisma**, **Oxc** (`oxc.oxc-vscode`).

### Instalasi

1. Kloning repositori ini ke mesin lokal Anda.
2. Duplikasi file `.env.example` di direktori akar (root), ubah namanya menjadi `.env`, sesuaikan kredensial di dalamnya.
3. Instal seluruh dependensi dari direktori akar:

```bash
pnpm install
```

### Menjalankan Aplikasi

1. Nyalakan database (hanya database, belum menjalankan aplikasi):

```bash
pnpm run db:up
```

2. Jalankan migrasi database (wajib saat pertama kali clone, atau setiap ada perubahan skema baru):

```bash
pnpm --filter @xi-pplg/backend run prisma:migrate
```

3. Jalankan Frontend (Vite) dan Backend (Express) sekaligus:

```bash
pnpm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api/health`

### Melihat Isi Database

```bash
pnpm --filter @xi-pplg/backend run prisma:studio
```

Buka `http://localhost:5555` untuk melihat isi tabel database lewat tampilan visual.

### Menghentikan Layanan

```bash
pnpm run db:down
```
