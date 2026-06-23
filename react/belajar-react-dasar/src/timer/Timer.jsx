import { useState, useRef } from 'react';

export default function Timer() {
  // --- STATE (Mengontrol Tampilan / UI) ---
  // start: Menyimpan waktu awal ketika tombol 'Start' diklik (dalam milidetik).
  // Menggunakan useState karena perubahan nilainya menentukan hasil pengurangan di layar.
  const [start, setStart] = useState(null);

  // now: Menyimpan waktu saat ini yang terus diperbarui setiap 10ms.
  // Menggunakan useState karena kita butuh layar terus me-render ulang angka timer yang berjalan.
  const [now, setNow] = useState(null);

  // --- REF (Mengontrol Logika di Balik Layar) ---
  // timer: Menyimpan ID dari setInterval agar bisa dihentikan nanti oleh clearInterval.
  // MENGAPA PAKAI REF? Karena ID interval ini hanya untuk keperluan logika pembatalan (stop),
  // kita tidak butuh layar me-render ulang komponen hanya karena ID interval ini disimpan/berubah.
  const timer = useRef(null);

  // Fungsi untuk memulai timer
  function handleStart() {
    // 1. Catat waktu mulai dan waktu sekarang (sebagai titik awal)
    setStart(Date.now());
    setNow(Date.now());

    // 2. Bersihkan interval yang mungkin sudah berjalan sebelumnya (mencegah kebocoran memori/timer ganda)
    clearInterval(timer.current);

    // 3. Jalankan interval setiap 10 milidetik untuk memperbarui state 'now'
    // ID yang dihasilkan oleh setInterval disimpan diam-diam di dalam .current
    timer.current = setInterval(() => {
      setNow(Date.now()); // State berubah -> Memicu re-render -> Angka di layar ter-update
    }, 10);
  }

  // Fungsi untuk menghentikan timer
  function handleStop() {
    // Mengambil ID interval yang disimpan di dalam ref.current, lalu menghentikannya.
    // Proses ini tidak memicu re-render, angka di layar akan langsung berhenti di posisi terakhirnya.
    clearInterval(timer.current);
  }

  // Menghitung selisih waktu berjalan
  // Jika timer belum dimulai (start/now masih null), hasil pengurangannya adalah 0ms
  const waktuBerjalan = now && start ? now - start : 0;

  return (
    <>
      {/* Menampilkan hasil kalkulasi waktu yang selalu diperbarui berkat re-render dari setNow */}
      <h1>Timer: {waktuBerjalan}ms</h1>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
