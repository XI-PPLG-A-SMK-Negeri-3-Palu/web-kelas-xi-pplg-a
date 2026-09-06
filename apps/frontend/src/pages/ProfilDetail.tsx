/**
 * ProfilDetail: Halaman Detail Profil Murid.
 * Konten halaman ini otomatis masuk ke dalam tag <main> milik MainLayout.
 */

import { useParams } from 'react-router-dom';
import type { Portfolio } from '@xi-pplg/shared-types';

// Data dummy -- nanti diganti fetch dari GET /api/users/:id/portfolios
const dummyPencapaian: Pick<Portfolio, 'id' | 'title' | 'category'>[] = [
  { id: 'p1', title: 'Juara 2 Lomba Web Design Tingkat Kota', category: 'Lomba' },
  { id: 'p2', title: 'Sertifikat Belajar React Dasar', category: 'Sertifikat' },
];

export default function ProfilDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
          {id}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-title">Profil Murid #{id}</h1>
          <p className="text-subtitle">Data asli tampil setelah tersambung ke backend.</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-title mb-4">Pencapaian</h2>
      <ul className="space-y-3">
        {dummyPencapaian.map((item) => (
          <li key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="font-medium text-title">{item.title}</p>
            <p className="text-sm text-subtitle">{item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
