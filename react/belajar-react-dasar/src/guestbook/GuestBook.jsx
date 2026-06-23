import { useRef } from "react"
import { useState } from "react"
import GuestBookInput from "./GuestBookInput"

export default function GuestBook() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  // karena attr ref dengan value 'InputName' sudah dideklarasikan di element input
  // maka, sekarang variable 'InputName' memiliki initialValue nya yaitu element input
  const InputName = useRef(null)

  // yang ingin dilakukan handle ini saat button submit di klik adalah
  // setName dan setMessage jadi string kosong
  // buat element dengan attr 'ref={InputName}' menjadi focue
  // dan, tampilkan alert
  function handleSubmit(e) {
    e.preventDefault()
    setName("")
    setMessage("")

    // InputName = ref; dan current adalah object bawaan dari useRef()
    // ref.current.focus(), sama seperti -
    // document.getElementById("name").focus

    // panggil ref 'InputName' dan dapatkan initialValue saat ini (<input />) yang mempunyai attr ref={InputName} di elementnya
    // lalu, buat element jadi focus
    InputName.current.focus()

    alert(`Name: ${name} | Message: ${message}`)
  }

  return (
    <>
      <h1>Guest Book</h1>
      <form>
        {/* mengirim ref ke dalam component melalui props */}
        <GuestBookInput ref={InputName} name={name} setName={setName} />
        <label htmlFor="name">Name</label> <br />
        {/* ref={InputName} mengacu pada variable InputName yang punya value useRef(null) */}
        <input type="text" ref={InputName} name="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />

        <label htmlFor="message">message</label> <br />
        <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} /> <br />

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}
