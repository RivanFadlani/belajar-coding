import { useState } from "react"

export default function Counter() {
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleClick}>Increament</button>
    </div>
  )
}
