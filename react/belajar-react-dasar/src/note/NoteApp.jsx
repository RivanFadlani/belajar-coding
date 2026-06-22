/**
 * @file NoteApp.jsx
 * @description Komponen kontainer utama (Smart Component) untuk aplikasi catatan.
 * Komponen ini mengelola state global daftar catatan menggunakan `use-immer`.
 * `use-immer` mempermudah pembaruan state bertipe array/object kompleks dengan cara mutasi langsung pada draf bayangan (draft state).
 */

import { useImmer } from "use-immer"
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"

// Variabel auto-increment untuk menghasilkan ID unik pada setiap catatan baru
let id = 0

// Data awal (initial state) sebagai daftar catatan bawaan saat aplikasi pertama kali dimuat
const initialNotes = [
  { id: id++, text: "Learn HTML", done: false },
  { id: id++, text: "Learn CSS", done: false },
  { id: id++, text: "Learn JavaScript", done: false },
  { id: id++, text: "Learn React", done: false },
]

export default function NoteApp() {
  // notes: Menyimpan daftar catatan saat ini
  // setNotes: Fungsi pembaru state yang disediakan oleh useImmer
  const [notes, setNotes] = useImmer(initialNotes)

  /**
   * Menambahkan catatan baru ke dalam state notes.
   * @param {string} text - Isi teks catatan baru yang diinput oleh user.
   */
  const handleAddNote = (text) => {
    setNotes((draft) => {
      // Menggunakan API push() secara langsung karena Immer menangani immutability di latar belakang
      draft.push({
        id: id++,
        text: text,
        done: false
      })
    })
  }

  /**
   * Mengubah/memperbarui data dari suatu catatan spesifik (misal: teks diubah atau status checklist berubah).
   * @param {Object} note - Objek catatan yang telah diperbarui datanya.
   */
  const handleChangeNote = (note) => {
    setNotes((draft) => {
      const index = draft.findIndex((item) => item.id === note.id)
      if (index !== -1) {
        draft[index] = note // Mengganti catatan lama dengan data catatan baru yang dikirim dari anak komponen
      }
    })
  }

  /**
   * Menghapus catatan spesifik dari daftar.
   * @param {Object} note - Objek catatan yang ingin dihapus.
   */
  const handleChangeDelete = (note) => {
    setNotes((draft) => {
      const index = draft.findIndex((item) => item.id === note.id)
      if (index !== -1) {
        draft.splice(index, 1) // Menghapus 1 elemen dari array pada indeks yang ditemukan
      }
    })
  }

  return (
    <div>
      <h1>Note App</h1>
      {/* Form input untuk menambahkan catatan baru */}
      <NoteForm onAddNote={handleAddNote} />
      {/* Komponen daftar yang akan menampilkan seluruh catatan saat ini */}
      <NoteList notes={notes} onChange={handleChangeNote} onDelete={handleChangeDelete} />
    </div>
  )
}
