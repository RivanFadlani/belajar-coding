import { useState } from "react"

export default function Counter() {

  // ==========================================
  // KESIMPULAN UTAMA: SIKLUS RENDER REACT
  // ==========================================
  // Pemicu (Trigger) -> Ambil Foto Baru (Snapshot / Render) -> Perbarui Layar (Commit).

  // Trigger terbagi menjadi 2 skenario:
  // 1. Saat Web Dibuka: 
  //    Pemicunya adalah sistem (main.jsx), snapshot-nya mencari kondisi default (0), 
  //    dan commit-nya membuat seluruh HTML dari nol.
  //
  // 2. Saat Tombol Diklik: 
  //    Pemicunya adalah user (setCounter), snapshot-nya menghitung nilai baru (1), 
  //    dan commit-nya hanya mengubah bagian teks yang berubah saja (efisien).

  // TAMBAHAN PENTING (Karakteristik Snapshot):
  // State di dalam satu siklus render bersifat "BEKU". 
  // Kode di bawah setState pada render yang sama akan tetap membaca nilai dari snapshot saat itu (nilai lama),
  // bukan nilai baru yang sedang diantrekan.

  // === PENJELASAN ALUR RENDER:

  // =========================================================================
  // [FASE 1] LAHIRNYA SNAPSHOT 1 (Dipicu oleh main.jsx)
  // Saat web pertama dimuat, main.jsx mengeksekusi komponen ini (Child Component juga) untuk pertama kali.
  // React mengambil "foto" pertama: counter = 0.
  // =========================================================================
  let [counter, setCounter] = useState(0)

  // Log ini akan muncul di konsol setiap kali snapshot baru diambil.
  console.info("RENDER ULANG") // Muncul dua kali: 
  // satu log berasal dari trigger handleClick
  // satu log lagi adalah StrictMode yang sedang melakukan mendeteksi adanya Side Effect yang tidak murni pada Component

  function handleClick() {
    // =========================================================================
    // [FASE 2] TOMBOL DIKLIK (Masih Terjebak di Snapshot 1)
    // Ingat, main.jsx sudah selesai bertugas. Sekarang kita bermain di level lokal.
    // Di dalam fungsi ini, nilai 'counter' dibekukan di angka 0.
    // =========================================================================

    // === State Updates Start
    // Tiga baris setCounter ini bertindak sebagai TRIGGER (Pemicu) untuk Snapshot berikutnya.
    // Karena menggunakan lambda/arrow function, React akan menghitung nilainya secara berantai 
    // di dalam memori antrean (pending queue), meskipun variabel 'counter' di snapshot saat ini belum berubah.
    // Dan di luar dari antrean state ini, snapshot komponen tetap beku (tidak berubah).

    setCounter((c) => c + 1) // Antrean 1: Mengambil state terakhir (0) + 1 = 1
    setCounter((c) => c + 1) // Antrean 2: Mengambil hasil Antrean 1 (1) + 1 = 2
    setCounter((c) => c + 1) // Antrean 3: Mengambil hasil Antrean 2 (2) + 1 = 3

    console.info(counter) // Jika di-log di sini, hasilnya TETAP 0! Karena kita masih di Snapshot lama.
    // Baru setelah fungsi ini selesai, Snapshot berikutnya lahir dengan nilai counter = 3.  
    // === State Updates End

    // =========================================================================
    // [FASE 3] FUNGSI SELESAI & LAHIRNYA SNAPSHOT 2 (Hanya di Komponen Ini)
    // fungsi handleClick selesai dieksekusi. React melihat catatan antrean,
    // lalu memanggil ULANG fungsi Counter() ini secara mandiri (tanpa melibatkan main.jsx).
    //
    // Di Snapshot 2 ini:
    // - useState(0) sekarang mengembalikan nilai counter = 1 (dari hasil antrean).
    // - console.info("RENDER ULANG") berjalan lagi untuk kedua kalinya.
    // - Komponen me-render ulang UI menjadi <h1>Counter: 1</h1>.
    // =========================================================================
  }

  return (
    <div>
      <div>
        <button onClick={handleClick}>Count</button>
      </div>

      {/* Menampilkan nilai counter berdasarkan snapshot yang aktif saat ini */}
      <h1>Counter: {counter}</h1>
    </div>
  )
}
