/**
 * MainLayout: Komponen pembungkus tata letak global.
 * Menggunakan HTML Semantik:
 * - <header> & <nav>: Menampung bilah navigasi utama
 * - <main>: Menampung konten dinamis tiap rute melalui <Outlet />
 * - <footer>: Menampung informasi kaki halaman & hak cipta
 * - header/nav = putih, main = bg-light (dari index.css) => kontras jelas.
 */

import { Outlet, Link } from 'react-router-dom';
import { FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-light text-text">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav aria-label="Navigasi Utama" className="w-full px-14 h-16 flex items-center gap-12">
          <Link to="/" className="text-xl font-bold text-primary-500 hover:text-primary-600 transition-colors">
            XI PPLG A
          </Link>
          <ul className="flex items-center gap-6 text-sm font-medium text-subtitle">
            <li>
              <Link to="/" className="hover:text-primary-500 transition-colors">Beranda</Link>
            </li>
            <li>
              <Link to="/portofolio" className="hover:text-primary-500 transition-colors">Portofolio</Link>
            </li>
            <li>
              <Link to="/galeri" className="hover:text-primary-500 transition-colors">Galeri</Link>
            </li>
          </ul>

          <ul className="flex items-center gap-6 text-sm font-medium text-subtitle ml-auto">
            <li>
              <Link to="#" className="hover:text-primary-500 transition-colors">Masuk</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary-500 transition-colors">Daftar</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="grow">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-subtitle">
        <div className="w-full px-14 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} XI PPLG A — SMK Negeri 3 Palu. All rights reserved.</p>

            <div className="hidden md:block w-px h-4 bg-gray-300"></div>

            <ul className="flex items-center gap-4 text-xs font-medium">
              <li>
                <Link to="#" className="hover:text-primary-500 transition-colors">Kontributor Web</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary-500 transition-colors">Struktur Kelas</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary-500 transition-colors">Kebijakan Privasi</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden md:block">Follow akun media sosial kami!</p>
            <ul className="flex items-center gap-4">
              <li>
                <Link to="#" aria-label="Facebook" className="text-subtitle hover:text-primary-500 transition-colors">
                  <FaFacebook className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="Tiktok" className="text-subtitle hover:text-primary-500 transition-colors">
                  <FaTiktok className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link to="#" aria-label="Instagram" className="text-subtitle hover:text-primary-500 transition-colors">
                  <FaInstagram className="w-5 h-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
