import { useState } from "react"

export default function TaskForm({ onSubmit }) {
  const [name, setName] = useState("")

  function handleChange(e) {
    setName(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault()
    onSubmit(name)
    setName('')
  }

  return (
    <div>
      <h1>influencers yang berdampak</h1>

      <form>
        <input type="text" value={name} onChange={handleChange} />

        <button onClick={handleClick}>Kirim</button>
      </form>
    </div>
  )
}
