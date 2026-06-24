import { useContext, useMemo, useRef, useState } from "react";
import Note from "./Note";
import { NotesContext } from "./NoteContext";

// menghapus event handle props
export default function NoteList() {
  // menggunakan context
  const notes = useContext(NotesContext)
  const [search, setSearch] = useState("")
  const InputSearch = useRef(null)

  // Memo berfungsi ketika ingin filter value dari search input, lalu kita memaksa search dengan value yang sama
  // maka useMemo akan ignore untuk menjalankan aksi filternya.
  // karena state pada param dependencies tidak ada yang berubah
  const filteredNotes = useMemo(() => {
    console.info("Filtering Notes")
    // cari state note -> berisi property text -> dan berisi value search
    return notes.filter((note) => note.text.includes(search))
  }, [notes, search]) // kalau ada state yang sama dengan hasil filter, maka tidak akan dilanjutkan ke useMemo()

  const handleSearch = () => {
    console.info("Searching for:", InputSearch.current.value)
    setSearch(InputSearch.current.value)
  }

  return (
    <div>
      {/* pasang attr ref untuk terhubung dengan useRef */}
      <input type="text" ref={InputSearch} placeholder="Search Note" />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {/* hasil filter akan diiterasi oleh method map() */}
        {filteredNotes.map(note => (
          <li key={note.id}>
            <Note note={note} />
          </li>
        ))}
      </ul>
    </div>
  )
}
