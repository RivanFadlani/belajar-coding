import { useState } from "react";
import Counter from "./Counter";

export function CounterApp() {
  const [show, setShow] = useState(true)

  function handleChange(e) {
    setShow(e.target.checked)
  }

  return (
    <div>
      <Counter />
      {/*
        Conditional Render menggunakan operator && (Short-circuit):
        - Jika show = true, component <Counter /> kedua akan dibuat dan ditampilkan.
        - Jika show = false, component 'Counter' akan dihapus dari component 'CounterApp' atau tidak ditampilkan (unmounted).
        - ketika dihapus dari component, maka State 'Counter' akan dirender dari ulang lagi (initialState = 0)
        - jadi, pastikan component selalu ditampilkan agar State tidak dirender dari ulang lagi

        *note: Di dalam React, nilai false, null, atau undefined tidak akan digambar apa-apa di layar (diabaikan).
      */}
      {show && <Counter />}
      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
