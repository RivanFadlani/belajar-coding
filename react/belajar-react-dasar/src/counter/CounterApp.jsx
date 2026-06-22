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
      POSISI COMPONENT BERBEDA (Dua Slot Terpisah di Render Tree)
      === */}

      {/* {...} bukan Component, melainkan wadah/ruang untuk menjalankan logika JavaScript */}
      {/* dalam kasus ini adalah 'show && </>' */}
      {/* disebut beda posisi karena kita membuat dua baris perintah independen
          lalu, karena ada 2 kurung kurawal juga membuat React melihatnya sebagai 
          dua koordinat/slot yang berbeda di dalam Render Tree */}

      {/* Component Counter 1 (Menempati Slot Posisi A / Baris 1) */}
      {/* Jika 'show' true -> Instance ini dibuat. Jika false -> Instance ini BENAR-BENAR DIHANCURKAN (State Hilang) */}
      {show && <Counter name="ripunn" />}

      {/* Component Counter 2 (Menempati Slot Posisi B / Baris 2) */}
      {/* Jika 'show' false -> Instance ini dibuat dari nol dengan State baru (0) */}
      {!show && <Counter name="rivan" />}

      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
