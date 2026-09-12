# Rekaman Keputusan Arsitektur dan Analisis Trade-Off (Architecture Decision Records)

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Matriks Evaluasi Keputusan Teknologi

Tabel ini merangkum rasional pemilihan teknologi inti serta kompromi teknis yang disepakati oleh tim rekayasa:

| Komponen Arsitektur | Teknologi Terpilih | Masalah Utama yang Diselesaikan | Konsekuensi & Kompromi Teknis (Trade-Off) |
| :--- | :--- | :--- | :--- |
| **Framework Antarmuka** | React 19 | Mengeliminasi duplikasi kode antarmuka melalui enkapsulasi komponen mandiri yang deklaratif. | Terdapat kurva pembelajaran konsep siklus hidup komponen, re-render, dan abstraksi JSX. |
| **Sistem Pengetikan** | TypeScript 5.x | Menangkap galat inkonsistensi tipe pada tahap kompilasi (*compile-time*), bukan saat aplikasi berjalan di produksi. | Menuntut kedisiplinan perancangan antarmuka data di awal; penulisan kode terasa lebih padat (*verbose*). |
| **Kerangka Gaya (Styling)** | Tailwind CSS v4 | Mencegah pembengkakan berkas CSS global dan menyederhanakan pemeliharaan desain modular via kelas utilitas. | Mark-up dokumen JSX menjadi padat dengan rentetan atribut kelas utilitas. |
| **Akses Basis Data (ORM)** | Prisma ORM | Menghilangkan kerentanan SQL Injection dan menyediakan kueri berbasis tipe yang terintegrasi penuh dengan TypeScript. | Menambahkan lapisan abstraksi relasional; mewajibkan pemahaman mendalam mengenai siklus migrasi skema. |
| **Infrastruktur Basis Data** | Docker Engine (PostgreSQL) | Menyediakan instans basis data yang terisolasi dan identik di seluruh sistem operasi pengembang. | Docker dibatasi secara ketat hanya membungkus basis data; aplikasi klien dan peladen tetap memerlukan runtime lokal. |
| **Manajemen Repositori** | PNPM Workspaces | Memfasilitasi integrasi tipe data terpadu (*Single Source of Truth*) antara klien dan peladen dalam satu repositori. | Memerlukan adaptasi navigasi direktori monorepo dan tata cara pengelolaan dependensi berbasis workspace. |

---

## 2. Rincian Rekaman Keputusan Arsitektur (Architecture Decision Records)

### ADR-01: Penerapan React 19 sebagai Framework Antarmuka
- **Konteks Masalah**: Pendekatan dokumen HTML konvensional menuntut pembaruan manual pada setiap berkas saat terjadi perubahan tata letak global (seperti navigasi header atau kaki halaman).
- **Keputusan**: Mengadopsi React 19 dengan integrasi Vite untuk rendering antarmuka pengguna berbasis komponen.
- **Konsekuensi Positif**: Seluruh tampilan didekomposisi menjadi unit-unit terkontrol yang dapat digunakan kembali secara modular. Performa interaktivitas meningkat secara signifikan.
- **Kompromi yang Diterima**: Pengembang wajib memahami alur penurunan data via props dan manajemen re-render agar performa aplikasi tetap optimal.

### ADR-02: Penegakan Pengetikan Statis Melalui TypeScript
- **Konteks Masalah**: JavaScript dinamis rentan terhadap galat eksekusi fatal (*runtime exceptions*), seperti anomali pembacaan properti dari objek `undefined`.
- **Keputusan**: Menerapkan TypeScript secara ketat di seluruh sub-repositori (`frontend`, `backend`, dan `shared-types`).
- **Konsekuensi Positif**: Pendeteksian anomali data terjadi secara instan di dalam lingkungan editor teks sebelum kode dikompilasi atau diuji.
- **Kompromi yang Diterima**: Mengharuskan pembuatan deklarasi antarmuka dan tipe data yang presisi sebelum mengimplementasikan logika fungsional.

### ADR-03: Penerapan Tailwind CSS Versi 4 Berbasis Mesin Baru
- **Konteks Masalah**: Penulisan CSS tradisional menghasilkan berkas penataan gaya yang kian membesar, sulit diaudit, dan rawan menimbulkan efek samping visual yang tidak diinginkan pada halaman lain.
- **Keputusan**: Menggunakan Tailwind CSS versi 4 dengan konfigurasi terpusat pada blok `@theme` di berkas `index.css`.
- **Konsekuensi Positif**: Penerapan gaya dilakukan langsung pada elemen dokumen secara atomik, mempercepat proses penataan dan menjamin konsistensi palet warna sistem.
- **Kompromi yang Diterima**: Keterbacaan berkas JSX awal memerlukan adaptasi visual terhadap deretan kelas utilitas.

### ADR-04: Penggunaan Prisma ORM sebagai Jembatan Akses Data
- **Konteks Masalah**: Penulisan kueri SQL mentah memiliki risiko tinggi terhadap kesalahan pengetikan nama atribut tabel serta membuka potensi celah keamanan injeksi SQL.
- **Keputusan**: Menggunakan Prisma ORM sebagai lapisan tunggal manipulasi basis data PostgreSQL dengan instans Singleton terpusat.
- **Konsekuensi Positif**: Seluruh interaksi basis data menghasilkan objek data yang secara otomatis tervalidasi tipe datanya oleh kompilator TypeScript.
- **Kompromi yang Diterima**: Pengembang dilarang mengubah struktur kolom basis data secara manual melalui antarmuka grafis pihak ketiga. Seluruh perubahan wajib melalui skrip migrasi terkelola.

### ADR-05: Isolasi Kontainer Docker Khusus Layanan Basis Data
- **Konteks Masalah**: Penginstalan basis data PostgreSQL secara langsung pada mesin lokal sering kali menimbulkan konflik alokasi port dan perbedaan versi antaranggota tim.
- **Keputusan**: Membungkus PostgreSQL di dalam kontainer Docker, namun mengecualikan runtime aplikasi klien dan peladen dari kontainerisasi.
- **Konsekuensi Positif**: Seluruh anggota tim bekerja pada basis data yang identik tanpa mengotori sistem operasi lokal, sekaligus mempertahankan kecepatan kompilasi native melalui Vite HMR.
- **Kompromi yang Diterima**: Anggota tim tetap diwajibkan memiliki runtime Node.js dan utilitas PNPM terpasang secara lokal di mesin masing-masing.

### ADR-06: Arsitektur Monorepo Berbasis PNPM Workspaces
- **Konteks Masalah**: Pemisahan repositori antara frontend dan backend kerap memicu perbedaan interpretasi struktur objek transfer data (DTO), menyebabkan integrasi API menjadi rapuh.
- **Keputusan**: Menggabungkan seluruh proyek ke dalam struktur monorepo terkelola oleh PNPM Workspaces dengan paket terdedikasi `@xi-pplg/shared-types`.
- **Konsekuensi Positif**: Satu definisi kontrak antarmuka dipakai bersama oleh peladen dan klien. Perubahan struktur data di backend akan langsung memicu peringatan tipe di frontend.
- **Kompromi yang Diterima**: Pengelolaan dependensi memerlukan pemahaman sintaksis khusus monorepo (`--filter`, `workspace:*`).
