// dalam satu file, kita bisa membuat lebih dari satu component (multiple component)

export function HelloWorld() {
  return (
    <div>
      <HeaderHelloWorld />
      <ParagraphHelloWorld />
    </div>
  )
}

function HeaderHelloWorld() {
  return <h1>Hello World</h1> // kalau hanya satu line saja, kita bisa lakukan tanpa '()'
}

function ParagraphHelloWorld() {
  return (
    <div>
      <p>Semangat belajarnya Ripunn!</p>
      <hr />
    </div>
  )
}
