/**
 * ProfilMurid: Halaman Profil Murid.
 * Konten halaman ini otomatis masuk ke dalam tag <main> milik MainLayout.
 */

import Card from '@/components/Card';
import type { UserProfile } from '@xi-pplg/shared-types';

type MuridDummy = Pick<UserProfile, 'id' | 'fullName' | 'nickname'> & { jabatan?: string };

// Data dummy -- nanti diganti fetch dari GET /api/users
const semuaMurid: MuridDummy[] = [
  { id: '1', fullName: 'Contoh Ketua Kelas', nickname: 'Ketua', jabatan: 'Ketua Kelas' },
  { id: '2', fullName: 'Contoh Wakil Ketua', nickname: 'Wakil', jabatan: 'Wakil Ketua' },
  { id: '3', fullName: 'Contoh Nama Tiga', nickname: 'Nama3' },
  { id: '4', fullName: 'Contoh Nama Empat', nickname: 'Nama4' },
  { id: '5', fullName: 'Contoh Nama Lima', nickname: 'Nama5' },
];

export default function ProfilMurid() {
  const pengurus = semuaMurid.filter((m) => m.jabatan);
  const anggotaLain = semuaMurid.filter((m) => !m.jabatan);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-title mb-2">Profil Murid</h1>
      <p className="text-subtitle mb-10">Kenali seluruh anggota kelas XI PPLG A.</p>

      {pengurus.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-title mb-4">Pengurus Kelas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {pengurus.map((m) => (
              <Card key={m.id} title={m.fullName} subtitle={m.jabatan} href={`/profil-murid/${m.id}`} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-title mb-4">Seluruh Anggota</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {anggotaLain.map((m) => (
            <Card key={m.id} title={m.fullName} subtitle={m.nickname} href={`/profil-murid/${m.id}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
