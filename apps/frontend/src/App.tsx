import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Utama */}
        <Route path="/" element={<Home />} />
        
        {/* Rute Masa Depan */}
        {/* <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
