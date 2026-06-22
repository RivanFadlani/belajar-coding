import { useState } from "react";
import Counter from "./Counter";

export function CounterApp() {
  const [show, setShow] = useState(true)

  function handleChange(e) {
    setShow(e.target.checked)
  }

  return (
    <div>
      {/* ----------------------------------------------------------------------
        RENDER KONDISIONAL: OPERATOR TERNARY (? :) & KONSEP "POSISI YANG SAMA"
        ----------------------------------------------------------------------
        Sintaks dari eksperimen Anda: {show ? <Counter name="ripunn" /> : <Counter name="rivan" />}
        
        MENGAPA KETIKA 'SHOW' BERUBAH, STATE COUNTER TIDAK IKUT RESET?
        
        - Hanya Ada 1 Slot Posisi: 
          Bagi React, satu operator ternary hanya dihitung sebagai SATU slot posisi 
          tetap di Render Tree.
        
        - Hanya Ada 1 Instance (Wujud Fisik):
          React tidak pernah membuat 2 komponen lalu menghancurkan salah satunya. 
          Sejak awal, React hanya menghidupkan 1 instance di slot tersebut.
        
        - Hanya Mengupdate Props:
          Saat 'show' berubah dari true ke false, React melihat tipe komponennya masih 
          sama-sama <Counter />. React memutuskan untuk menggunakan kembali (re-use) 
          instance fisik yang ada, dan HANYA mengubah datanya (props) dari 
          name="ripunn" menjadi name="rivan".
           
        - Dampak pada State:
           Karena komponennya tidak pernah dihancurkan (unmounted), maka STATE internal 
           di dalam <Counter /> (seperti angka hitungan) TETAP DIPERTAHANKAN.

        INTINYA: - jadi intinya react hanya merender ulang propsnya saja, tidak dengan state. 
                   karena component counter tidak pernah benar-benar hilang dari tampilan. 
      */}
      {show ? <Counter name="ripunn" /> : <Counter name="rivan" />}
      <input type="checkbox" checked={show} onChange={handleChange} />
    </div>
  )
}
