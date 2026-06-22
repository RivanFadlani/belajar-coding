import { useState } from "react"
import { useImmer } from "use-immer"

export default function Task() {

  // =========================================================================
  // 1. STATE INITIALIZATION (SNAPSHOT DEFINITION)
  // =========================================================================

  // State temporary untuk menangkap input teks.
  // Setiap kali komponen di-render, nilai `name` di bawah ini adalah "snapshot" 
  // yang fix untuk siklus render tersebut.
  const [name, setName] = useState('')

  // State utama untuk menyimpan list influencer menggunakan Immer.
  // Immer memungkinkan kita mengubah `draft` secara mutabel (pake .push),
  // namun secara berkala tetap menghasilkan state immutable yang baru untuk React.
  const [influencers, setInfluencers] = useImmer([])

  // =========================================================================
  // 2. HANDLER: ON CHANGE (KONDISI TYPING)
  // =========================================================================
  function handleChange(e) {
    // Setiap satu ketikan huruf:
    // a. Fungsi ini dipicu.
    // b. `setName` menjadwalkan perubahan state ke antrean.
    // c. Fungsi selesai -> React melakukan re-render -> Terbentuk Snapshot baru.
    setName(e.target.value)
  }

  // =========================================================================
  // 3. HANDLER: ON CLICK (SUBMIT & STATE BATCHING)
  // =========================================================================
  function handleClick(e) {
    // Mencegah browser melakukan reload halaman otomatis (perilaku default form).
    e.preventDefault()

    // ALUR ANTRIAN STATE (BATCHING CONCEPT):

    // Antrean 1: Masukkan data ke list influencers.
    // Di baris ini, React membaca nilai `name` dari Snapshot render SAAT INI (misal: "Ginggi").
    // Nilai "Ginggi" di-push dengan aman ke dalam draft.
    setInfluencers(draft => {
      draft.push(name)
    })

    // Antrean 2: Jadwalkan pengosongan input field.
    // Kunci Penting: Di baris ini, variabel `name` di memori JAVASCRIPT SEKARANG masih berisi "Ginggi".
    // `setName('')` tidak langsung mengubah nilai variabel saat ini, melainkan masuk antrean berikutnya.
    setName('')

    // SIKLUS EKSEKUSI:
    // Setelah fungsi `handleClick` ini selesai dibaca sampai baris paling akhir,
    // React akan melakukan "Batching" (menggabungkan Antrean 1 & Antrean 2).
    // React kemudian memicu HANYA 1 KALI RE-RENDER untuk memperbarui seluruh UI secara efisien.
  }

  // =========================================================================
  // 4. RENDERING PROCESS (UI)
  // =========================================================================
  return (
    <div>
      <h1>influencers yang berdampak</h1>

      <form>
        {/* Controlled Input: Nilainya selalu diikat oleh snapshot state `name` terbaru */}
        <input type="text" value={name} onChange={handleChange} />

        <button onClick={handleClick}>Kirim</button>
      </form>

      <h2>List</h2>
      <ul>
        {/* Atribut `key`: Wajib menggunakan nama 'key'. Ini adalah reserved attribute React.
          React menggunakan 'key' secara internal untuk mendeteksi perubahan posisi/elemen list.
          Di sini kita menggunakan `index` (aman karena listnya hanya ditambah di akhir, tidak disisipkan/dihapus).
        */}
        {influencers.map((influencer, index) => (
          <li key={index}>{influencer}</li>
        ))}
      </ul>
    </div>
  )
}
