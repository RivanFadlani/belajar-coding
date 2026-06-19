import { useState } from "react"

export default function Counter() {
  // Function useState akan mengembalikan array dengan dua nilai, yaitu:
  // counter = state: yaitu data state-nya, atau seperti variable
  // setCounter = setState: yaitu sebuah function yang akan merubah state-nya
  // Component yang menggunakan state tersebut, otomatis akan dirender ulang
  let [counter, setCounter] = useState(0)

  // bukti bahwa component di render ulang
  // muncul dua kali karena adanya StrictMode
  console.info("RENDER ULANG")

  function handleClick() {
    // penggunaan function setCounter

    // hasil dari console terlambat 1 angka, karena yang diubah adalah yang di dalam state saja
    setCounter(counter + 1) // 1. Menjadi setCounter(0 + 1) -> React bersiap mengubah state jadi 1
    console.info(counter) // 2. Langsung jalan! Tapi karena di snapshot ini counter = 0, yang muncul adalah 0
  }
  return (
    <div>
      <div>
        <button onClick={handleClick}>Count</button>
      </div>

      <h1>Counter: {counter}</h1>
    </div>
  )
}
