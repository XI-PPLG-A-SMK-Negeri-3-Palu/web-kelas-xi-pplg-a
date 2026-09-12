# Matriks Pengembangan Kompetensi Teknis dan Pembagian Lapisan Kerja Rekayasa

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Fondasi Kompetensi Wajib (Universal Prerequisite)

Seluruh anggota tim rekayasa perangkat lunak, terlepas dari peminatan spesifik, wajib menguasai empat fondasi utama berikut sebelum menerima tugas implementasi:

| Aspek Fondasi | Rasional Urgensi Rekayasa | Rujukan Pembelajaran Resmi |
| :--- | :--- | :--- |
| **Operasionalisasi Kontainer Docker** | Pemahaman perintah dasar siklus hidup kontainer (`pnpm run db:up` dan `db:down`). Kontainer dikhususkan untuk basis data PostgreSQL terisolasi. | [Docker Engine Documentation](https://docs.docker.com/get-started/) |
| **Semantik HTML5 dan CSS Modern** | Fondasi pembentukan struktur antarmuka yang aksesibel. Penguasaan Box Model, Flexbox, CSS Grid, serta tag semantik standar (`header`, `nav`, `main`, `footer`). | [MDN Web Docs: HTML & CSS](https://developer.mozilla.org/) |
| **JavaScript Kontemporer (ECMAScript 6+)** | Esensial bagi ekosistem React dan Express. Wajib menguasai fungsi asinkron (`async/await`), manipulasi larik (`map`, `filter`), destrukturisasi objek, dan resolusi Promise. | [The Modern JavaScript Tutorial](https://javascript.info/) |
| **Protokol Kontrol Versi Git** | Penguasaan strategi percabangan, pembuatan komit konvensional, dan tata cara pengajuan *Pull Request*. | [Standar Kontrol Versi Tim](file:///d:/Coding/Project/Web_Projects/Web_XI-PPLG-A/docs/KONVENSI-GIT.md) |

---

## 2. Model Pembagian Tugas Berbasis Enam Lapisan Kompleksitas

Untuk mencegah beban kognitif berlebih (*cognitive overload*) pada pengembang tingkat pemula, alokasi penugasan tidak dilakukan berdasarkan fitur penuh (vertikal *end-to-end*), melainkan didekomposisi berdasarkan **lapisan abstraksi teknis** (horizontal *layered architecture*):

```
[Lapisan 6: Skema Basis Data & Arsitektur Sistem]  --> Lead Developer / Koordinator
[Lapisan 5: Antarmuka API, Routing & Controller]   --> Backend Developer
[Lapisan 4: Integrasi REST Client & State API]     --> Intermediate Frontend Developer
[Lapisan 3: Logika Bisnis Klien & Validasi Form]   --> Junior Frontend Developer
[Lapisan 2: Komposisi Halaman & Tata Letak Global] --> Junior Frontend Developer
[Lapisan 1: Komponen Visual Statis (Dumb UI)]      --> Entry-Level Developer
```

### Rincian Spesifikasi Lapisan Kerja:

| Tingkatan Lapisan | Cakupan Tanggung Jawab | Prasyarat Pengetahuan | Ruang Lingkup Berkas Terkait |
| :---: | :--- | :--- | :--- |
| **Lapisan 1: Komponen Visual Statis** | Merancang elemen UI murni tanpa penanganan state internal yang rumit dan tanpa pemanggilan API. | HTML5, CSS/Tailwind, sintaks dasar JSX. | `apps/frontend/src/components/` (`Card.tsx`, tombol, badge). |
| **Lapisan 2: Komposisi Halaman & Layout** | Merakit komponen Lapisan 1 menjadi kesatuan halaman visual terstruktur. | Lapisan 1, pemahaman props, manipulasi larik (*array mapping*). | `apps/frontend/src/pages/` dan `apps/frontend/src/layouts/`. |
| **Lapisan 3: Logika Bisnis Klien** | Mengembangkan interaktivitas, formulir kontrol, penanganan validasi, dan event handling. | Lapisan 2, pemahaman hooks `useState` dan `useEffect`, antarmuka TypeScript. | `apps/frontend/src/features/` (form registrasi, modal interaktif). |
| **Lapisan 4: Integrasi REST API Client** | Menghubungkan antarmuka pengguna ke endpoint peladen melalui pustaka HTTP client terpusat (Axios). | Lapisan 3, pemahaman siklus hidup asinkron, status respon HTTP, state loading/error. | `apps/frontend/src/services/` dan integrasi state global `store/`. |
| **Lapisan 5: Peladen API & Kontroler** | Membangun endpoint HTTP, memvalidasi payload masukan, dan mengeksekusi logika manipulasi data via Prisma. | Express.js, arsitektur RESTful, blok `try/catch`, penanganan status HTTP. | `apps/backend/src/routes/`, `controllers/`, dan `services/`. |
| **Lapisan 6: Skema Data & Arsitektur** | Merancang skema relasional, menjalankan migrasi basis data, dan menyelaraskan kontrak tipe data bersama. | Desain basis data relasional tingkat lanjut, integrasi Prisma ORM, arsitektur monorepo. | `apps/backend/prisma/schema.prisma` dan `packages/shared-types/`. |

---

## 3. Kurikulum Belajar Teknis Terarah

### Bagian A: Keterampilan Operasional Fase Aktif
Kurikulum yang wajib dipelajari untuk mendukung kode dan skema data yang telah aktif di repositori saat ini (`User`, `Whitelist`, `Badge`, `UserBadge`, `ClassMemory`, `Portfolio`):

#### 1. Domain Frontend
- **Tailwind CSS Versi 4**: Konfigurasi berbasis CSS murni via blok `@theme` di `index.css`, pendekatan penataan antarmuka responsif *mobile-first*.
- **Komponen React Modern**: Implementasi komponen murni (*pure components*), manajemen props berlapis, dan optimasi siklus re-render.
- **Navigasi React Router**: Penerapan antarmuka deklaratif rute bersarang (*nested routes*) dengan pembungkus `<Outlet />` pada `MainLayout`.
- **Manajemen State Zustand**: Pengelolaan penyimpanan state global yang ringan untuk autentikasi dan preferensi pengguna.

#### 2. Domain Backend
- **Arsitektur REST Express.js**: Pola perancangan rute terstruktur, delegasi logika ke kontroler, dan standarisasi format respons JSON.
- **Manipulasi Relasi Prisma ORM**: Eksekusi operasi CRUD berbasis tipe kuat (`findMany`, `findUnique`, `create`, relasi bersarang).
- **Mekanisme Autentikasi dan Otorisasi**: Validasi pendaftaran berbasis Whitelist, enkripsi kata sandi menggunakan `bcrypt`, dan verifikasi identitas menggunakan JSON Web Token (JWT).
- **Protokol Keamanan Middleware**: Penegakan otorisasi peran pengguna (`STUDENT` vs `ADMIN`) pada rute sensitif.

---

### Bagian B: Peta Pengembangan Eksplorasi Masa Depan
Topik di bawah ini dialokasikan untuk fase pengembangan berikutnya. Pengembang diperbolehkan mempelajari teorinya secara mandiri, namun **dilarang memulai pengkodean** sebelum skema basis data resmi disahkan:
1. **Komunikasi Real-Time (Socket.io)**: Fitur perpesanan interaktif. Mensyaratkan persetujuan model data `Message` dan `ChatRoom` pada skema Prisma terlebih dahulu.
2. **Hierarki Hak Akses Lanjutan**: Penataan izin granular di luar peran dasar `STUDENT` dan `ADMIN`.

---

## 4. Protokol Kepemimpinan Teknis (Koordinator / Tech Lead)

Koordinator Tim mengemban tanggung jawab tata kelola rekayasa berikut:

1. **Pemeliharaan Template Variabel Lingkungan**: Menjamin berkas `.env.example` terdokumentasi secara mutakhir setiap kali ada variabel baru yang diperkenalkan ke dalam kode.
2. **Konsistensi Kontrak Data**: Menjaga sinkronisasi antara definisi model pada `apps/backend/prisma/schema.prisma` dengan pustaka antarmuka di `packages/shared-types/src/index.ts`.
3. **Audit Mutu dan Keamanan Rutin**: Melakukan peninjauan mendalam pada seluruh *Pull Request* serta menjalankan audit kerentanan dependensi secara periodik (`pnpm audit`).
4. **Otoritas Skema Data**: Menjadi penanggung jawab tunggal atas penerbitan migrasi basis data ke lingkungan bersama.
