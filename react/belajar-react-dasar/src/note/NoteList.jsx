/**
 * @file NoteList.jsx
 * @description Komponen presentasional (Dumb Component) untuk merender sekumpulan daftar catatan.
 * Komponen ini menerima array berisi objek-objek catatan dan melakukan iterasi/mapping untuk me-render setiap catatan ke dalam elemen list (<li>) menggunakan komponen <Note />.
 */

import Note from "./Note";

export default function NoteList({ notes, onChange, onDelete }) {
  return (
    <ul>
      {/* Melakukan iterasi (mapping) untuk setiap objek catatan yang ada dalam array 'notes' */}
      {notes.map(note => (
        // Diperlukan atribut 'key' yang unik pada setiap item daftar agar React dapat mengenali 
        // elemen mana yang berubah, ditambah, atau dihapus dengan lebih efisien.
        <li key={note.id}>
          {/* Masing-masing item di-render menggunakan komponen individual Note */}
          <Note note={note} onChange={onChange} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  )
}
