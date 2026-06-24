import { useState, useEffect } from "react";

/**
 * Custom Hook: useOnline
 * Fungsi: Mendeteksi status koneksi internet pengguna (Online / Offline).
 * 
 * Alur Kerja:
 * 1. Menginisialisasi state dengan status koneksi browser saat ini.
 * 2. Menggunakan `useEffect` dengan dependency array kosong `[]` untuk 
 *    mendaftarkan event listener browser HANYA 1 KALI di awal (Mounting).
 * 3. Browser mengambil alih fungsi handler untuk memicu render ulang via useState 
 *    tanpa menjalankan ulang `useEffect`.
 * 4. Melakukan pembersihan (Cleanup) saat komponen tidak lagi digunakan (Unmounting).
 */
export default function useOnline() {
  // 1. Inisialisasi State
  // Menggunakan `navigator.onLine` agar nilai awal akurat sesuai kondisi real-time browser saat web dimuat.
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // --- HANDLER FUNCTIONS ---
    // Fungsi-fungsi ini didelegasikan ke sistem browser. 
    // Mereka akan dipanggil oleh BROWSER, bukan oleh React.

    function onlineHandle() {
      setIsOnline(true); // Memicu render ulang komponen dengan status true
    }

    function offlineHandle() {
      setIsOnline(false); // Memicu render ulang komponen dengan status false
    }

    // 2. TAHAP MOUNTING (Pendaftaran Ke Sistem Browser)
    // Karena dependency array di bawah adalah `[]`, bagian ini HANYA berjalan 1x di awal.
    // Kita "menitipkan" fungsi handler ke sistem event milik browser.
    window.addEventListener("online", onlineHandle);
    window.addEventListener("offline", offlineHandle);

    // 3. TAHAP CLEANUP (Pembersihan Saat Unmount)
    // Fungsi return ini akan otomatis dipanggil oleh React ketika komponen yang menggunakan hook ini dihancurkan.
    // Wajib dilakukan untuk mencegah kebocoran memori (memory leak) di browser.
    return () => {
      window.removeEventListener("online", onlineHandle);
      window.removeEventListener("offline", offlineHandle);
    };

  }, []); // <-- DEPENDENCY KOSONG: Menjamin useEffect tidak akan pernah dijalankan ulang,
  //     meskipun fungsi handler di atas memicu render ulang berkali-kali via `setIsOnline`.

  // 4. Mengembalikan nilai state terbaru ke komponen yang memanggil hook ini
  return isOnline;
}
