# Standar Kontrol Versi dan Pedoman Kolaborasi Git

**Dokumentasi Teknis Resmi — Tim Pengembang Website XI PPLG A**  
*SMK Negeri 3 Palu*  
*Versi Dokumen: 2.1.0 | Klasifikasi: Internal Engineering Guide*

---

## 1. Strategi Percabangan Repositori (Branching Strategy)

Seluruh kontributor kode **diwajibkan** membuat cabang terisolasi untuk setiap penambahan fitur atau perbaikan kendala. Modifikasi langsung pada cabang utama (`main`) dilarang secara mutlak.

### Struktur Penamaan Cabang
Format penamaan cabang wajib mematuhi skema berikut:
```
<kategori>/<deskripsi-singkat-kebab-case>
```

| Kategori | Definisi Penggunaan | Contoh Baku |
| :--- | :--- | :--- |
| `feat/` | Pembangunan fitur antarmuka atau logika baru | `feat/hero-section`, `feat/galeri-media`, `feat/auth-whitelist` |
| `fix/` | Koreksi kesalahan fungsional atau anomali visual | `fix/navigasi-tombol-profil`, `fix/konfigurasi-cors-origin` |
| `style/` | Perubahan format styling tanpa mempengaruhi logika | `style/palet-warna-tema`, `style/penyesuaian-padding-kartu` |
| `refactor/` | Restrukturisasi kode tanpa mengubah fungsionalitas | `refactor/pemisahan-model-badge`, `refactor/prisma-singleton` |
| `docs/` | Pembaruan manual, dokumentasi teknis, atau panduan | `docs/panduan-onboarding-pengembang`, `docs/update-readme` |
| `chore/` | Pemeliharaan dependensi, skrip build, atau tooling | `chore/setup-monorepo`, `chore/pembaruan-paket-icons` |

---

## 2. Standar Pesan Commit (Conventional Commits)

Format penulisan pesan commit dirancang agar riwayat perubahan dapat diurai secara terstruktur oleh manusia maupun sistem otomatisasi.

### Sintaks Penulisan
```
<kategori>: <deskripsi imperatif dalam Bahasa Indonesia>
```

### Pedoman Redaksional:
1. Awali pesan dengan huruf kecil setelah tanda titik dua dan satu spasi.
2. Gunakan kata kerja imperatif bentuk aktif (contoh: `tambahkan`, `perbaiki`, `sesuaikan`, bukan `menambahkan` atau `sudah diperbaiki`).
3. Deskripsi harus secara spesifik menerangkan substansi teknis yang diubah.

### Contoh Implementasi Baku:
```bash
git commit -m "feat: tambahkan komponen Card dan MemoryCard untuk presentasi galeri"
git commit -m "fix: perbaiki rute navigasi tautan tombol murid pada halaman Home"
git commit -m "style: sesuaikan variabel warna primer pada blok theme Tailwind CSS"
git commit -m "refactor: pisahkan relasi Badge dari enum Role pada skema Prisma"
git commit -m "docs: tambahkan instruksi penanganan galat eksekusi Docker pada README"
```

> [!CAUTION]
> **Larangan Pesan Commit Non-Deskriptif**  
> Dilarang menyertakan pesan commit ambigu seperti `"update"`, `"fix error"`, `"tes"`, atau kumpulan karakter acak. Riwayat commit yang tidak informatif akan ditolak dalam proses telaah kode (*code review*).

---

## 3. Siklus Alur Kerja Kolaborasi (Standard Collaboration Workflow)

Berikut adalah 8 langkah baku yang wajib ditempuh dalam siklus pengembangan:

1. **Sinkronisasi Cabang Utama**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Inisialisasi Cabang Kerja**:
   ```bash
   git checkout -b feat/deskripsi-tugas
   ```
3. **Pelaksanaan Rekayasa Kode**:
   Kerjakan implementasi kode secara spesifik pada ruang lingkup aplikasi terkait (`apps/frontend/` atau `apps/backend/`).
4. **Penyimpanan Riwayat Bertahap**:
   ```bash
   git add .
   git commit -m "feat: deskripsi pekerjaan terverifikasi"
   ```
5. **Pengiriman Cabang ke Peladen Jarak Jauh (Remote)**:
   ```bash
   git push -u origin feat/deskripsi-tugas
   ```
6. **Pembuatan Permohonan Penggabungan (Pull Request)**:
   - Buka repositori pada antarmuka web GitHub.
   - Buat *Pull Request* baru yang mengarah ke cabang `main`.
   - Cantumkan ikhtisar perubahan dan hasil pengujian lokal.
   - Tugaskan Koordinator Tim sebagai *Reviewer*.
7. **Proses Telaah Kode dan Integrasi (Review & Merge)**:
   - Apabila terdapat catatan perbaikan, lakukan penyesuaian pada cabang yang sama dan lakukan push ulang.
   - Penggabungan kode ke cabang `main` hanya dapat dieksekusi oleh Koordinator Tim setelah memenuhi kriteria kelayakan.
8. **Pembersihan Cabang Lokal**:
   ```bash
   git checkout main
   git pull origin main
   git branch -d feat/deskripsi-tugas
   ```

---

## 4. Larangan Mutlak Praktik Rekayasa (Anti-Patterns)

Penyimpangan terhadap poin-poin di bawah ini dianggap sebagai pelanggaran protokol integritas repositori:

1. **Instruksi Push Langsung ke Cabang Utama**: Dilarang mengeksekusi `git push origin main`. Seluruh perubahan wajib melalui mekanisme verifikasi *Pull Request*.
2. **Commit Berkas Kredensial**: Dilarang mengunggah berkas `.env`. Seluruh deklarasi variabel baru wajib dicatat pada `.env.example` tanpa menyertakan nilai rahasia produksi.
3. **Commit Direktori Pihak Ketiga dan Artefak Kompilasi**: Dilarang mengunggah direktori `node_modules/`, berkas log, atau folder hasil build (`dist/`).
4. **Modifikasi Konfigurasi Fundamental Secara Sepihak**: Dilarang mengubah berkas `package.json` tingkat root, `pnpm-workspace.yaml`, atau `docker-compose.yml` tanpa koordinasi formal.

---

## 5. Konfigurasi Penegakan Proteksi Cabang (Branch Protection Rules)

> [!IMPORTANT]
> **Tanggung Jawab Penegakan Sistem bagi Koordinator Tim**  
> Larangan administratif di atas tidak memiliki daya cegah teknis tanpa pengaktifan fitur proteksi repositori. Koordinator Tim wajib mengonfigurasi aturan proteksi cabang pada platform GitHub melalui menu:
> 
> `Settings` -> `Branches` -> `Branch protection rules` (atau `Rulesets`)  
> 
> Parameter wajib yang harus diaktifkan untuk cabang `main`:
> - **Require a pull request before merging**: Wajib diaktifkan.
> - **Require approvals**: Minimal 1 persetujuan peninjau sebelum proses merge diizinkan.
> - **Dismiss stale pull request approvals when new commits are pushed**: Wajib diaktifkan guna memastikan commit susulan tetap ditinjau ulang.
> - **Do not allow bypassing the above settings**: Wajib diaktifkan agar seluruh kontributor, termasuk administrator, terikat pada prosedur baku.
