/**
 * @file Note.jsx
 * @description Komponen individual (Dumb Component) untuk merepresentasikan satu item catatan.
 * Komponen ini dapat beralih antara mode tampilan biasa (view mode) dan mode edit (edit mode).
 * Komponen ini menerima data catatan tunggal serta fungsi callback dari induknya untuk memperbarui status atau menghapus item tersebut.
 */

import { useState } from "react";

export default function Note({ note, onChange, onDelete }) {
  // isEditing: State lokal untuk mengontrol apakah catatan sedang dalam mode pengeditan teks atau tidak
  const [isEditing, setIsEditing] = useState(false)

  // Variabel penampung JSX elemen untuk menampilkan teks catatan (baik berupa teks biasa maupun input teks saat diedit)
  let component

  /**
   * Menangani perubahan isi teks pada elemen input saat dalam mode edit.
   * Fungsi ini akan mengirimkan objek catatan baru yang telah diperbarui ke fungsi callback onChange (milik induk).
   * @param {Event} e - Event onChange dari elemen input teks.
   */
  const handleChangeText = (e) => {
    const newNote = {
      ...note,
      text: e.target.value
    }
    onChange(newNote)
  }

  // Pengondisian (Conditional Rendering) untuk menentukan tampilan komponen berdasarkan state isEditing
  // initalState isEditing adalah false, maka kode yang dijalankan pertama kali adalah yang blok 'else'
  if (isEditing) {
    // Tampilan ketika user menekan tombol 'Edit' -> menampilkan input text untuk mengubah teks dan tombol 'Save'
    component = (
      <>
        <input type="text" value={note.text} onChange={handleChangeText} />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    )
  } else {
    // Tampilan default -> menampilkan teks catatan biasa dan tombol 'Edit'
    component = (
      <>
        {note.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    )
  }

  /**
   * Menangani perubahan status checklist/selesai (done) pada catatan.
   * Mengirimkan status checklist baru ke fungsi callback onChange (milik induk).
   * @param {Event} e - Event onChange dari elemen checkbox.
   */
  const handleChangeDone = (e) => {
    const newNote = {
      ...note,
      done: e.target.checked
    }
    onChange(newNote)
  }

  return (
    <div>
      {/* Checkbox untuk menandai apakah catatan sudah selesai dikerjakan atau belum */}
      <input type="checkbox" checked={note.done} onChange={handleChangeDone} />

      {/* Me-render komponen berdasarkan mode aktif (Edit / View) */}
      {component}

      {/* Tombol untuk memicu penghapusan catatan ini, memanggil callback onDelete */}
      <button onClick={() => onDelete(note)}>Delete</button>
    </div>
  )
}
