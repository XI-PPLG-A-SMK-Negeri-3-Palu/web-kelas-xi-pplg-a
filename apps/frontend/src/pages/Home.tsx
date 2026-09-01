/**
 * Home: Halaman Beranda Utama Website XI PPLG A.
 * Konten halaman ini otomatis masuk ke dalam tag <main> milik MainLayout.
 * Seluruh bagian halaman dibagi ke dalam tag semantik <section> terpisah.
 */

const Home = () => {
  return (
    <div className="flex flex-col gap-16 py-12">
      {/* 1. Seksi Hero (Sambutan Utama) */}
      <section id="hero" className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Welcome to <span className="text-blue-600">XI PPLG A</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Mading Digital, Galeri Kenangan, dan Pameran Portofolio Resmi Kelas XI PPLG A SMK Negeri 3 Palu.
        </p>
      </section>

      {/* 2. Seksi Tentang Kelas (About) */}
      <section id="about" className="max-w-5xl mx-auto px-4 w-full">
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Tentang Kelas Kami</h2>
          <p className="text-gray-600 leading-relaxed">
            Tempat berkumpulnya talenta muda di bidang rekayasa perangkat lunak dan gim.
            Silakan tim Frontend mulai menyusun komponen detail di sini.
          </p>
        </div>
      </section>

      {/* 3. Seksi Top Contributors / Prestasi */}
      <section id="contributors" className="max-w-5xl mx-auto px-4 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Top Contributors</h2>
        {/* Tempat kartu siswa berprestasi / kontributor aktif */}
      </section>

      {/* 4. Seksi Daftar Anggota Kelas */}
      <section id="students" className="max-w-5xl mx-auto px-4 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Anggota Kelas</h2>
        {/* Tempat grid foto profil seluruh murid */}
      </section>

      {/* 5. Seksi Cuplikan Galeri Kenangan */}
      <section id="gallery-preview" className="max-w-5xl mx-auto px-4 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Galeri Kenangan</h2>
        {/* Tempat cuplikan foto / video kenangan */}
      </section>
    </div>
  );
};

export default Home;
