import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import KontributorWeb from '@/pages/KontributorWeb';
import ProfilMurid from '@/pages/ProfilMurid';
import ProfilDetail from '@/pages/ProfilDetail';
import Gallery from '@/pages/Gallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profil-murid" element={<ProfilMurid />} />
          <Route path="/profil-murid/:id" element={<ProfilDetail />} />
          <Route path="/kontributor-web" element={<KontributorWeb />} />
          <Route path="/galeri" element={<Gallery />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
