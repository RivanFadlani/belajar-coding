export function HelloWorld() {
  return (
    <div>
      <HeaderHelloWorld />
      <ParagraphHelloWorld />
    </div>
  )
}

function HeaderHelloWorld() {
  const text = "Hello World"
  // untuk mengakses sebuah variable harus menggunakan kurung kurawal '{}'
  // khusus untuk style, harus menggunakan double kurung kurawal, karena sebenarnya dia sedang memanggil javascript object untuk styling
  // dan, seluruh attribute value wajib menggunakan kurung kurawal. contohnya <img src={...}>
  return <h1 style={{ color: "white", backgroundColor: "royalblue" }}>{text.toUpperCase()}</h1>
}

function ParagraphHelloWorld() {
  const text = "Semangat belajarnya Ripunn!"
  // Yang dimaksud double kurung kurawal di attribute style
  // variable isinya object, otomatis kalau ingin inline (styling langsung di tag html), kita harus menggunakan double kurung kurawal
  const style = {
    color: "royalblue",
    backgroundColor: "pink",
    fontWeight: "bold"
  }
  return (
    <div>
      <p style={style}>{text.toLowerCase()}</p>
      <hr />
    </div>
  )
}
