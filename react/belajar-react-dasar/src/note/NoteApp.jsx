/**
 * @file NoteApp.jsx
 * @description Komponen kontainer utama (Smart Component) untuk aplikasi catatan.
 * Komponen ini mengelola state global daftar catatan menggunakan `use-immer`.
 * `use-immer` mempermudah pembaruan state bertipe array/object kompleks dengan cara mutasi langsung pada draf bayangan (draft state).
 */

import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import { useReducer } from "react"

// Variabel auto-increment untuk menghasilkan ID unik pada setiap catatan baru
let id = 0

// Data awal (initial state) sebagai daftar catatan bawaan saat aplikasi pertama kali dimuat
const initialNotes = [
  { id: id++, text: "Learn HTML", done: false },
  { id: id++, text: "Learn CSS", done: false },
  { id: id++, text: "Learn JavaScript", done: false },
  { id: id++, text: "Learn React", done: false },
]

// notes = state saat ini
// action = object yang dikirim dari dispatch yang tertrigger oleh component 
function notesReducer(notes, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [
        ...notes,
        {
          id: id++,
          text: action.text,
          done: false
        }
      ]
    case "CHANGE_NOTE":
      return notes.map((note) => note.id === action.id ? { ...note, text: action.text, done: action.done } : note)
    case "DELETE_NOTE":
      return notes.filter((note) => (note.id !== action.id))
    default:
      return notes
  }
}

export default function NoteApp() {
  const [notes, dispatch] = useReducer(notesReducer, initialNotes)

  const handleAddNote = (text) => {
    // dispatch adalah jembatan untuk mengirim Object (action) dari Component menuju ke reducer.
    dispatch({
      type: 'ADD_NOTE',
      text: text
    })
  }

  const handleChangeNote = (note) => {
    dispatch({
      ...note,
      type: 'CHANGE_NOTE'
    })
  }

  const handleChangeDelete = (note) => {
    dispatch({
      type: 'DELETE_NOTE',
      id: note.id
    })
  }

  return (
    <div>
      <h1>Note App</h1>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} onChange={handleChangeNote} onDelete={handleChangeDelete} />
    </div>
  )
}
