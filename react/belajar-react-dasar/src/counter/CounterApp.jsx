import { useState } from "react";
import Counter from "./Counter";

export function CounterApp() {
  const [show, setShow] = useState(true)

  function handleChange(e) {
    setShow(e.target.checked)
  }

  return (
    <div>
      {/* Cara Reset State P.2 */}
      {/* ===
      Mengubah posisi component. Karena React menyimpan State sesuai dengan
      Component dan Posisinya (struktur UI).

      Struktur UI yang dimaksud adalah:
      - pada awalnya Component Counter disimpan di posisi 'div -> Counter'
      - lalu, karena kondisi yang ke dua merubah posisi Component Counter menjadi 
        'section -> counter', maka otomatis react akan menganggap Component Counter
        sudah dipindahkan dan State pun akan di-reset
      === */}
      {show ? (
        <div>
          <Counter name="ripunn" />
        </div>
      ) : (
        <section>
          <Counter name="rivan" />
        </section>
      )}
      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
