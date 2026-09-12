import { Link } from 'react-router-dom';
import Card from '@/components/Card';
import MemoryCard from '@/components/MemoryCard';
import type { ClassMemory } from '@xi-pplg/shared-types';

// ----- Data dummy, ganti dengan fetch API setelah backend tersambung -----

const kontributorPreview = [
  { name: 'Fiad', role: 'Tech Lead / Koordinator' },
  { name: 'Nama Teman 1', role: 'Frontend Developer' },
  { name: 'Nama Teman 2', role: 'Backend Developer' },
  { name: 'Nama Teman 3', role: 'UI/UX' },
];

const memoryPreview: Pick<ClassMemory, 'id' | 'mediaUrl' | 'mediaType' | 'caption'>[] = [
  { id: 'm1', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Class meeting perdana' },
  { id: 'm2', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Lomba 17 Agustus' },
  { id: 'm3', mediaUrl: '/dummy-video.mp4', mediaType: 'VIDEO', caption: 'Video kelas saat praktikum' },
  { id: 'm4', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Foto angkatan' },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] min-h-[420px]flex items-center justify-center overflow-hidden">
        {/* Video hero: motion-reduce:hidden -> hormati setting "kurangi animasi" pengguna */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback statis untuk pengguna yang matikan animasi */}
        <img
          src="/hero-poster.jpg"
          alt=""
          className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="z-10 mx-120 max-w-xl rounded-2xl border border-white/20 bg-white/10 px-10 py-12 text-center backdrop-blur-md mt-16">
          <h1 className="whitespace-pre-line text-4xl font-bold leading-tight text-white md:text-5xl">
            {'Welcome to\nXI PPLG A'}
          </h1>
          <p className="mt-4 text-white/80">
            Ruang berbagi karya, kenangan, dan pencapaian kelas kita.
          </p>
          <Link
            to="/profil-murid"
            className="mt-8 inline-block rounded-md bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
          >
            Kenali Anggota Kelas
          </Link>
        </div>
      </section>

      {/* ===== STATS CEPAT ===== */}
      <section className="mx-auto grid max-w-5xl grid-cols-3 gap-6 px-6 py-10 text-center">
        <div>
          <p className="text-3xl font-bold text-primary-600">40+</p>
          <p className="mt-1 text-sm text-subtitle">Murid</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary-600">100+</p>
          <p className="mt-1 text-sm text-subtitle">Pencapaian</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-primary-600">500+</p>
          <p className="mt-1 text-sm text-subtitle">Kenangan</p>
        </div>
      </section>

      {/* ===== TENTANG KELAS ===== */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-title">Tentang Kelas</h2>
        <p className="leading-relaxed text-text">
          XI PPLG A adalah kelas Pengembangan Perangkat Lunak dan Gim di SMK Negeri 3 Palu.
          Website ini adalah ruang bersama untuk menyimpan kenangan, memamerkan karya, dan
          merayakan pencapaian setiap anggota kelas.
        </p>
        <Link
          to="/profil-murid"
          className="mt-6 inline-block font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          Kenali Seluruh Anggota Kelas
        </Link>
      </section>

      {/* ===== PREVIEW KONTRIBUTOR WEB ===== */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-title">Kontributor Web</h2>
          <Link to="/kontributor-web" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {kontributorPreview.map((orang) => (
            <Card key={orang.name} title={orang.name} subtitle={orang.role} />
          ))}
        </div>
      </section>

      {/* ===== PREVIEW GALERI ===== */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-title">Cuplikan Galeri</h2>
          <Link to="/galeri" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Lihat Semua
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {memoryPreview.map((m) => (
            <MemoryCard key={m.id} mediaUrl={m.mediaUrl} mediaType={m.mediaType} caption={m.caption} />
          ))}
        </div>
      </section>
    </>
  );
}
