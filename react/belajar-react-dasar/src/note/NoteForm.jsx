import { useContext, useState } from "react";
import { NotesDispatchContext } from "./NoteContext";

// hapus event handle props
export default function NoteForm() {
  const [text, setText] = useState('')
  // menggunakan context
  const dispatch = useContext(NotesDispatchContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleClick = () => {
    dispatch({
      type: "ADD_NOTE",
      text: text
    })
    setText('')
  }

  return (
    <div>
      <input type="text" placeholder="Add Note" value={text} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}
