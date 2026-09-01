/**
 * MainLayout: Komponen pembungkus tata letak global.
 * Menggunakan HTML Semantik:
 * - <header> & <nav>: Menampung bilah navigasi utama
 * - <main>: Menampung konten dinamis tiap rute melalui <Outlet />
 * - <footer>: Menampung informasi kaki halaman & hak cipta
 */

import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <nav aria-label="Navigasi Utama" className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            XI PPLG A
          </Link>
          <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
            </li>

            {/* Tempat link halaman masa depan */}
            {/* <li><Link to="/gallery" className="hover:text-blue-600 transition-colors">Galeri</Link></li> */}
            {/* <li><Link to="/portfolio" className="hover:text-blue-600 transition-colors">Portofolio</Link></li> */}
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} XI PPLG A — SMK Negeri 3 Palu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
