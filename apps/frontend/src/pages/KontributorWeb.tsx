/**
 * KontributorWeb: Halaman Kontributor Web.
 * Konten halaman ini otomatis masuk ke dalam tag <main> milik MainLayout.
 */

import Card from '@/components/Card';

// Data dummy -- ganti dengan nama tim asli
const timWebDev = [
  { name: 'Fiad', role: 'Tech Lead / Koordinator' },
  { name: 'Nama Teman 1', role: 'Frontend Developer' },
  { name: 'Nama Teman 2', role: 'Backend Developer' },
];

export default function KontributorWeb() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-title mb-2">Kontributor Web</h1>
      <p className="text-subtitle mb-10">Tim yang membangun dan merawat website ini.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {timWebDev.map((orang) => (
          <Card key={orang.name} title={orang.name} subtitle={orang.role} />
        ))}
      </div>
    </div>
  );
}
