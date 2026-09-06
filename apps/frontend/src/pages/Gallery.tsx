import MemoryCard from '@/components/MemoryCard';
import type { ClassMemory } from '@xi-pplg/shared-types';

// Data dummy -- nanti diganti fetch dari GET /api/memories
const semuaKenangan: Pick<ClassMemory, 'id' | 'mediaUrl' | 'mediaType' | 'caption'>[] = [
  { id: 'm1', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Class meeting perdana' },
  { id: 'm2', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Lomba 17 Agustus' },
  { id: 'm3', mediaUrl: '/dummy-video.mp4', mediaType: 'VIDEO', caption: 'Video kelas saat praktikum' },
  { id: 'm4', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Foto angkatan' },
  { id: 'm5', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Study tour' },
  { id: 'm6', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Perpisahan kakak kelas' },
  { id: 'm7', mediaUrl: '/dummy-video.mp4', mediaType: 'VIDEO', caption: 'Dokumentasi acara kelas' },
  { id: 'm8', mediaUrl: 'https://placehold.co/400x400', mediaType: 'IMAGE', caption: 'Ulang tahun kelas' },
];

export default function Gallery() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold text-title">Galeri &amp; Kenangan</h1>
      <p className="mb-10 text-subtitle">
        Kumpulan foto dan video momen kelas XI PPLG A.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {semuaKenangan.map((m) => (
          <MemoryCard key={m.id} mediaUrl={m.mediaUrl} mediaType={m.mediaType} caption={m.caption} />
        ))}
      </div>
    </div>
  );
}
