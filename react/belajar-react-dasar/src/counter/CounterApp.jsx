import { useState } from "react";
import Counter from "./Counter";

export function CounterApp() {
  const [show, setShow] = useState(true)

  function handleChange(e) {
    setShow(e.target.checked)
  }

  return (
    <div>
      {/* Cara Reset State P.1 */}
      {/* Mengubah dengan Component yang lain: <Counter /> -> <p /> */}
      {show ? <Counter name="ripunn" /> : <p>Menghilang</p>}
      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
