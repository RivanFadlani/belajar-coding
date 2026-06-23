import { useContext } from "react";
import Note from "./Note";
import { NotesContext } from "./NoteContext";

// menghapus event handle props
export default function NoteList() {
  // menggunakan context
  const notes = useContext(NotesContext)
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}>
          <Note note={note} />
        </li>
      ))}
    </ul>
  )
}
