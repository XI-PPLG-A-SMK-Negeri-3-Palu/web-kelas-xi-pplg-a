import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Menginisialisasi variabel lingkungan dari root monorepo
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Rute Pemeriksaan Sistem
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server Backend XI PPLG A beroperasi dengan normal.',
    timestamp: new Date().toISOString()
  });
});

// Penempatan Rute Aplikasi
// app.use('/api/v1/users', userRoutes);

// Penanganan Kesalahan Global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error System]:', err.message);
  res.status(500).json({
    status: 'ERROR',
    message: 'Terjadi kesalahan pada peladen internal.'
  });
});

// Inisialisasi Peladen
app.listen(PORT, () => {
  console.log(`[INFO] Server Backend XI PPLG A beroperasi pada port: ${PORT}`);
});

export default app;
