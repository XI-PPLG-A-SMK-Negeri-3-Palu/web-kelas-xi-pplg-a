# Website XI PPLG A

Official Website and Community Hub of Class XI PPLG A.

## Technology Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4, Zustand, React Router, Swiper, Lucide React
- **Backend:** Node.js, Express.js, TypeScript, Prisma ORM
- **Database:** PostgreSQL (via Docker)
- **Monorepo Manager:** PNPM Workspaces

## Project Structure (Monorepo)

Proyek ini mengadopsi arsitektur Monorepo untuk memisahkan domain aplikasi dan modul konfigurasi bersama:

- `/apps/frontend` — Aplikasi React (Antarmuka Pengguna)
- `/apps/backend` — Peladen Express API & Skema Prisma
- `/packages/shared-types` — Antarmuka TypeScript & Skema Zod (Kontrak tipe data lintas tumpukan)

## Local Development Guide

### System Prerequisites

1. Node.js (v18 atau lebih baru) dan PNPM (v8 atau lebih baru) telah terinstal.
2. Docker Desktop telah terinstal dan mesin dalam keadaan aktif.

### Installation

1. Kloning repositori ini ke mesin lokal Anda.
2. Duplikasi file `.env.example` yang berada di direktori akar (root), ubah namanya menjadi `.env`, dan sesuaikan kredensial di dalamnya.
3. Buka terminal pada direktori akar, lalu jalankan perintah instalasi dependensi:

```bash
pnpm install
```

### Running the Application

Jalankan perintah berikut secara berurutan pada terminal di direktori akar:

1. Inisialisasi basis data PostgreSQL di latar belakang:

```bash
pnpm run db:up
```

2. Eksekusi peladen Frontend (Vite) dan Backend (Express) secara paralel:

```bash
pnpm run dev
```

- Frontend dapat diakses pada: `http://localhost:5173`
- Backend beroperasi pada: `http://localhost:3000`

### Terminating the Services

Untuk menghentikan kontainer basis data setelah pengembangan selesai, jalankan:

```bash
pnpm run db:down
```
