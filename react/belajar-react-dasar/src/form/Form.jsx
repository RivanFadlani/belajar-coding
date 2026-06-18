export default function SayHelloForm() {
  // Component boleh saja memiliki Side Effect
  // biasanya terjadi dikarenakan adanya interakasi dari pengguna menggunakan Event Handler
  // jadi boleh saja memanggil atau merubah variable di luar scope asalkan menggunakan event (Tetapi sepertinya tidak direkomendasikan)
  // Proses side effect yang dilakukan event handler ini dilakukan DI LUAR RENDER

  // Namun, melakukan DOM di react itu tidak direkomendasikan, lebih baik menggunakan 'State'
  function handleClick(e) {
    e.preventDefault()
    const name = document.getElementById("input-hello").value
    document.getElementById("text-hello").innerHTML = `Hello! ${name}`
  }
  return (
    <div>
      <form>
        <input id="input-hello" type="text" />
        <button onClick={handleClick}>Say Hello</button>
      </form>
      <h1 id="text-hello">Hello World</h1>
    </div>
  )
}
