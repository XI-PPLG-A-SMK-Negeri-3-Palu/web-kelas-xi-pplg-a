# Manual Operasional Pengembang: Arsitektur Sistem, Onboarding, dan Penanganan Insiden

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Ikhtisar Arsitektur dan Transisi Sistem

Pengembangan situs web ini menerapkan standar rekayasa perangkat lunak modern untuk menggantikan paradigma monolitik tradisional (berkas HTML/PHP statis dan lingkungan lokal berbasis XAMPP). Tabel berikut memetakan komparasi arsitektural secara objektif:

| Domain | Lingkungan Tradisional | Standar Arsitektur Terkini | Rasional Teknis |
| :--- | :--- | :--- | :--- |
| **Penyedia Basis Data** | XAMPP (Apache + MariaDB/MySQL) | Docker Engine (PostgreSQL 16) | Docker dikhususkan secara terisolasi untuk layanan basis data. Lingkungan data identik di seluruh mesin pengembang tanpa mengotori sistem operasi induk. Runtime aplikasi tetap berjalan native untuk performa maksimal. |
| **Antarmuka Pengguna** | Berkas HTML/JS Monolitik | React 19 + TypeScript | Dekomposisi UI menjadi komponen modular yang dapat digunakan kembali (*reusable components*), meminimalkan redundansi logika dan duplikasi markup. |
| **Struktur Repositori** | Direktori Lepas Berkendali Manual | Monorepo Berbasis PNPM Workspaces | Menyatukan aplikasi klien, peladen API, dan kontrak tipe data dalam satu repositori terorkestrasi, mencegah inkonsistensi tipe antarmuka. |

---

## 2. Prasyarat Lingkungan Pengembangan

Sebelum menjalankan instruksi pembangunan sistem, setiap mesin pengembang wajib memenuhi spesifikasi perangkat lunak berikut:

### Perangkat Lunak Utama
1. **Node.js**: Runtime lingkungan JavaScript versi 18.0.0 Long-Term Support (LTS) atau lebih tinggi.
2. **PNPM**: Pengelola paket dependensi versi 8.0.0 atau lebih tinggi (`npm install -g pnpm`).
3. **Docker Desktop**: Engine kontainerisasi wajib dalam status berjalan (*running*) sebelum inisialisasi basis data.

### Konfigurasi Editor (Visual Studio Code)
Ekstensi berikut wajib diaktifkan guna memastikan penegakan kualitas kode yang konsisten:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Pratinjau dan pelengkapan otomatis utilitas CSS.
- **Prisma** (`Prisma.prisma`): Validasi sintaks dan pemformatan otomatis skema basis data.
- **Oxc Linter** (`oxc.oxc-vscode`): Analisis statis berkas secara real-time berbasis konfigurasi `.oxlintrc.json`.

> [!WARNING]
> **Larangan Penggunaan Ekstensi ESLint**  
> Proyek ini menggunakan arsitektur Oxlint berkinerja tinggi. Ekstensi ESLint tidak dikonfigurasi pada repositori ini dan akan menimbulkan konflik proses validasi jika diaktifkan.

---

## 3. Topologi dan Struktur Direktori Repositori

Repositori ini mengadopsi struktur monorepo dengan hierarki terisolasi untuk masing-masing domain kerja:

```
Web_XI-PPLG-A/
├── .env                                        <- Berkas variabel rahasia lokal (dikecualikan dari Git)
├── .env.example                                <- Salinan acuan konfigurasi lingkungan kerja
├── .gitignore                                  <- Pola berkas/direktori yang diabaikan pelacak versi
├── README.md                                   <- Ringkasan orientasi repositori
├── package.json                                <- Orkestrator skrip eksekusi monorepo
├── pnpm-lock.yaml                              <- Deterministic dependency resolution tree
├── pnpm-workspace.yaml                         <- Konfigurasi cakupan paket workspace
├── docker-compose.yml                          <- Definisi servis basis data PostgreSQL (Port 5432)
│
├── apps/
│   ├── frontend/                               <- Sub-repositori Aplikasi Klien (React 19 + Vite)
│   │   ├── index.html                          <- Berkas HTML utama
│   │   ├── package.json                        <- Manifest dependensi antarmuka pengguna
│   │   ├── vite.config.ts                      <- Konfigurasi bundler Vite dan integrasi Tailwind v4
│   │   ├── tsconfig.json                       <- Konfigurasi kompilasi TypeScript antarmuka
│   │   ├── .oxlintrc.json                      <- Konfigurasi linter statis
│   │   ├── public/                             <- Aset publik statis (media streaming dan poster)
│   │   └── src/
│   │       ├── main.tsx                        <- Entry point rendering React ke DOM
│   │       ├── App.tsx                         <- Deklarasi rute navigasi aplikasi
│   │       ├── index.css                       <- Token desain dan konfigurasi tema Tailwind v4
│   │       ├── components/                     <- Komponen atomik/molekular (Card, MemoryCard)
│   │       ├── layouts/                        <- Template struktural global (MainLayout)
│   │       ├── pages/                          <- Halaman aplikasi (Home, Profil, Galeri, Kontributor)
│   │       ├── features/                       <- Modul logika bisnis per fitur (Autentikasi, Profil)
│   │       ├── hooks/                          <- Logika kustom React Hooks
│   │       ├── services/                       <- Layanan klien HTTP pemanggil REST API (Axios)
│   │       └── store/                          <- Manajemen state terpusat (Zustand)
│   │
│   └── backend/                                <- Sub-repositori Peladen API (Express + Prisma)
│       ├── package.json                        <- Manifest dependensi layanan peladen
│       ├── tsconfig.json                       <- Konfigurasi kompilasi TypeScript runtime Node.js
│       ├── prisma/
│       │   ├── schema.prisma                   <- Definisi skema data: User, Whitelist, Badge, Memory, Portfolio
│       │   └── migrations/                     <- Berkas riwayat migrasi DDL PostgreSQL
│       └── src/
│           ├── index.ts                        <- Entry point Express, konfigurasi CORS, dan health check
│           ├── lib/prisma.ts                   <- PrismaClient Singleton terpusat
│           ├── routes/                         <- Deklarasi rute HTTP terversi (/api/v1/...)
│           ├── controllers/                    <- Lapisan validasi masukan dan respons payload
│           ├── services/                       <- Lapisan logika bisnis dan mutasi data Prisma
│           └── middlewares/                    <- Proteksi token JWT dan otorisasi peran pengguna
│
└── packages/
    └── shared-types/                           <- Kontrak Tipe Data Bersama Lintas Platform
        ├── package.json                        <- Manifest paket modul internal
        └── src/index.ts                        <- Antarmuka TypeScript: UserProfile, Badge, Portfolio, Memory
```

---

## 4. Prosedur Operasional Standar (SOP) Alur Kerja Harian

Seluruh operasi eksekusi proyek wajib menggunakan utilitas `pnpm`. Penggunaan utilitas `npm` dilarang guna menjaga konsistensi pohon dependensi.

### Fase Memulai Kerja (Start of Shift)
1. Aktifkan aplikasi **Docker Desktop** dan pastikan daemon berjalan normal.
2. Sinkronkan riwayat repositori terbaru:
   ```bash
   git pull origin main
   ```
3. Jalankan kontainer basis data:
   ```bash
   pnpm run db:up
   ```
4. Jalankan migrasi basis data terkelola:
   ```bash
   pnpm --filter @xi-pplg/backend run prisma:migrate
   ```
   > [!IMPORTANT]
   > **Prosedur Migrasi Terkelola**  
   > Dilarang mengeksekusi `prisma migrate dev` secara langsung. Skrip `prisma:migrate` telah dikonfigurasi menggunakan `dotenv-cli` untuk membaca konfigurasi `.env` dari direktori root repositori secara presisi.
5. Jalankan lingkungan pengembangan lokal (Frontend dan Backend simultan):
   ```bash
   pnpm run dev
   ```

### Fase Mengakhiri Kerja (End of Shift)
1. Hentikan eksekusi server pengembangan dengan menekan kombinasi tombol `Ctrl + C`.
2. Matikan kontainer basis data guna menghemat utilisasi memori:
   ```bash
   pnpm run db:down
   ```

---

## 5. Prosedur Onboarding Pengembang Baru (7 Tahap Verifikasi)

Setiap anggota baru wajib menuntaskan tahapan orientasi berikut secara berurutan:

1. **Kloning Repositori**:
   ```bash
   git clone https://github.com/XI-PPLG-A-SMK-Negeri-3-Palu/web-kelas-xi-pplg-a.git
   cd web-kelas-xi-pplg-a
   ```
2. **Instalasi Dependensi Monorepo**:
   ```bash
   pnpm install
   ```
3. **Inisialisasi Konfigurasi Lingkungan**:
   Salin berkas acuan variabel lingkungan pada direktori root:
   ```bash
   cp .env.example .env
   ```
   Periksa keterisian variabel `DATABASE_URL`, `PORT=3000`, `FRONTEND_URL="http://localhost:5173"`, dan `VITE_API_URL="http://localhost:3000"`.
4. **Penyalaan Basis Data**:
   ```bash
   pnpm run db:up
   ```
5. **Eksekusi Migrasi DDL**:
   ```bash
   pnpm --filter @xi-pplg/backend run prisma:migrate
   ```
6. **Eksekusi Layanan Lokal**:
   ```bash
   pnpm run dev
   ```
   - Antarmuka Klien: Akses melalui peramban pada `http://localhost:5173`
   - Peladen API: Akses endpoint kesehatan pada `http://localhost:3000/api/health`
7. **Uji Validasi Komunikasi Lintas Domain**:
   Buka konsol pengembang peramban (F12) pada halaman klien, kemudian eksekusi instruksi:
   ```javascript
   fetch('http://localhost:3000/api/health')
     .then(res => res.json())
     .then(data => console.log('Status Sistem:', data));
   ```
   Status dianggap valid jika keluaran mengembalikan atribut `{ status: "OK" }`.

---

## 6. Matriks Penanganan Masalah Teknis (Troubleshooting)

Tabel berikut menjadi rujukan penyelesaian insiden teknis sebelum eskalasi kendala ke forum komunikasi tim:

| Kasus Kendala | Indikasi Gejala | Akar Masalah | Tindakan Korektif Definitif |
| :---: | :--- | :--- | :--- |
| **01** | `error: cannot connect to Docker daemon` saat `pnpm run db:up` | Layanan Docker Engine belum aktif pada sistem operasi. | Buka aplikasi Docker Desktop, tunggu status berubah menjadi stabil (*running*), lalu ulangi perintah. |
| **02** | `relation "User" does not exist` saat peladen backend memproses kueri | Struktur tabel basis data belum diinisialisasi pada PostgreSQL. | Jalankan: `pnpm --filter @xi-pplg/backend run prisma:migrate`. |
| **03** | `Error: P1001: Can't reach database server at localhost:5432` | Kontainer basis data belum menyala atau masih dalam fase inisialisasi awal. | Pastikan `pnpm run db:up` telah dipanggil. Periksa output `docker ps` untuk memastikan kontainer berstatus *Up*. Tunggu 5 detik, kemudian ulangi instruksi. |
| **04** | `Environment variable not found: DATABASE_URL` saat migrasi | Pemanggilan CLI `prisma migrate` langsung tanpa penyuntikan berkas `.env` monorepo. | Gunakan selalu skrip terkelola: `pnpm --filter @xi-pplg/backend run prisma:migrate`. |
| **05** | Galat *Cross-Origin Resource Sharing* (CORS) pada konsol browser | Variabel `FRONTEND_URL` tidak sesuai atau servis peladen backend tidak aktif. | Verifikasi kesesuaian nilai `FRONTEND_URL` pada `.env` terhadap URL peramban, kemudian lakukan restart pada peladen backend. |
| **06** | Galat *Port Conflict* (`EADDRINUSE: port already in use 5432/3000/5173`) | Terdapat proses latar belakang atau layanan lokal lain yang menduduki port terkait. | Matikan servis yang bentrok (misal: PostgreSQL lokal sistem operasi) atau sesuaikan alokasi port pada `.env` dan `docker-compose.yml`. |
| **07** | Kegagalan instalasi dependensi akibat konflik resolusi versi paket | Inkompatibilitas spesifikasi versi paket baru terhadap pohon dependensi. | Telaah detail pesan galat paket terkait. Konsultasikan kepada Koordinator Tim sebelum melakukan perubahan konfigurasi pada `package.json`. |
| **08** | PowerShell error: *File cannot be loaded because running scripts is disabled* | Pembatasan hak eksekusi skrip PowerShell lokal pada lingkungan Windows. | Gunakan perintah alternatif `pnpm.cmd`, atau ubah kebijakan eksekusi dengan `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`. |

---

## 7. Ketentuan Larangan Arsitektural (Non-Negotiable Anti-Patterns)

Penerapan prinsip berikut bersifat mutlak. Pelanggaran akan berakibat pada penolakan langsung atas *Pull Request* yang diajukan:

1. **Hardcoding Kredensial dan Variabel Rahasia**: Dilarang menuliskan alamat IP, kredensial basis data, kunci rahasia, atau port secara eksplisit pada berkas kode. Seluruh variabel wajib ditarik melalui `process.env` atau `import.meta.env`.
2. **Penggunaan Jalur Impor Relatif Jamak**: Dilarang menggunakan jalur relatif dalam seperti `../../../../components/Card`. Gunakan path alias yang telah dikonfigurasi secara resmi: `@/components/Card` atau `@xi-pplg/shared-types`.
3. **Modifikasi Konfigurasi Inti Tanpa Konsensus**: Dilarang memodifikasi berkas konfigurasi root (`package.json`, `pnpm-workspace.yaml`, `docker-compose.yml`, `tsconfig.json`) tanpa persetujuan tertulis dari Koordinator Tim.
4. **Instansiasi Ganda Klien Basis Data**: Dilarang menginisialisasi `new PrismaClient()` pada berkas pengendali atau rute. Seluruh operasi basis data wajib memanfaatkan instans Singleton dari `@/lib/prisma`.
