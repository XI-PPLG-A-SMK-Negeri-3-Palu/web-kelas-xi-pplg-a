# Kerangka Evaluasi Kesiapan Pengembang dan Spesifikasi Kontrak Antarmuka API

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Matriks Evaluasi Kesiapan Kompetensi Pengembang

Matriks ini berfungsi sebagai instrumen evaluasi kualitatif internal. Pengembang dinyatakan siap menerima alokasi tugas produksi mandiri apabila mampu menjelaskan dan mengonseptualisasikan indikator-indikator di bawah ini:

### Domain Antarmuka Pengguna (Frontend Engineering)
- [ ] **Mekanisme Data Props vs State**: Mampu membedakan secara prinsipil antara aliran data searah yang diwariskan dari komponen induk (*immutable props*) dan state internal reaktif yang memicu siklus render ulang (*mutable state*).
- [ ] **Topologi Rute dan Komposisi Layout**: Memahami cara kerja komponen `<Outlet />` pada `apps/frontend/src/layouts/MainLayout.tsx` dalam menyematkan halaman konten dinamis seperti `apps/frontend/src/pages/Home.tsx` tanpa duplikasi struktur navigasi.
- [ ] **Modularitas Komponen Atomik**: Mampu memisahkan komponen antarmuka yang independen (`apps/frontend/src/components/Card.tsx`, `MemoryCard.tsx`) guna menghindari duplikasi elemen markup pada berbagai halaman.
- [ ] **Disiplin Penataan Gaya CSS**: Memahami batasan penggunaan kelas utilitas Tailwind CSS (`className`) dan menghindari deklarasi penataan gaya sebaris (*inline style*) kecuali untuk nilai kalkulasi dinamis.
- [ ] **Abstraksi Data Tiruan (Mock Data)**: Memahami peran data dummy pada fase perancangan antarmuka dan siap mengadaptasikan antarmuka ke bentuk payload nyata saat integrasi API aktif.

---

### Domain Rekayasa Peladen dan Data (Backend Engineering)
- [ ] **Alur Pemrosesan Permintaan HTTP**: Mampu memetakan rantai transmisi data mulai dari penerimaan rute hingga persistensi basis data:
  $$\text{HTTP Request} \longrightarrow \text{Routes} \longrightarrow \text{Middlewares} \longrightarrow \text{Controllers} \longrightarrow \text{Services} \longrightarrow \text{Prisma Client} \longrightarrow \text{PostgreSQL}$$
- [ ] **Pola Desain Singleton PrismaClient**: Memahami konsekuensi penipisan kolam koneksi basis data (*connection pool exhaustion*) jika membuat instans baru secara sembarangan, serta mematuhi aturan penggunaan tunggal via `apps/backend/src/lib/prisma.ts`.
- [ ] **Integritas Migrasi Basis Data**: Memahami urgensi penggunaan berkas riwayat migrasi terkelola (`pnpm run prisma:migrate`) dan menghindari instruksi manipulasi struktur langsung seperti `prisma db push` pada lingkungan tim.
- [ ] **Protokol Keamanan Rahasia Lingkungan**: Memahami alasan mutlak berkas `.env` dilarang dipublikasikan ke repositori publik serta disiplin memperbarui berkas acuan `.env.example`.
- [ ] **Otorisasi CORS**: Memahami fungsi pembatasan asal permintaan (*origin verification*) guna mencegah eksploitasi akses data dari domain yang tidak terotorisasi.
- [ ] **Pemisahan Semantik Role vs Badge**: Memahami distingsi fungsional bahwa `Role` (`STUDENT`, `ADMIN`) merepresentasikan hak akses sistem, sementara `Badge` adalah entitas pencapaian prestasi siswa.

---

## 2. Prasyarat Mutlak Integrasi Frontend ke Backend

Sebelum menghubungkan komponen antarmuka ke endpoint peladen, standar integrasi berikut wajib dipenuhi:

| Domain | Standar Kebutuhan Rekayasa | Justifikasi Teknis |
| :---: | :--- | :--- |
| **Backend** | Penegakan kode status HTTP formal (200, 201, 400, 401, 403, 404, 500) | Klien memerlukan kode status standar untuk mengaktifkan alur penanganan kondisi yang tepat pada antarmuka pengguna. |
| **Backend** | Penanganan blok asinkron `try/catch` pada setiap operasi basis data | Mencegah kegagalan fatal (*unhandled promise rejection*) yang dapat menghentikan seluruh proses peladen Express. |
| **Backend** | Pengacakan kata sandi via `bcrypt` dan penandatanganan token JWT | Menjamin kredensial pengguna tidak tersimpan dalam bentuk teks polos (*plaintext*) dan sesi terotentikasi secara aman. |
| **Frontend** | Pola Tiga Kondisi Status: *Loading*, *Error*, dan *Resolved Data* | Mencegah anomali antarmuka membeku atau kosong saat transmisi jaringan mengalami latensi atau kegagalan koneksi. |
| **Frontend** | Pengendalian formulir masukan (*Controlled Form Components*) | Memastikan setiap masukan pengguna tervalidasi secara real-time sebelum dikirimkan ke peladen. |
| **Frontend** | Abstraksi alamat basis peladen via `import.meta.env.VITE_API_URL` | Menghilangkan penulisan alamat jaringan statis (*hardcoding*) sehingga aplikasi fleksibel saat migrasi lingkungan produksi. |

---

## 3. Spesifikasi Kontrak Antarmuka API (Single Source of Truth)

> [!IMPORTANT]
> **Prosedur Baku Modifikasi Kontrak API**  
> Setiap perubahan bentuk payload masukan (*request body*) atau struktur keluaran (*response payload*) wajib disepakati oleh kedua belah divisi dan dicatat pada tabel ini sebelum implementasi kode dimulai:

| Metode | Jalur Endpoint | Struktur Payload Permintaan (JSON) | Skema Respons Sukses (JSON) | Persyaratan Autentikasi |
| :---: | :--- | :--- | :--- | :---: |
| `GET` | `/api/health` | *(Tidak ada)* | `{ "status": "OK", "message": "string", "timestamp": "ISOString" }` | Terbuka (Publik) |
| `POST` | `/api/v1/auth/register` | `{ "email": "string", "password": "string", "fullName": "string" }` | `{ "status": "SUCCESS", "token": "string", "user": UserProfile }` | Terbuka (Validasi Whitelist) |
| `POST` | `/api/v1/auth/login` | `{ "email": "string", "password": "string" }` | `{ "status": "SUCCESS", "token": "string", "user": UserProfile }` | Terbuka (Publik) |
| `GET` | `/api/v1/users` | *(Query params opsional)* | `{ "status": "SUCCESS", "data": UserProfile[] }` | Terbuka (Publik) |
| `GET` | `/api/v1/users/:id` | *(Parameter ID rute)* | `{ "status": "SUCCESS", "data": UserProfile }` | Terbuka (Publik) |
| `GET` | `/api/v1/memories` | *(Query pagination opsional)* | `{ "status": "SUCCESS", "data": ClassMemory[] }` | Terbuka (Publik) |
| `POST` | `/api/v1/portfolios` | `{ "title": "string", "category": "string", "description": "string" }` | `{ "status": "SUCCESS", "data": Portfolio }` | Wajib JWT (Siswa Pemilik) |

### Konvensi Standarisasi Jalur Endpoint
Seluruh endpoint layanan fungsional diwajibkan menggunakan prefiks terversi `/api/v1/...` guna memelihara stabilitas antarmuka di masa mendatang tanpa merusak kompatibilitas versi sebelumnya.
