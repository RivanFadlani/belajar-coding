/**
 * @file NoteForm.jsx
 * @description Komponen form (Dumb Component) untuk menginput catatan baru.
 * Komponen ini menggunakan state lokal untuk menangani input terkontrol (controlled input) dari form,
 * kemudian memanggil callback onAddNote dari induk komponen ketika tombol 'Add' ditekan.
 */

import { useState } from "react";

export default function NoteForm({ onAddNote }) {
  // text: State lokal untuk menyimpan sementara isi teks catatan yang sedang diketik oleh pengguna
  const [text, setText] = useState('')

  /**
   * Mengambil input terbaru dari user secara real-time dan menyimpannya ke state 'text'.
   * @param {Event} e - Event onChange dari elemen input text.
   */
  const handleChange = (e) => {
    setText(e.target.value)
  }

  /**
   * Menangani aksi penambahan catatan saat tombol 'Add' diklik.
   * Fungsi ini akan mengosongkan kembali form input dan mengirimkan teks catatan ke komponen induk.
   */
  const handleClick = () => {
    setText('') // Reset form input menjadi kosong setelah submit
    onAddNote(text) // Memanggil callback dari parent (NoteApp) untuk menambahkan catatan ke state utama
  }

  return (
    <div>
      {/* Input teks terkontrol, nilainya disinkronkan langsung dengan state 'text' */}
      <input type="text" placeholder="Add Note" value={text} onChange={handleChange} />
      {/* Tombol pemicu submit catatan */}
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
