import { useState } from "react";
import Counter from "./Counter";

export function CounterApp() {
  const [show, setShow] = useState(true)

  function handleChange(e) {
    setShow(e.target.checked)
  }

  return (
    <div>
      {/* Cara Reset State P.3 */}
      {/* ===
      Menggunakan Key (Paling direkomendasikan)

      Meskipun menggunakan ternary dan di dalam posisi yang sama
      === */}

      {show ? <Counter key="ripunn" name="ripunn" /> : <Counter key="rivan" name="rivan" />}

      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
