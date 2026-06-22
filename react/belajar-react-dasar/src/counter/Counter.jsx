import { useState } from "react"

export default function Counter({ name }) {
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter(counter + 1)
  }

  return (
    <div>
      <h1> Counter {name} : {counter}</h1>
      <button onClick={handleClick}>Increament</button>
    </div>
  )
}
