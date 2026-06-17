// === Parent Component = Mengirim informasi ke Child Component menggunakan Props
export function HelloWorld() {
  // object props di sini menampung properties yang nantinya akan dipakai sebagai attr di child component
  const props = {

    subTitle: "Text Apa Ya",
    text: "Semangat belajarnya Ripunn!"
  }
  return (
    <div>
      {/* mengirim attribute text ke HeaderHelloWorld() dengan value Hello World */}
      <HeaderHelloWorld text="Hello World" />
      {/* spread syntax sangat berguna saat kita ingin forward semua properties yang ada di object */}
      <ParagraphHelloWorld {...props} />
    </div>
  )
}

// === Child Component
// props itu seperti mirip dengan attr di <html>
// bedanya, kita bisa mengirim nilai javascript. seperti object, array, function, dll.
function HeaderHelloWorld(props) {
  // memanggil parameter props dengan {props.text}
  return <h1 style={{ color: "white", backgroundColor: "royalblue" }}>{props.text.toUpperCase()}</h1>
}

// Destructuring Props langsung di parameter function (Destructuring Parameter pada Props)
// ini memudahkan kita untuk tahu attr apa yang tersedia pada sebuah component
// kita juga bisa membuat default value jika props text tidak ada value
function ParagraphHelloWorld({ text = "Ga ada textnya loh ya!", subTitle }) {
  const style = {
    color: "royalblue",
    backgroundColor: "pink",
    fontWeight: "bold"
  }
  return (
    <div>
      <h2>{subTitle}</h2>
      <p style={style}>{text.toLowerCase()}</p>
      <hr />
    </div>
  )
}
