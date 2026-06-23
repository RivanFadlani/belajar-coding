/**
 * @file NoteApp.jsx
 * @description Komponen kontainer utama (Smart Component) untuk aplikasi catatan.
 * Komponen ini mengelola state global daftar catatan menggunakan `use-immer`.
 * `use-immer` mempermudah pembaruan state bertipe array/object kompleks dengan cara mutasi langsung pada draf bayangan (draft state).
 */

import { useImmerReducer } from "use-immer"
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

// draft = state saat ini dari useImmerReducer
// action = object yang dikirim dari dispatch yang tertrigger oleh component 
function notesReducer(draft, action) {
  if (action.type === "ADD_NOTE") {
    draft.push({
      id: id++,
      text: action.text,
      done: false
    });
  } else if (action.type === "CHANGE_NOTE") {
    const index = draft.findIndex((note) => note.id === action.id)
    draft[index].text = action.text
    draft[index].done = action.done
  } else if (action.type === "DELETE_NOTE") {
    const index = draft.findIndex((note) => note.id === action.id)
    // splice, hapus dari index ke berapa dan berapa elemen dari index awal
    draft.splice(index, 1)
  }
}

export default function NoteApp() {
  const [notes, dispatch] = useImmerReducer(notesReducer, initialNotes)

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
