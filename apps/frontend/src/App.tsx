import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          
          {/* Rute Masa Depan */}
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          {/* <Route path="/portfolio" element={<Portfolio />} /> */}
          {/* <Route path="/profiles/:id" element={<ProfileDetail />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
