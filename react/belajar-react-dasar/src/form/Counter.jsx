import { useState } from "react"

export default function Counter() {
  let [counter, setCounter] = useState(0)

  console.info("RENDER ULANG")

  function handleClick() {
    // 1.2 Ketika ada pemicu perubahan state, dan ditrigger untuk merubah state,
    //     secara otomatis React akan mengirimkan antrian untuk memicu proses render ulang
    setCounter(counter + 1)
    console.info(counter)
  } // setelah function ini selesai, maka otomatis render baru akan lanjut
  return (
    <div>
      <div>
        <button onClick={handleClick}>Count</button>
      </div>

      <h1>Counter: {counter}</h1>
    </div>
  )
}
