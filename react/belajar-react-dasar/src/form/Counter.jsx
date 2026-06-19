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

    // Tiga baris setCounter ini bertindak sebagai TRIGGER (Pemicu) untuk Snapshot berikutnya.
    // React tidak langsung mengubah angka saat baris ini dibaca. React hanya mencatat antrean.
    setCounter(counter + 1) // Antrean 1: "Tolong siapkan snapshot baru dengan nilai 0 + 1"
    setCounter(counter + 1) // Antrean 2: "Tolong siapkan snapshot baru dengan nilai 0 + 1"
    setCounter(counter + 1) // Antrean 3: "Tolong siapkan snapshot baru dengan nilai 0 + 1"

    // Karena fungsi handleClick belum selesai, kita belum pindah snapshot.
    // Nilai 'counter' di bawah ini masih mengambil data dari Snapshot 1 (yaitu 0).
    console.info(counter) // Output di konsol: 0

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
