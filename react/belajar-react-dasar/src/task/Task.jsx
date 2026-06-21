import { useState } from "react"

// 1. Variabel global untuk menyimpan counter ID unik.
// Nilainya akan terus bertambah setiap kali fungsi handleClick dipanggil.
let nextId = 0

export default function Task() {
  // 2. Inisialisasi State Awal.
  // 'name' untuk menampung teks dari input (string kosong).
  // 'influencers' untuk menampung daftar data (array kosong).
  const [name, setName] = useState('')
  const [influencers, setInfluencers] = useState([])

  // 3. Mengontrol Input (Controlled Component).
  // Mengambil apa pun yang diketik user, lalu memperbarui state 'name'.
  function handleChange(e) {
    setName(e.target.value)
  }

  // 4. Aksi saat Tombol Diklik.
  function handleClick() {
    /* CARA KERJA IMMUTABILITY PADA STATE ARRAY:
      - Di React, kita TIDAK BOLEH memutasi array lama secara langsung (misal: influencers.push(...)).
      - Kita harus mengirimkan HASIL ARRAY BARU ke fungsi setter agar React tahu ada perubahan referensi memori.
      
      Alur di bawah ini:
      1. [...] -> Membuat array baru di memori komputer.
      2. ...influencers -> (Spread) Menyalin semua elemen dari array lama ke array baru ini.
      3. { id: nextId++, name: name } -> Menambahkan satu objek baru di akhir array baru tersebut.
      *Note: mengubah variable global (nextId) di dalam handler itu sebenarnya tidak direkomendasikan
    */
    setInfluencers([
      ...influencers,
      { id: nextId++, name: name }
    ])

    // Opsional: Membersihkan kolom input setelah data terkirim
    setName('')
  }

  return (
    <div>
      <h1>influencers yang berdampak</h1>
      {/* ALUR CONTROLLED COMPONENT (INPUT TERKONTROL):
        1. value={name} -> Mengunci tampilan kotak input agar SELALU IKUT isi dari state 'name'.
           Input ini TIDAK tahu apa-apa tentang list 'influencers'. Dia hanya membaca Wadah A.
        2. onChange={handleChange} -> Setiap kali user mengetik/menghapus huruf, fungsi ini
           dipanggil untuk memperbarui state 'name'. Karena state 'name' berubah, komponen 
           di-render ulang, dan atribut 'value' di atas akan menampilkan huruf terbaru.
      */}
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={handleClick}>Kirim</button>

      <h2>List</h2>
      <ul>
        {/* 5. Proses Render Ulang (Re-rendering List):
          - Ketika setInfluencers dipanggil, React mendeteksi array baru dan me-render ulang komponen ini.
          - .map() akan mengeksekusi ulang array 'influencers' yang sekarang sudah berisi data terbaru.
          - Menggunakan shorthand () untuk langsung me-return elemen <li> ke layar tanpa kata kunci 'return'.
          - 'key={influencer.id}' wajib ada agar React tahu elemen mana yang berubah, bertambah, atau dihapus.
        */}
        {influencers.map(influencer => (
          <li key={influencer.id}>{influencer.name}</li>
        ))}
      </ul>
    </div>
  )
}
